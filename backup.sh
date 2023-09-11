#!/bin/bash

# Access PostgreSQL connection details using environment variables
DB_HOST="$DB_HOST"
DB_PORT="$DB_PORT"
DB_NAME="$DB_NAME"
DB_USER="$DB_USER"
DB_PASSWORD="$DB_PASSWORD"

# Directory to store backups
BACKUP_DIR="/path/to/backup/directory"

# GitHub repository details
GITHUB_REPO="https://github.com/GarretTomlin/EduReviseAI"
GITHUB_BRANCH="main"
GITHUB_TOKEN="$GGITHUB_TOKEN"

# Create a timestamp for the dump file
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
DUMP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Dump the database
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -F c -f $DUMP_FILE

# Commit the dump to GitHub
gh auth login --with-token <<< "$GITHUB_TOKEN"
gh repo clone $GITHUB_REPO temp_repo
cp $DUMP_FILE temp_repo/
cd temp_repo
gh repo sync
gh repo commit -m "Monthly database backup $TIMESTAMP"
gh repo push
cd ..
rm -rf temp_repo

# Clean up old backups (optional)
find $BACKUP_DIR -type f -mtime +30 -exec rm {} \;
