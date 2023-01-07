import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

//?Logged-in status
export const isLoggedInVar = makeVar(Boolean(token));
//?JTW token
export const authTokenVar = makeVar(token);

//?HTTP
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  headers: { ...Headers, "x-jwt": authTokenVar() || "" },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
