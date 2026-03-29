# VirtFusion Deployment Configuration

## ✅ Deployment Checklist

### Build Configuration
- [x] **vercel.json** - Configured with pnpm build command and dist output directory
- [x] **tsup.config.ts** - Configured to build ESM and CJS formats with TypeScript declarations
- [x] **tsconfig.json** - Properly configured for TypeScript compilation
- [x] **package.json** - Contains correct main, module, types, and files entries

### Package Configuration
- [x] **.npmignore** - Excludes source files, configs, and unnecessary files from npm package
- [x] **.vercelignore** - Excludes unnecessary files from Vercel deployment
- [x] **pnpm-lock.yaml** - Locked dependencies for reproducible builds

### Source Code
- [x] **src/index.ts** - Main entry point with VirtFusionV1 class
- [x] **modules/** - Utility modules for error handling, JSON operations, object utilities, TCP ping, SSH key validation
- [x] **src/functions/** - API functions organized by domain (servers, SSH keys, packages, general)

### CI/CD Configuration
- [x] **.github/workflows/npm-publish.yml** - Automatic npm publishing on version commits
- [x] **Biome configuration** - Code quality rules and formatting standards

## Build Output
The build process generates:
- `dist/index.js` - CommonJS format
- `dist/index.mjs` - ES Module format
- `dist/index.d.ts` - TypeScript declarations
- `dist/index.d.mts` - TypeScript declarations for ESM

## Deployment Steps

### 1. Local Development
```bash
pnpm install
pnpm build
```

### 2. Vercel Deployment
The project is configured to automatically build on push to the main branch:
- Installs dependencies using pnpm
- Runs `pnpm build` to compile TypeScript
- Deploys the `dist` directory as the output

### 3. npm Publishing
Automatic on version commit message:
- Commit message format: `X.Y.Z` (e.g., `0.6.1`)
- Requires `NPM_TOKEN` secret in GitHub repository settings
- Publishes to npm registry with the contents of the `dist` folder

## Environment Variables
No environment variables required for deployment.

## Troubleshooting
- **Build fails with missing modules**: Run `pnpm install` to ensure all dependencies are installed
- **Type errors during build**: Check that all source files have proper TypeScript syntax
- **npm publish fails**: Verify NPM_TOKEN is set in GitHub Secrets and has correct permissions

## Version History
- **0.6.0** - Current stable release
