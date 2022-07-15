#!/bin/bash

set -e

# The URL that we will test
URL=https://calibreapp.com/cli
TEST_LOCATION=Sydney # To get a list of possible test locations, run `calibre location-list`
TEST_DEVICE=iPhone12 # To get a list of possible devices, run `calibre device-list`
TEST_CONNECTION=good3G # To get a list of possible connection speeds, run `calibre connection-list`

echo "+++ Running test for $URL (Location: $TEST_LOCATION) (Device: $TEST_DEVICE) (Connection: $TEST_CONNECTION)"
RESULTS=$(calibre test create "$URL" --json --location="$TEST_LOCATION" --device="$TEST_DEVICE" --connection="$TEST_CONNECTION")

TEST_HTML_RESULT_URL=$(echo "$RESULTS" | jq --raw-output '.formattedTestUrl')

echo "- View the full report: $TEST_HTML_RESULT_URL"

# Extract and print 'Time to interactive' from the report using JQ
TTI=$(echo "$RESULTS" | jq --raw-output '.metrics[] | select(.name == "consistently-interactive") | .value')
echo "Time to interactive: $TTI ms"
