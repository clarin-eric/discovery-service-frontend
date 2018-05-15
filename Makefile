VERSION=0.0.1-alpha3

build:
	npm run build

clean:
	rm -rf build

release: clean build
	echo "{\"version\": \"${VERSION}\"}" > build/version.json
	cd build && tar -pczvf "../discovery-service-frontend-${VERSION}.tar.gz" *
