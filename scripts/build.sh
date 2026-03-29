#!/bin/bash
set -e

echo "Installing dependencies with pnpm..."
pnpm install

echo "Building VirtFusion package..."
pnpm build

echo "Build completed successfully!"
ls -la dist/
