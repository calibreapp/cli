#!/usr/bin/env bash
# Source: https://gist.github.com/andkirby/54204328823febad9d34422427b1937b/raw/semversort.sh | bash

# echo -e "latest\n1.0.1\n1.2.1\n2.3.2-beta.2\n2.3.2-alpha.2\n3.1\n3.1-beta.1\n3.0" | ./latest_version.sh
# => latest
# => 1.0.1
# => 1.2.1
# => 2.3.2-alpha.2
# => 2.3.2-beta.2
# => 3.0
# => 3.1-beta.1
# => 3.1

# echo -e "latest\n1.0.1\n1.2.1\n2.3.2-beta.2\n2.3.2-alpha.2\n3.1\n3.1-beta.1\n3.0" | ./latest_version.sh | tail -n 1
# => 3.1

set -o errexit
set -o pipefail
set -o nounset
#set -o xtrace

if [ -t 0 ]; then
  versions_list=$@
else
  # catch pipeline output
  versions_list=$(cat)
fi

version_weight () {
  echo -e "$1" | tr 'latest' "0" | tr ' ' "\n"  | sed -e 's:\+.*$::' | sed -e 's:^v::' | \
    sed -re 's:^[0-9]+(\.[0-9]+)+$:&-stable:' | \
    sed -re 's:([^A-Za-z])dev\.?([^A-Za-z]|$):\1.10.\2:g' | \
    sed -re 's:([^A-Za-z])(alpha|a)\.?([^A-Za-z]|$):\1.20.\3:g' | \
    sed -re 's:([^A-Za-z])(beta|b)\.?([^A-Za-z]|$):\1.30.\3:g' | \
    sed -re 's:([^A-Za-z])(rc|RC)\.?([^A-Za-z]|$)?:\1.40.\3:g' | \
    sed -re 's:([^A-Za-z])stable\.?([^A-Za-z]|$):\1.50.\2:g' | \
    sed -re 's:([^A-Za-z])pl\.?([^A-Za-z]|$):\1.60.\2:g' | \
    sed -re 's:([^A-Za-z])(patch|p)\.?([^A-Za-z]|$):\1.70.\3:g' | \
    sed -r 's:\.{2,}:.:' | \
    sed -r 's:\.$::' | \
    sed -r 's:-\.:.:'
}
tags_orig=(${versions_list})
tags_weight=( $(version_weight "${tags_orig[*]}") )

keys=$(for ix in ${!tags_weight[*]}; do
    printf "%s+%s\n" "${tags_weight[${ix}]}" ${ix}
done | sort -V | cut -d+ -f2)

for ix in ${keys}; do
  printf "%s\n" ${tags_orig[${ix}]}
done
