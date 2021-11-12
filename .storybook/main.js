// module.exports = {
//   "stories": [
//     "../src/**/*.stories.mdx",
//     "../src/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   "addons": [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials"
//   ]
// }
const path = require('path');

// your app's webpack.config.js
const custom = require('../config/webpack.config.js')('development');
const {oneOf} = custom.module.rules.pop();
// const rules = custom.module.rules;
// rules[0].use[0]

module.exports = {
  stories: ['../src/ui/**/*.stories.js'],
  // logLevel: 'debug',
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    // '@storybook/preset-create-react-app',
  ],
  webpackFinal: (config) => {
    const conf = { 
      ...config, 
      module: { 
        rules: [
          ...custom.module.rules,
          { oneOf: oneOf.slice(0, -1) }
        ]
      },
      plugins: [
        ...config.plugins,
        // ...custom.plugins,
      ],
    };
    console.log()
    console.log()
    console.log()
    console.log("conf")
    console.log(conf.module.rules[2].oneOf)
    console.log()
    console.log()
    console.log()
    console.log()
    return conf;
  },
};