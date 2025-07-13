import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const globals = require('globals')
import tseslint from 'typescript-eslint'

export default tseslint.config([
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ...globals.node,
    },
  },
])
