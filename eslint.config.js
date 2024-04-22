import globals from 'globals'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const compat = new FlatCompat({ baseDirectory: dirName, recommendedConfig: pluginJs.configs.recommended })

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard-with-typescript'),
  pluginReactConfig
]
