"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink, from, Observable } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from "@/lib/gql";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:8080/query",
    fetchOptions: { cache: "no-store" },
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

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.message === 'unauthorized') {
          return new Observable(observer => {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              observer.error(err);
              return;
            }

            client.mutate({
              mutation: REFRESH_TOKEN,
              variables: { input: { refresh_token: refreshToken } },
            }).then(({ data }) => {
              if (data?.ONIJI_RefreshToken?.user?.token) {
                const newToken = data.ONIJI_RefreshToken.user.token;
                localStorage.setItem('token', newToken);
                
                // Retry the failed request
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: newToken,
                  },
                });
                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                });
              } else {
                observer.error(err);
              }
            }).catch(() => {
              observer.error(err);
            });
          });
        }
      }
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),
  });

  return client;
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}