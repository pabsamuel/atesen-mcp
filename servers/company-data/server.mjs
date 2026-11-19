#!/usr/bin/env node
// Minimal MCP server (stdio, newline-delimited JSON-RPC 2.0, no dependencies).
// Each tool runs one public Apify Actor of atesen-software with the CALLER'S OWN Apify token.
// The caller's Apify account is billed per result by Apify; this server stores nothing and logs nothing.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import readline from 'node:readline';

const cfg = JSON.parse(readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'tools.json'), 'utf8'));
const API = (process.env.APIFY_API_BASE || 'https://api.apify.com').replace(/\/+$/, '');
const TOKEN = process.env.APIFY_TOKEN || '';
const MAX_CHARGE = Number(process.env.ATESEN_MAX_CHARGE_USD || '0.25');
const TIMEOUT_SECS = Math.min(300, Math.max(10, Number(process.env.ATESEN_TIMEOUT_SECS || '120')));
const MAX_CHARS = 60000;
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];
const tools = new Map(cfg.tools.map(t => [t.name, t]));

const send = msg => process.stdout.write(JSON.stringify(msg) + '\n');
const reply = (id, result) => send({jsonrpc: '2.0', id, result});
const fail = (id, code, message) => send({jsonrpc: '2.0', id, error: {code, message}});
const textResult = (text, isError = false) => ({content: [{type: 'text', text}], isError});

function listTools() {
  return cfg.tools.map(t => ({name: t.name, title: t.title, description: t.description, inputSchema: t.inputSchema,
    annotations: {title: t.title, readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true}}));
}

async function callTool(name, args) {
  const tool = tools.get(name);
  if (!tool) return {rpcError: [-32602, `Unknown tool: ${name}`]};
  if (args === undefined || args === null) args = {};
  if (typeof args !== 'object' || Array.isArray(args)) return textResult('Arguments must be a JSON object.', true);
  const allowed = tool.inputSchema.properties || {};
  const unknown = Object.keys(args).filter(k => !Object.hasOwn(allowed, k));
  if (unknown.length) return textResult(`Unsupported argument(s): ${unknown.join(', ')}. See the tool input schema.`, true);
  if (!TOKEN) return textResult('APIFY_TOKEN is not set. Create a free Apify account, copy your API token from Apify Console > Settings > Integrations, and set APIFY_TOKEN in the MCP server environment. Runs are billed by Apify to your account.', true);
  if (!(MAX_CHARGE > 0 && MAX_CHARGE <= 100)) return textResult('ATESEN_MAX_CHARGE_USD must be a number above 0 and at most 100.', true);
  const url = `${API}/v2/acts/${encodeURIComponent(tool.actorId)}/run-sync-get-dataset-items?timeout=${TIMEOUT_SECS}&maxTotalChargeUsd=${MAX_CHARGE}&clean=true`;
  let res;
  try {
    res = await fetch(url, {method: 'POST', headers: {'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'atesen-mcp/0.1'},
      body: JSON.stringify(args), redirect: 'manual', signal: AbortSignal.timeout((TIMEOUT_SECS + 15) * 1000)});
  } catch (e) { return textResult(`Request to Apify failed: ${e.name === 'TimeoutError' ? 'timed out' : 'network error'}.`, true); }
  const body = await res.text();
  if (res.status === 401) return textResult('Apify rejected the token (401). Check APIFY_TOKEN.', true);
  if (res.status === 402) return textResult('Apify refused the run (402): insufficient credits or the spend limit of your account/this call was reached.', true);
  if (res.status === 404) return textResult('Actor not found or not public (404).', true);
  if (res.status >= 300) return textResult(`Apify returned HTTP ${res.status}. ${body.slice(0, 300)}`, true);
  let text = body;
  if (text.length > MAX_CHARS) text = text.slice(0, MAX_CHARS) + `\n... truncated at ${MAX_CHARS} characters. Lower the result limit input to get a complete answer.`;
  return textResult(text || '[]');
}

async function handle(msg) {
  const {id, method, params} = msg;
  const isRequest = id !== undefined && id !== null;
  try {
    if (method === 'initialize') {
      const want = params?.protocolVersion;
      return reply(id, {protocolVersion: PROTOCOLS.includes(want) ? want : PROTOCOLS[0], capabilities: {tools: {listChanged: false}},
        serverInfo: {name: cfg.serverName, title: cfg.title, version: cfg.version}, instructions: cfg.instructions});
    }
    if (method === 'ping') return reply(id, {});
    if (method === 'tools/list') return reply(id, {tools: listTools()});
    if (method === 'tools/call') {
      const out = await callTool(params?.name, params?.arguments);
      return out.rpcError ? fail(id, ...out.rpcError) : reply(id, out);
    }
    if (isRequest) return fail(id, -32601, `Method not found: ${method}`);
  } catch (e) { if (isRequest) fail(id, -32603, 'Internal error'); }
}

const rl = readline.createInterface({input: process.stdin});
let pending = 0; let closing = false;
rl.on('line', line => {
  if (!line.trim()) return;
  let msg; try { msg = JSON.parse(line); } catch { return fail(null, -32700, 'Parse error'); }
  if (Array.isArray(msg) || typeof msg !== 'object' || msg === null) return fail(null, -32600, 'Invalid request');
  pending++; handle(msg).finally(() => { pending--; if (closing && !pending) process.exit(0); });
});
rl.on('close', () => { closing = true; if (!pending) process.exit(0); });
