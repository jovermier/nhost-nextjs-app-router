/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');
const { NhostClient } = require('@nhost/nhost-js');

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN ?? 'local',
  region: process.env.NHOST_REGION,
  start: false,
});

const graphqlUrl = nhost.graphql.httpUrl;

const ts = {
  plugins: [
    'typescript',
    'typescript-operations',
    'named-operations-object',
    'fragment-matcher',
    'typescript-react-apollo',
  ],
  config: {
    skipTypename: false,
    withHooks: true,
    withHOC: false,
    reactApolloVersion: 3,
    useExplicitTyping: true,
    strictScalars: true,
    scalars: {
      Date: { input: 'string | Date', output: 'string | Date' }, // ISO date string, compatible with TypeScript Date type
      Email_timestamptz: { input: 'string | Date', output: 'string | Date' }, // ISO date string for email timestamps
      Email_uuid: 'uuid', // UUID as string for emails
      bigint: 'number', // Use 'string' if the environment does not support 'bigint'
      bytea: 'Uint8Array', // Use Node.js Buffer for binary data; alternatively, use 'string' for base64 encoded values
      citext: 'string', // Case-insensitive text as string
      date: 'string', // Date without time, ISO date string format
      float8: 'number', // Double precision floating point as number
      jsonb: 'jsonb', // More specific than 'any', for JSON objects
      numeric: 'string', // Use string to safely represent very large or precise numbers
      smallint: 'number', // Small integer, safely represented as number
      time: 'string', // Time without timezone, as string
      timestamp: { input: 'string | Date', output: 'string | Date' }, // Timestamp with timezone, as ISO date string
      timestamptz: { input: 'string | Date', output: 'string | Date' }, // Timestamp with timezone, as ISO date string
      timetz: 'string', // Time with timezone, as string
      uuid: 'uuid', // UUID as string
    },
  },
};

module.exports = {
  overwrite: true,
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  schema: [
    {
      [`${graphqlUrl}`]: {
        headers: {
          'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
        },
      },
    },
  ],
  documents: ['./src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': _.merge({}, ts, {
      plugins: [
        'typescript',
        'typescript-operations',
        'named-operations-object',
        'fragment-matcher',
        'typescript-react-apollo',
      ],
      config: {
        defaultBaseOptions: {
          context: {
            headers: {
              'x-hasura-role': 'admin',
            },
          },
        },
      },
    }),
  },
};
