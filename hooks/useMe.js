import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useEffect } from 'react';
import { isLogginVar, tokenVar, userLogOut } from '../apollo';

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`

const useMe = () => {
  const hasToken = useReactiveVar(isLogginVar)
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken
  })
  useEffect(() => {
    if (data?.me === null) {
      userLogOut()
    }
  })
  return { data };
}

export default useMe;