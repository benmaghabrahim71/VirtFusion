import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('Installing dependencies with pnpm...');
    await execAsync('pnpm install');

    console.log('Building VirtFusion package...');
    await execAsync('pnpm build');

    console.log('Build completed successfully!');
    await execAsync('ls -la dist/');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
