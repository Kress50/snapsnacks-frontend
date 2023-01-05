import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const IsLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: "https://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return IsLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
