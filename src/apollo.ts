import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { CreateOrderItemInput } from "./api/types/globalTypes";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

//?Logged-in status
export const isLoggedInVar = makeVar(Boolean(token));
//?JTW token
export const authTokenVar = makeVar(token);
//?Order cart
export const orderCartVar = makeVar([] as CreateOrderItemInput[]);

//?HTTP
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://snapsnacks.onrender.com/graphql"
      : "http://localhost:4000/graphql",
});

//?WebSocket
const wsLink = new WebSocketLink(
  new SubscriptionClient(
    process.env.NODE_ENV === "production"
      ? "wss://snapsnacks.onrender.com/graphql"
      : "ws://localhost:4000/graphql",
    {
      reconnect: true,
      lazy: true,
      timeout: 300000,
      inactivityTimeout: 300000,
      connectionParams: {
        "x-jwt": authTokenVar() || "",
      },
      connectionCallback: (error) => {
        if (error) {
          console.error("WS CONNECTION_CB ERROR::: ", error);
        }
      },
    }
  )
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

//?Splitting communication based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
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
