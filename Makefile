all: clean build release

deps:
	npm install
	npm i webpack --save-dev

build:
	npm run build

clean:
	rm -rf build

release: clean deps build
	./travis_release.sh "${VERSION}"
