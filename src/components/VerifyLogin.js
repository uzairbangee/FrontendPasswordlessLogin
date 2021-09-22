import React, {useEffect, useState} from "react"
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut
} from "@aws-amplify/ui-react"
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

export default function Home({location}) {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  console.log("location ", location);
  const pathname = location.href.split("/")[location.href.split("/").length - 1];
  console.log(pathname)
  const signIn = async(challenge) => {
    try {
        const [email, code] = challenge.split(',');
        const new_email = email.replace("%40", "@");
        const user = await Auth.signIn(new_email);
        console.log("user", user);
        const challegnegnew = await Auth.sendCustomChallengeAnswer(user, code);
        console.log("challegnegnew ", challegnegnew);
        const signin = await Auth.currentSession();
        console.log("signin ", signin);
        // setSuccess(true);
    } catch (e) {
        console.log(e);
        // setError(e);
    }
  };


  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData)
    });
  }, []);

  useEffect(() => {
    signIn(pathname);
  }, [])

  // console.log("user", user)


  // const load = async () => {
  //   if(user && user?.signInUserSession?.idToken?.jwtToken){
  //     try {
  //       var config = {
  //         responseType: 'blob',
  //         headers: {
  //           "Authorization": user.signInUserSession.idToken.jwtToken
  //         }
  //       };
  //       const resp = await axios.get("https://97raxq3t46.execute-api.us-east-1.amazonaws.com/prod/download?versionId=GO-1&entityId=uzairbangee", config);
  //       const url = window.URL.createObjectURL(new Blob([resp.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', 'file.json');
  //       document.body.appendChild(link);
  //       link.click();
  //       console.log("resp", resp)
  //     } catch (error) {
        
  //     }
  //   }
  // }

  return (
    authState === AuthState.SignedIn && user ?
    <>
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '50px'}}>
      <h3>Home</h3>
      {/* <button onClick={load}>Load</button> */}
      <AmplifySignOut />
    </div>
    </>
    :
    <>
        <AmplifyAuthenticator
          usernameAlias="email"
      >
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Email",
              placeholder: "Enter your email address",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Enter your password",
              required: true,
            }
          ]}
        />
      </AmplifyAuthenticator>
    </>
  )
}