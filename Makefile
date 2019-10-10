VERSION=2.0.6

all: clean build release

deps:
    npm install

build:
	npm run build

clean:
	rm -rf build

release: clean deps build
	sed -i '' "s/{{VERSION}}/${VERSION}/g" build/config.js
	cd build && tar -pczvf "../discovery-service-frontend-${VERSION}.tar.gz" *
