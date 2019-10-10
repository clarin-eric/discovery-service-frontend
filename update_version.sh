#!/bin/bash

VERSION=$1

if [ -z ${var+x} ]; then
    VERSION=$(git rev-parse --short HEAD)
fi

sed -i "s/{{VERSION}}/${VERSION}/g" build/config.js
echo "Travis tag: ${VERSION}"