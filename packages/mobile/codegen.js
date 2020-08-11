const generatesSharedConfig = {
  namingConvention: {
    transformUnderscore: true,
  },
};

module.exports = {
  schema: [
    {
      [`${process.env.HASURA_GRAPHQL_ENDPOINT}`]: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: './src/**/*.graphql',
  overwrite: true,
  generates: {
    './src/types/graphql.d.ts': {
      plugins: ['typescript'],
      config: {
        enumsAsTypes: true,
        ...generatesSharedConfig,
      },
    },
    './src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql.ts',
        baseTypesPath: 'types/graphql.ts',
      },
      plugins: ['typescript-operations', 'typed-document-node'],
      config: generatesSharedConfig,
    },
    './introspection.json': {
      plugins: 'introspection',
      config: {
        minify: true,
      },
    },
  },
};
