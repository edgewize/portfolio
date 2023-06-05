# Portfolio | Taylor Edginton

This portfolio is a version of [Eleventastic](https://github.com/maxboeck/eleventastic) with Tailwind CSS instead of Sass. 

## Getting Started

To install the necessary packages, run the following command in the root folder of the site:

    npm install

### Commands

- Run `npm start` for a development server and live reloading
- Run `npm run build` to generate a production build.

## CSS

In this portfolio project, the CSS styling works with Tailwind CSS instead of Sass as in the original Eleventastic project. The main index file remains in `src/assets/styles/main.scss`. You can import any Tailwind CSS code you want in there; it will be processed and optimized. The output is in `dist/assets/styles/main.css`.

## JS

JavaScript in this portfolio can be written in ES6 syntax. The main index file is in `src/assets/scripts/main.js`. It will be transpiled to ES5 with Babel, bundled together with webpack, and minified in production. The output is in `dist/assets/scripts/main.js`.

## SVG Icons

All SVG files added to `src/assets/icons` will be bundled into a `symbol` sprite file. The SVG filename will then be used as the symbol identifier, and the icon can be used as a shortcode. For example, if you have a `github.svg` file in that folder, you can display it anywhere by using `{% icon "github" %}` in your templates.

## Critical CSS

Currently, critical CSS will only be inlined in the head of the homepage. This is done by using the critical package in an automatic transform.

## Acknowledgements

Many thanks to Max Boeck for creating the Eleventastic project and providing a wonderful base for this portfolio. In addition, heartfelt thanks to Phil Hawksworth for EleventyOne, Mike Riethmuller for Supermaya, and Zach Leatherman for zachleat.com, from whom Max Boeck drew inspiration.
