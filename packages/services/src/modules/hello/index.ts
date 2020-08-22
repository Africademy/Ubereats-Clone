import { gql } from 'apollo-server';
import { GraphQLModule } from '@graphql-modules/core';
import { Resolvers } from 'types/graphql';
import commonModule from 'modules/common';

const typeDefs = gql`
  extend type Query {
    hello: String
  }
`;

const resolvers: Resolvers = {
  Query: {
    hello: () => 'world',
  },
};

export default new GraphQLModule({
  name: 'hello',
  typeDefs,
  resolvers,
  imports: () => [commonModule],
});