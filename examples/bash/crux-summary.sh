#!/bin/bash

set -euo pipefail

SITE=calibre

echo "+++ Fetching CrUX summary for $SITE"
RESULTS=$(calibre crux summary --site="$SITE" --json)

ASSESSMENT=$(echo "$RESULTS" | jq --raw-output '.cruxCvwAssessment')
echo "Core Web Vitals Assessment: $ASSESSMENT"

echo "$RESULTS" | jq '.cruxAggregateMetrics[] | "\(.label): \(.p75)\(.unit) (\(.grading))"'
