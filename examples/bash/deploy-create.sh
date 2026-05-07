#!/bin/bash

set -euo pipefail

SITE=calibre
REVISION=$(git rev-parse --short HEAD)
REPOSITORY=$(git remote get-url origin)

echo "+++ Creating deploy marker for $SITE (revision: $REVISION)"
calibre deploy create --site="$SITE" --revision="$REVISION" --repository="$REPOSITORY" --json
