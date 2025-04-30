#!/bin/sh
# cd "$(dirname "$0")" is this needed?
set -e

# Install both backend and frontend dependencies
cd RobobotRPG-api
npm install
cd ../robobotrpgweb-client
npm install
cd ..

# Start both backend and frontend in parallel
cd RobobotRPG-api
npm run dev &
cd ../robobotrpgweb-client
npm run dev &