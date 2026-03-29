#!/usr/bin/env python3
import subprocess
import sys
import os

project_root = '/vercel/share/v0-project'
os.chdir(project_root)

print('[v0] Starting build process...')
print(f'[v0] Project root: {project_root}')

try:
    # Install dependencies using npm
    print('[v0] Installing dependencies with npm...')
    subprocess.run([sys.executable, '-m', 'pip', 'install', 'nodeenv'], check=True)
    
    # Alternatively try with npm directly
    print('[v0] Running npm install...')
    result = subprocess.run(['npm', 'install'], cwd=project_root, capture_output=True, text=True)
    if result.returncode != 0:
        print('[v0] npm install output:', result.stdout)
        print('[v0] npm install error:', result.stderr)
    
    # Build the project
    print('[v0] Building with npm run build...')
    result = subprocess.run(['npm', 'run', 'build'], cwd=project_root, capture_output=True, text=True)
    print('[v0] Build output:', result.stdout)
    if result.returncode != 0:
        print('[v0] Build error:', result.stderr)
        sys.exit(1)
    
    print('[v0] Build completed successfully!')
    print('[v0] Deployment ready!')
    
except Exception as error:
    print(f'[v0] Build failed: {error}')
    sys.exit(1)
