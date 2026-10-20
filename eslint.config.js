const js = require('@eslint/js')
const reactPlugin = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const globals = require('globals')

module.exports = [
    js.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
                //metro provides commonjs (require() for assets) and process at runtime
                ...globals.commonjs,
                process: 'readonly',
                //compile-time define, injected by babel-plugin-transform-define
                RAINDROP_ENVIRONMENT: 'readonly'
            }
        },
        settings: {
            react: { version: 'detect' }
        },
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/display-name': 'off',
            'react/prop-types': 'off',
            'no-unused-vars': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }]
        }
    },
    {
        files: ['*.js'],
        languageOptions: {
            globals: globals.node
        }
    }
]
