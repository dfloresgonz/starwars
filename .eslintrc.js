module.exports = {
    "env": {
        "es2022": true,
        node: true,
    },
    "extends": ['airbnb-base', 'plugin:jest/recommended', "eslint:recommended", "prettier", 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: ['@typescript-eslint', 'jest'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error'],
        'import/prefer-default-export': 'off',
        // Disabled in favor of using TypeScript
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'linebreak-style': 'off',
        'no-console': ['error', { allow: ['error', 'info', 'warn'] }],
        'no-redeclare': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-redeclare': ['error'],
        '@typescript-eslint/no-shadow': ['error'],
        'max-classes-per-file': 'off',
        'class-methods-use-this': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
}