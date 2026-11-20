import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.astro/**",
      "**/dist/**",
      "**/.vercel/**",
      "**/.claude/**",
      "**/*.min.js",
      "**/*.d.ts",
    ],
  },
  {
    files: ["**/*.astro"],
    plugins: { astro: eslintPluginAstro },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx,astro}"],
    rules: {
      "prefer-const": "error",
      "jsx-quotes": ["error", "prefer-double"],
    },
  },
];
