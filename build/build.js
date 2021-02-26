const fs = require("fs");
const chalk = require("chalk");
const webpack = require("webpack");
const Crx = require("crx");
const merge = require("webpack-merge");
// const Crx = require("crx-webpack-plugin")
const generatePem = require("./generate-pem");
const prodConf = require("./webpack.prod.conf");
const crxConf = require("./crx-conf");
const { resolve } = require("./util");

webpack(prodConf, (err, stats) => {
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }

  console.log(chalk.cyan(" Crx building. \n"));

  // const crx = new Crx({
  //   codebase: "http://localhost:8000/chrome-ext.crx",
  //   privateKey: fs.readFileSync(crxConf.keyPath)
  // });
  // crx
  //   .load(crxConf.contentPath)
  //   .then(crx => crx.pack())
  //   .then(crxBuffer => {
  //     const updateXML = crx.generateUpdateXML();
  //     return Promise.all([
  //       fs.promises.writeFile(resolve("./dist/updates.xml"), updateXML),
  //       fs.promises.writeFile(resolve("./dist/byone.crx"), crxBuffer)
  //     ]);
  //   })
  //   .then(() => {
  //     console.log(chalk.cyan(" Crx Build complete.\n"));
  //   })
  //   .catch(err => {
  //     console.log(chalk.red(" Crx build failed.\n"));
  //     console.log(err);
  //   });
});
