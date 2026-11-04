import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["dist", "dev-dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
];
