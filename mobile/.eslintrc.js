module.exports = {
    env: {
      es6: true,
    },
    extends: [
      'plugin:react/recommended',
      'airbnb',
      'prettier',
      'prettier/react'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'prettier'
    ],
    settings: {
      'import/resolver': {
        'babel-plugin-root-import': {
          rootPathSuffix: 'src'
        }
      }
    },
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.jsx', '.js']
        }
      ],
      'import/prefer-default-export': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_'}],
      'react/jsx-one-expression-per-line': 'off',
      'global-require': 'off',
      'react-native/no-raw-text': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 'off',
      'no-console': ['error', { allow: ['tron']}],
      'react/jsx-props-no-spreading': 'off',
      'no-undef': 'off',
      //'react/prop-types': 'off',
      'no-unused-vars': 'off',
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn'
    },
  };