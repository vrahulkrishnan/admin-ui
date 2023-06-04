module.exports = {
  arrowParens: 'avoid',
  useTabs: false,
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  semi: true,
  trailingComma: 'none',
  parser: 'typescript',
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss'
      }
    }
  ]
};
