# @kszongic/sdbm-hash-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/sdbm-hash-cli)](https://www.npmjs.com/package/@kszongic/sdbm-hash-cli)
[![license](https://img.shields.io/npm/l/@kszongic/sdbm-hash-cli)](./LICENSE)

> Compute SDBM hash of strings or stdin. Zero dependencies.

The [SDBM hash](http://www.cse.yorku.ca/~oz/hash.html) is a simple, fast, non-cryptographic hash function that produces a 32-bit unsigned integer. It was originally used in the SDBM database library.

## Install

```bash
npm install -g @kszongic/sdbm-hash-cli
```

## Usage

```bash
# Hash a string
sdbm-hash "hello world"
# 430867652

# Hash multiple strings
sdbm-hash foo bar baz
# 849955110
# 826886265
# 826947737

# Hex output
sdbm-hash -x "hello world"
# 19adbc84

# Read from stdin
echo "test" | sdbm-hash
# 2090756197

# Pipe lines
printf "alpha\nbeta\ngamma" | sdbm-hash
```

## Options

| Flag | Description |
|------|-------------|
| `-h, --help` | Show help |
| `-v, --version` | Show version |
| `-x, --hex` | Output in hexadecimal |

## License

MIT © 2026 kszongic
