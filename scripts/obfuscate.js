const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const optionsOfuscator = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: true,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
};

glob(path.join(process.cwd(), "/dist/migrados-SSOC/", "*.js"), (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((file) => ofuscateCode(file));
});

function ofuscateCode(file) {
  fs.readFile(file, "UTF-8", (err, data) => {
    if (err) {
      throw `Ocurrio un error al momento de leer el archivo: ${err}`;
    }

    console.log(`Se abrio correctamente el archivo ${file}`);

    const resultado = JavaScriptObfuscator.obfuscate(data, optionsOfuscator);

    fs.writeFile(file, resultado.getObfuscatedCode(), (err) => {
      if (err) {
        throw `Ocurrio un error al momento de escribir el archivo: ${err}`;
      }

      console.log(`Se ofusco correctamente el archivo ${file}`);
    });
  });
}
