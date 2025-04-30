#!/bin/sh
set -e

# Ensure script runs from the repo root
cd "$(dirname "$0")"

echo "Installing backend dependencies..."
cd RobobotRPG-api
npm install

echo "Starting backend in background..."
npm run dev &
cd ..

echo "Installing frontend dependencies..."
cd robobotrpgweb-client
npm install

echo "Starting frontend in background..."
npm run dev &
cd ..

echo "Both servers are up and running in the background!"