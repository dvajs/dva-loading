
build:
	npm run build

publish: build
	npm publish

publish-sync: publish
	cnpm sync dva-loading
	tnpm sync dva-loading
