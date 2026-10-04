module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier'
  ],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    // Projet sans TypeScript ni prop-types : les props sont documentées par leur usage.
    'react/prop-types': 'off'
  }
}
