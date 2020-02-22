const rollup = require('rollup');
const minify = require('rollup-plugin-babel-minify');

// see below for details on the options
const inputOptions = {
    input: './src/index.js',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptions = {
    file: './dst/ui-builder.min.js',
    format: 'esm',
    sourcemap: true
};


// see below for details on the options
const inputOptions2 = {
    input: './src/export.js',
    plugins: [
        minify({
			comments: false
        })
    ]
};
const outputOptions2 = {
    file: './dst/export_ui-builder.min.js',
    format: 'cjs',
    sourcemap: true
};

async function build() {
    let bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);

    bundle = await rollup.rollup(inputOptions2);
    await bundle.write(outputOptions2);
}

build();