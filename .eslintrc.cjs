module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    // 'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'server.cjs'],
  parser: '@typescript-eslint/parser',
  // plugins: ['react-refresh'],
  plugins: ['@typescript-eslint', 'react-refresh', 'prettier'],

  settings: {
    react: {
      version: 'detect' // Automatically detect the React version
    }
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
