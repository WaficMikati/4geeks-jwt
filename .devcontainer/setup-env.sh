#!/bin/bash

# Setup environment variables for Codespaces
# This script automatically updates VITE_BACKEND_URL when running in Codespaces

if [ -n "$CODESPACE_NAME" ]; then
    echo "Running in Codespaces - updating VITE_BACKEND_URL..."

    # Construct the Codespaces backend URL
    CODESPACES_BACKEND_URL="https://${CODESPACE_NAME}-3001.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"

    # Update the .env file
    if [ -f .env ]; then
        # Use sed to replace the VITE_BACKEND_URL line
        sed -i "s|VITE_BACKEND_URL=.*|VITE_BACKEND_URL=${CODESPACES_BACKEND_URL}|g" .env
        echo "✓ VITE_BACKEND_URL updated to: ${CODESPACES_BACKEND_URL}"
    else
        echo "⚠ .env file not found"
        exit 1
    fi
else
    echo "Running locally - keeping default VITE_BACKEND_URL"
fi
