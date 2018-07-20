#!/bin/bash

set -e

AGENTS=$(calibre location-list --json | jq --raw-output '[.[] | select(.tag == "Sydney") | .agents[].ipv4] | join(", ")')

# Print a comma seperated list of ip addresses for a given test location
echo "$AGENTS"
