VERSION=0.0.1-RC3

all: clean build release

build:
	npm run build

clean:
	rm -rf build

release: clean build
	sed -i '' "s/{{VERSION}}/${VERSION}/g" build/config.js
	cd build && tar -pczvf "../discovery-service-frontend-${VERSION}.tar.gz" *
