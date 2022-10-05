const config = {
  schema: 'https://localhost:4000/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/gql/': { preset: 'client' },
  },
};
export default config;
