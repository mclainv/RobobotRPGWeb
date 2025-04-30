 #!/bin/sh
 set -e  # Exit if any command fails

 echo "Setting up backend..."
 cd RobobotRPG-api
 npm install
 cd ..

 echo "Starting server..."
 cd RobobotRPG-api
 npm run dev
 cd ..

 echo "Setting up frontend..."
 cd robobotrpgweb-client
 npm install
 npm run dev
 cd ..