import { execSync } from 'child_process';

const projectRoot = '/vercel/share/v0-project';

console.log('[v0] Starting build process...');
console.log(`[v0] Project root: ${projectRoot}`);

try {
  // Install dependencies using npm
  console.log('[v0] Installing dependencies with npm...');
  execSync('npm install', {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  // Build the project with tsup
  console.log('[v0] Building with tsup...');
  execSync('npm run build', {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  console.log('[v0] Build completed successfully!');
  console.log('[v0] Deployment ready!');
} catch (error) {
  console.error('[v0] Build failed:', error.message);
  process.exit(1);
}
