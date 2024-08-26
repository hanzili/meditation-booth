"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from "@/lib/gql";
import { useMutation } from "@apollo/client";

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "http://localhost:8080/query",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  const errorLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(async ({ message, locations, path, extensions }) => {
        if (extensions?.code === 'UNAUTHENTICATED') {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            return;
          }

          const [refreshTokenMutation, { loading: refreshTokenLoading, error: refreshTokenError }] = useMutation(REFRESH_TOKEN);
          const newToken = await refreshTokenMutation({ variables: { input: { refresh_token: refreshToken } } });
          
          if (newToken?.data?.refreshToken?.token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', newToken.data.refreshToken.token);
            }
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                authorization: newToken,
              },
            });
            return forward(operation);
          }
        }
      });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? token : '',
      },
    };
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}