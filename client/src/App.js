import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from './components/AppBar';
import Map from './components/Map';
import {
  Box,
  Button,
  CheckBoxGroup,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext,
  Text,
} from 'grommet';
import { FormClose, Notification, TreeOption } from 'grommet-icons';
const theme = {
  global: {
    colors: { brand: '#16A34A' },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>
            Park Pal <TreeOption />
          </Heading>
          <LoginButton />
          <LogoutButton />
        </AppBar>
        <Box>
          <Map />
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
