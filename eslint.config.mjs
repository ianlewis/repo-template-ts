// Copyright 2025 Ian Lewis
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import github from "eslint-plugin-github";

export default [
  github.getFlatConfigs().browser,
  github.getFlatConfigs().recommended,
  github.getFlatConfigs().react,
  ...github.getFlatConfigs().typescript,
  {
    files: ["**/*.{js,cjs,mjs,jsx,mjsx,ts,cts,mts,tsx,mtsx}"],
    ignores: ["**/coverage", "**/lib", "**/linter", "**/node_modules"],
    plugins: {
      "@stylistic/ts": stylisticTs,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "tsconfig.eslint.json",
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },

      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: "module",

      parserOptions: {
        project: ["tsconfig.eslint.json"],
        tsconfigRootDir: ".",
      },
    },
    rules: {
      "github/array-foreach": "error",
      "github/async-preventdefault": "warn",
      "github/no-then": "error",
      "github/no-blur": "error",
      "i18n-text/no-en": ["off"],
      "import/no-namespace": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@stylistic/ts/indent": ["error", 2],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];
