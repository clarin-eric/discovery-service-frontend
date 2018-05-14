
build:
	npm run build

release: build
	cd build && tar -pczvf discovery-service-frontend.tar.gz * && mv *.tar.gz ..
