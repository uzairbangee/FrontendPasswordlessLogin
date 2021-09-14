import React, {useEffect, useState} from "react"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut
} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { Router } from "@reach/router";
import VerifyLogin from "../components/VerifyLogin";
export default function VerifyEmail({location}) {

  return (
    <Router basepath="/emailverify">
          <VerifyLogin path="/:challenge" />
    </Router>
  )
}
