const rollup = require('rollup');
const minify = require('rollup-plugin-babel-minify');

// see below for details on the options
const inputOptions = {
    input: './src/browser.js',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptions = {
    file: './dst/ui-scheme.min.js',
    format: 'iife',
    sourcemap: true
};




// see below for details on the options
const inputOptionsCJS = {
    input: './src/cjs.js',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptionsCJS = {
    file: './dst/ui-scheme.cjs.min.js',
    format: 'cjs',
    sourcemap: true
};

async function build() {
    let bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);

    bundle = await rollup.rollup(inputOptionsCJS);
    await bundle.write(outputOptionsCJS);
}

build();