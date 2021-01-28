import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'grommet';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Button primary onClick={() => loginWithRedirect()} label='Log In' />
    )
  );
}

export default LoginButton;
