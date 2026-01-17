# Expo SDK Upgrade Guide

## Theory: Understanding SDK Updates

### What is an Expo SDK?
- The Expo SDK is a collection of libraries and tools for React Native development
- Each SDK version bundles compatible versions of React Native, Expo packages, and related dependencies
- **The `expo` package version = SDK version** (e.g., `expo@54.x.x` = SDK 54)

### Why Upgrade?
- Your local Expo Go app only supports specific SDK versions
- Downloaded projects might use older SDKs incompatible with your Expo Go version
- Upgrading ensures compatibility with your development environment

### How It Works

```
1. Update expo package → Changes SDK version
   npm install expo@~54.0.0

2. Update all Expo packages → Match new SDK requirements
   npx expo install --fix
   (Internally runs: npm install with updated package versions)

3. Handle dependency conflicts → Force installation if needed
   npm install --legacy-peer-deps
```

### Common Issue: Peer Dependency Conflicts

**What are peer dependencies?**
- Package requirements like "I expect React 19.1.0 to be installed"
- npm strictly checks these and fails if versions don't match exactly

**Why `--legacy-peer-deps`?**
- Tells npm to ignore strict peer dependency checks
- Safe for Expo projects where type definition mismatches rarely cause issues
- Example: `@types/react@19.0.14` vs `@types/react@19.1.10` work identically in practice

**The Problem:**
- `npx expo install --fix` runs `npm install` internally WITHOUT `--legacy-peer-deps`
- When peer dependencies conflict, installation fails with ERESOLVE error
- Solution: Run `npm install --legacy-peer-deps` manually to complete installation

---

## Step-by-Step Commands

### Check Current SDK Version
```bash
# Navigate to project
cd your-project-folder

# Check current expo version
cat package.json | grep '"expo"'
```

### Method 1: Simple Approach (Let it fail, then fix)

```bash
# 1. Update expo to target SDK (e.g., SDK 54)
npm install expo@~54.0.0 --legacy-peer-deps

# 2. Try to update all expo packages (will likely fail with ERESOLVE)
npx expo install --fix

# 3. When it fails, complete installation with legacy flag
npm install --legacy-peer-deps

# 4. Clear cache and start
npx expo start -c
```

### Method 2: Pass Flag Through Expo CLI

```bash
# 1. Update expo to target SDK
npm install expo@~54.0.0 --legacy-peer-deps

# 2. Update all expo packages (pass npm flag through with --)
npx expo install --fix -- --legacy-peer-deps

# 3. Clear cache and start
npx expo start -c
```

### Method 3: Clean Install (Nuclear Option)

```bash
# 1. Remove everything
rm -rf node_modules package-lock.json

# 2. Install expo with legacy flag
npm install expo@~54.0.0 --legacy-peer-deps

# 3. Update all expo packages
npx expo install --fix -- --legacy-peer-deps

# 4. Clear cache and start
npx expo start -c
```

---

## Verification

After upgrade, verify your versions:

```bash
# Check expo version (should be ~54.0.0)
cat package.json | grep '"expo"'

# Check react-native version (should be 0.81.x for SDK 54)
cat package.json | grep '"react-native"'

# Check for warnings
npx expo start -c
```

---

## Common Warnings (Safe to Ignore)

After starting, you might see:
```
The following packages should be updated for best compatibility:
  @types/react@19.0.14 - expected version: ~19.1.10
  typescript@5.8.3 - expected version: ~5.9.2
```

**These are safe to ignore** - they're TypeScript type definitions that don't affect runtime functionality.

To fix them (optional):
```bash
npm install --legacy-peer-deps @types/react@~19.1.10 typescript@~5.9.2
```

---

## Quick Reference: SDK Version Mapping

| Expo Package | SDK | React Native | Node |
|--------------|-----|--------------|------|
| expo@~51.0.0 | 51  | 0.74.x       | 18+  |
| expo@~52.0.0 | 52  | 0.76.x       | 18+  |
| expo@~53.0.0 | 53  | 0.79.x       | 18+  |
| expo@~54.0.0 | 54  | 0.81.x       | 18+  |

---

## Troubleshooting

### Metro bundler won't start
```bash
# Clear watchman cache (macOS)
watchman watch-del-all

# Clear metro cache
npx react-native start --reset-cache
```

### Persistent dependency errors
```bash
# Nuclear option: complete reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Check for package compatibility issues
```bash
npx expo-doctor
```

---

## Key Takeaways

✅ Always use `--legacy-peer-deps` with Expo projects to avoid ERESOLVE errors

✅ The `-c` flag clears cache when starting - use it after SDK upgrades

✅ TypeScript type warnings are usually safe to ignore

✅ `npx expo install --fix` automatically detects and updates mismatched packages

✅ When `npx expo install --fix` fails, run `npm install --legacy-peer-deps` manually