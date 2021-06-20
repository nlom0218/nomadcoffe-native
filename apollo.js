import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  uri: "https://hungry-sheep-26.loca.lt/graphql"
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar()
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})