const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');

// see below for details on the options
const inputOptions = {
    input: './src/browser.js',
    plugins: [ terser() ]
};
const outputOptions = {
    file: './dst/ui-scheme.min.js',
    format: 'iife',
    sourcemap: true
};




// see below for details on the options
const inputOptionsCJS = {
    input: './src/cjs.js',
    plugins: [ terser() ]
};
const outputOptionsCJS = {
    file: './dst/ui-scheme.cjs.min.js',
    format: 'cjs',
    sourcemap: true
};

async function build() {
    try {
        let bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
    
        bundle = await rollup.rollup(inputOptionsCJS);
        await bundle.write(outputOptionsCJS);
    } catch(e) {
        console.error(e)
    }
}

build();