module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'airbnb',
      'plugin:tailwindcss/recommended',
      'prettier',
   ],

   ignorePatterns: ['dist', '.eslintrc.cjs'],

   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

   settings: { react: { version: '18.2' } },

   plugins: ['react-refresh', 'import', 'jsx-a11y'],

   rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-key': 'warn',
      'react-hooks/exhaustive-deps': 'off',
      'no-plusplus': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-nested-ternary': 'off',
      'react-refresh/only-export-components': 'off',
   },

   overrides: [
      {
         files: ['*.ts', '*.tsx', '*.js'],
         parser: '@typescript-eslint/parser',
      },
   ],
};
