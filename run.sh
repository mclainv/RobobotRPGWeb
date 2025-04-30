#!/bin/sh
set -e

echo "Setting up backend..."
cd RobobotRPG-api
npm install
cd ..

echo "Starting backend in background..."
cd RobobotRPG-api
npm run dev &
cd ..

echo "Setting up frontend..."
cd robobotrpgweb-client
npm install
npm run dev

# End of script; background processes will continue running