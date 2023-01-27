import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { CreateOrderItemInput } from "./api/types/globalTypes";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

//?Logged-in status
export const isLoggedInVar = makeVar(Boolean(token));
//?JTW token
export const authTokenVar = makeVar(token);
//?Order cart
export const orderCartVar = makeVar([] as CreateOrderItemInput[]);

//?HTTP
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          orderCart: {
            read() {
              return orderCartVar();
            },
          },
        },
      },
    },
  }),
});
