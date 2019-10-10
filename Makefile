ifeq ($(VERSION),)
VERSION := none
endif

all: clean build release

deps:
	npm install
	npm i webpack --save-dev

build:
	npm run build

clean:
	rm -rf build

release: clean deps build
	sed -i "s/{{VERSION}}/${VERSION}/g" build/config.js
	echo "Travis tag: ${VERSION}"
	cd build && tar -pczvf "../discovery-service-frontend-${VERSION}.tar.gz" *
