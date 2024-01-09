#!/bin/bash

# Configuration
LOCAL_FOLDER="./dist"
DEPLOY_NAME="edu"
REMOTE_USER="mahy"
REMOTE_HOST="103.230.14.162"
TEMP_FOLDER="/home/mahy/code"
REMOTE_FOLDER="/var/www/html"

npm install
npm run build

# Step 1: Rename the folder
if [ -d "$LOCAL_FOLDER" ]; then
    rm -rf $DEPLOY_NAME
    mv  "${LOCAL_FOLDER}" "./$DEPLOY_NAME" # Copy to the new 'edu' folder
else
    echo "Directory $LOCAL_FOLDER does not exist."
    exit 1
fi

# Step 2: Upload the folder to the remote server
rsync -avz -e ssh "./$DEPLOY_NAME" "$REMOTE_USER@$REMOTE_HOST:$TEMP_FOLDER"

# Move the folder to the final destination with sudo privileges
ssh -t "$REMOTE_USER@$REMOTE_HOST" "sudo rm -rf $REMOTE_FOLDER/$DEPLOY_NAME && sudo mv $TEMP_FOLDER/$DEPLOY_NAME $REMOTE_FOLDER"

echo "Deployed successfully."
