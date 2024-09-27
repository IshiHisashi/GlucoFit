// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"], // Adjust the pattern to your needs
      rules: {
        "no-console": ["warn"], // warn at remaining console.log (default is error)
        "no-unused-vars": ["off"], // don't care about unused variables
        "@typescript-eslint/no-unused-vars": ["off"], // don't care about unused variables
        "import/extensions": ["off"], // use extentions for import from path
        "arrow-body-style": ["off"], // allow to use block statement for arrow functions
        "import/no-extraneous-dependencies": [
          "off",
          {
            devDependencies: false,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ], // allow to import from dev/potional/peer dependencies in package.json
        "react/function-component-definition": [
          "warn",
          {
            namedComponents: "arrow-function",
            unnamedComponents: "function-expression",
          },
        ], // consistent function type
        "react/prop-types": "off", // don't care about the type of props
        "no-underscore-dangle": "off", // allow to use dangling underscores in identifiers like "_id"
        // single quotations usage is turned off by Prettier.
        // trailing comma usage is set to be "es5" by Prettier.
      },
    },
  ],
};
