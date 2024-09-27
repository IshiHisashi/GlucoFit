import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/build/",
      "**/dist/",
      "**/.env",
      "**/*.d.ts",
      "**/babel.config.js",
      "**/metro.config.js",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, "off"])
        ),
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },

    rules: {},
  },
  {
    files: ["**/*.js", "**/*.ts"],

    rules: {
      "no-console": ["off"],
      "no-unused-vars": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"],
      "import/extensions": ["off"],
      "arrow-body-style": ["off"],
      "no-plusplus": ["off"],
      "no-underscore-dangle": ["off"],
      "@typescript-eslint/no-explicit-any": ["warn"],
    },
  },
];
