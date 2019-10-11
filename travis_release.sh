#!/bin/bash

set -ex

VERSION=$1

if [ -z ${VERSION+x} ]; then
    #VERSION=$(git rev-parse --short HEAD)
    echo "Skipping release, no version supplied"
else
    sed -i "s/{{VERSION}}/${VERSION}/g" build/config.js
    cd build && tar -pczf "../discovery-service-frontend-${VERSION}.tar.gz" *
fi
