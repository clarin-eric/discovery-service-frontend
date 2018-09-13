VERSION=2.0.0

all: clean build release

build:
	npm run build

clean:
	rm -rf build

release: clean build
	sed -i '' "s/{{VERSION}}/${VERSION}/g" build/config.js
	cd build && tar -pczvf "../discovery-service-frontend-${VERSION}.tar.gz" *
