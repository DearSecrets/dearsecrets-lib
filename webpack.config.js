const path = require("path");

module.exports = {
    mode: "none",
    entry: "./src/webcrypto.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    }
};
