#!/usr/bin/env node
'use strict';

function sdbm(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    hash = hash >>> 0; // uint32
  }
  return hash;
}

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: sdbm-hash [options] [string ...]

Compute the SDBM hash of strings or stdin lines.

Options:
  -h, --help       Show this help
  -v, --version    Show version
  -x, --hex        Output in hexadecimal

Examples:
  sdbm-hash "hello world"
  echo "test" | sdbm-hash
  sdbm-hash -x foo bar`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log(require('./package.json').version);
  process.exit(0);
}

const hex = args.includes('--hex') || args.includes('-x');
const strings = args.filter(a => a !== '--hex' && a !== '-x');

function output(s) {
  const h = sdbm(s);
  console.log(hex ? h.toString(16).padStart(8, '0') : String(h));
}

if (strings.length > 0) {
  strings.forEach(output);
} else {
  let buf = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', c => buf += c);
  process.stdin.on('end', () => {
    const lines = buf.split(/\r?\n/).filter(l => l.length > 0);
    if (lines.length === 0) {
      output('');
    } else {
      lines.forEach(output);
    }
  });
}
