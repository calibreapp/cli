#!/bin/bash

set -euo pipefail

SITE=calibre

echo "+++ Fetching RUM page breakdown for $SITE"
calibre rum pages --site="$SITE" --limit=10
