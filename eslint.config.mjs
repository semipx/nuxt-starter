// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-control-regex': 0,
      'no-self-compare': 0,
      'space-infix-ops': 0,
      'vue/no-v-html': 0,
      'vue/multi-word-component-names': 0,
      'vue/no-deprecated-slot-attribute': 0,
      'vue/no-deprecated-dollar-listeners-api': 0,
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 0,
      'vue/no-multiple-template-root': 0,
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'nuxt/nuxt-config-keys-order': 'off'
    }
  }
)
