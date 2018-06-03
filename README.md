# gulp-workflow
techmoe's basic gulp workflow for web frontend development

## feature

- Support [Pug](https://pugjs.org/) (an useful template engine that can help us to generate HTML structure faster)
- Live preview result in the browser when a file is changed

## Contained modules

- [gulp](https://gulpjs.com/)
- [gulp-cli](https://www.npmjs.com/package/gulp-cli)
- [browser-sync](https://browsersync.io/)

### gulp plugins

- [plumber](https://www.npmjs.com/package/gulp-plumber)
- [rename](https://www.npmjs.com/package/gulp-rename)
- [less](https://www.npmjs.com/package/gulp-less)
- [clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-if](https://www.npmjs.com/package/gulp-if)
- [pug](https://www.npmjs.com/package/gulp-pug)

## Usage
You can use this directory structure to organize your project
```
src
├── index.html
├── static
│   └── gulp.svg
└── style
    └── index.less
```
or this..
```
src
├── admin
│   ├── index.html
│   └── index.less
└── index
    ├── index.html
    ├── index.less
    └── logo.svg
```
All html file will output to the dest path in the same directory structure.

## Commands
- `yarn start` Launch development server and start inspect file changes.
- `yarn build` Build all file for production environment.
- `yarn clean` Clean the work directory.

## TODO
- [ ] ECMAScript support.

## License
MIT