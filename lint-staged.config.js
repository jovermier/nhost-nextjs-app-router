const config = {
  '**/*.js': ['prettier --write', 'eslint --fix'],
  '**/*.jsx': ['prettier --write', 'eslint --fix'],
  '**/*.ts': ['prettier --write', 'eslint --fix'],
  '**/*.tsx': ['prettier --write', 'eslint --fix'],
  '**/*.json': ['prettier --write'],
  '**/*.css': ['prettier --write'],
  '**/*.scss': ['prettier --write'],
  '**/*.cjs': ['prettier --write'],
  '**/*.mjs': ['prettier --write'],
};

export default config;
