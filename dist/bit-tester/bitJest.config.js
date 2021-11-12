"use strict";

var dir = __dirname.split("/");

dir.pop();
var rootDir = dir.join("/");
dir.pop();
var distDir = dir.join("/");
module.exports = {
  "roots": ["<rootDir>"],
  "setupFiles": [__dirname + "/setupTests.js"],
  "testMatch": ["<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/**/*.test.{js,jsx}"],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx|map)$": "babel-jest",
    "^.+\\.css$": rootDir + "/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": rootDir + "/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$", "^.+\\.module\\.(css|sass|scss)$"],
  "modulePaths": [],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"]
};

//# sourceMappingURL=bitJest.config.js.map