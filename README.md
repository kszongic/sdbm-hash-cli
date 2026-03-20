# sdbm-hash-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/sdbm-hash-cli)](https://www.npmjs.com/package/@kszongic/sdbm-hash-cli)
[![npm downloads](https://img.shields.io/npm/dm/@kszongic/sdbm-hash-cli)](https://www.npmjs.com/package/@kszongic/sdbm-hash-cli)
[![license](https://img.shields.io/npm/l/@kszongic/sdbm-hash-cli)](./LICENSE)
[![node](https://img.shields.io/node/v/@kszongic/sdbm-hash-cli)](https://nodejs.org)
![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-blue)

Compute SDBM hash of strings or stdin. **Zero dependencies.** Works on Windows, macOS, and Linux.

```bash
$ sdbm-hash "hello world"
430867652
```

## Why?

Need a fast, deterministic hash for sharding, cache keys, or hash tables? Cryptographic hashes like SHA-256 are overkill when all you need is a well-distributed 32-bit integer. The [SDBM hash](http://www.cse.yorku.ca/~oz/hash.html) is one of the simplest non-cryptographic hash functions with excellent distribution properties.

- **Fast** — pure arithmetic, no crypto overhead
- **Deterministic** — same input always gives the same 32-bit unsigned integer
- **Pipe-friendly** — reads from stdin line by line
- **Hex output** — `-x` flag for hexadecimal representation
- **Zero dependencies** — nothing to audit, nothing to break

## Install

```bash
npm install -g @kszongic/sdbm-hash-cli
```

Or run directly without installing:

```bash
npx @kszongic/sdbm-hash-cli "hello world"
```

## Usage

### Hash a string

```bash
sdbm-hash "hello world"
# 430867652
```

### Hash multiple strings

```bash
sdbm-hash foo bar baz
# 849955110
# 826886265
# 826947737
```

### Hex output

```bash
sdbm-hash -x "hello world"
# 19adbc84
```

### Read from stdin

```bash
echo "test" | sdbm-hash
# 2090756197

printf "alpha\nbeta\ngamma" | sdbm-hash
# 2776964966
# 2570680718
# 1651771994
```

## Options

| Flag | Description |
|------|-------------|
| `-h, --help` | Show help |
| `-v, --version` | Show version |
| `-x, --hex` | Output in hexadecimal |

## Recipes

### Shard key assignment

Distribute records across N shards deterministically:

```bash
HASH=$(sdbm-hash "user-12345")
SHARD=$((HASH % 8))
echo "Route to shard $SHARD"
```

### Quick file fingerprinting

Hash every line of a file for duplicate detection:

```bash
cat users.csv | sdbm-hash | sort | uniq -d
# Find lines that produce colliding hashes
```

### Cache key generation

Generate compact cache keys from long strings:

```bash
KEY=$(sdbm-hash -x "GET /api/users?page=3&limit=50")
echo "cache:$KEY"
# cache:a3f1bc42
```

### Consistent coloring in logs

Assign terminal colors to service names:

```bash
COLORS=(31 32 33 34 35 36)
HASH=$(sdbm-hash "auth-service")
COLOR=${COLORS[$((HASH % ${#COLORS[@]}))]}
echo -e "\e[${COLOR}m[auth-service]\e[0m Log line here"
```

### npm scripts

```json
{
  "scripts": {
    "hash": "sdbm-hash",
    "hash:hex": "sdbm-hash -x"
  }
}
```

### Tool chaining

Combine with other CLI tools:

```bash
# Hash each filename in a directory
ls | sdbm-hash -x

# Compare hashes of two strings
diff <(sdbm-hash "v1") <(sdbm-hash "v2")
```

## How It Works

The SDBM hash iterates through each character of the input string, updating a 32-bit accumulator:

```
hash(i) = char(i) + (hash(i-1) << 6) + (hash(i-1) << 16) - hash(i-1)
```

This is equivalent to `hash * 65599 + char`, where 65599 is a prime chosen for good distribution. The algorithm was created by Ozan Yigit for the SDBM database library and is known for:

- Very few collisions on natural language strings
- Excellent avalanche properties for a non-crypto hash
- Extremely fast computation (shift + add only)

## Use Cases

- **Hash tables** — Quick bucket assignment for in-memory caches
- **Sharding** — Distribute data across database partitions
- **Deduplication** — Fast first-pass duplicate detection on large datasets
- **Load balancing** — Consistent hashing for request routing
- **Testing** — Generate deterministic pseudo-random values from seed strings
- **Education** — Demonstrate hash function properties

## Comparison

| Tool | Zero deps | Stdin support | Hex output | Cross-platform | Install |
|------|-----------|--------------|------------|----------------|---------|
| **sdbm-hash-cli** | ✅ | ✅ | ✅ | ✅ Win/Mac/Linux | `npx @kszongic/sdbm-hash-cli` |
| [string-hash-cli](https://github.com/kszongic/string-hash-cli) | ✅ | ✅ | ✅ | ✅ | `npx string-hash-cli` |
| `sha256sum` | N/A | ✅ | ✅ (default) | ❌ Unix only | Built-in (Linux) |
| Python `hash()` | N/A | Manual | Manual | ✅ | Built-in |
| Node.js `crypto` | N/A | Manual | Manual | ✅ | Built-in |

## Related

- [string-hash-cli](https://github.com/kszongic/string-hash-cli) — DJB2 string hashing
- [checksum-verify-cli](https://github.com/kszongic/checksum-verify-cli) — Verify file checksums (SHA/MD5)
- [hash-file-cli](https://github.com/kszongic/hash-file-cli) — Hash files with multiple algorithms
- [sha256sum-cli](https://github.com/kszongic/sha256sum-cli) — SHA-256 file hashing
- [pwd-entropy-cli](https://github.com/kszongic/pwd-entropy-cli) — Calculate password entropy

## License

MIT © 2026 kszongic
