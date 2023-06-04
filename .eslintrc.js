module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/warnings',
    'plugin:monorepo/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'react', 'jsx-a11y', 'import', 'monorepo'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-console': 'warn',
    'no-unused-vars': 0,
    'prettier/prettier': 'warn',
    'jsx-a11y/img-redundant-alt': 0,
    'react/prop-types': 0,
    'react/no-render-return-value': 0,
    'import/order': ['error'],
    semi: [2, 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
