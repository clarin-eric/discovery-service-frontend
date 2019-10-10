all: clean build release

deps:
	npm install
	npm i webpack --save-dev

build:
	npm run build

clean:
	echo "REVISION=${REVISION}"
	echo "VERSION=${VERSION}"
	rm -rf build

release: clean deps build
	./update_version.sh "${VERSION}"
	cd build && tar -pczf "../discovery-service-frontend-${VERSION}.tar.gz" *
