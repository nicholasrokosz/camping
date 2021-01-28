import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'grommet';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        primary
        color='light-2'
        onClick={() => logout()}
        label='Log Out'
      />
    )
  );
}

export default LogoutButton;
