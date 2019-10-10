#!/bin/bash

VERSION=$1

if [ -z ${var+x} ]; then
    #VERSION=$(git rev-parse --short HEAD)
    echo "Skipping release"
else
    sed -i "s/{{VERSION}}/${VERSION}/g" build/config.js
    cd build && tar -pczf "../discovery-service-frontend-${VERSION}.tar.gz" *
fi
