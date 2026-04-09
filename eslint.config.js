import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

const tsTypeCheckedConfig =
  tseslint.configs.recommendedTypeChecked ??
  tseslint.configs.strictTypeChecked ??
  tseslint.configs.recommended;

const tsConfigs = tsTypeCheckedConfig
  ? Array.isArray(tsTypeCheckedConfig)
    ? tsTypeCheckedConfig
    : [tsTypeCheckedConfig]
  : [];

export default defineConfig([
  globalIgnores(["dist", "vite.config.ts", "vitest.config.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tsConfigs],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...(reactHooks.configs?.recommended?.rules ?? {}),
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
