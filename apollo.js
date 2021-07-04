import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onError } from "@apollo/client/link/error"
import { createUploadLink } from 'apollo-upload-client'

const TOKEN = "token"

export const isLogginVar = makeVar(false)
export const tokenVar = makeVar("")
export const userLogIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token)
  isLogginVar(true)
  tokenVar(token)
}
export const userLogOut = async () => {
  await AsyncStorage.removeItem(TOKEN)
  isLogginVar(false)
  tokenVar("")
}

const httpLink = createHttpLink({
  uri: "https://good-snake-16.loca.lt/graphql"
})

const uploadHttpLink = createUploadLink({
  uri: "https://fresh-earwig-5.loca.lt/graphql/graphql"
})

const onErrorLink = onError((graphQLErrors, networkError) => {
  if (graphQLErrors) {
    console.log(`GarphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar()
    }
  }
})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeSHopsNative: offsetLimitPagination()
      }
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache
})