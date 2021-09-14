import React from "react"
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from "../aws-exports"

console.log(awsmobile)
export default function amplifyClient({ children }) {
  Amplify.configure(awsmobile)
  Amplify.configure({
    API: {
      graphql_headers: async () => {
        const session = await Auth.currentSession();
        return {
          Authorization: session.getIdToken().getJwtToken(),
        };
      },
    },
  });
  return <div>{children}</div>
}