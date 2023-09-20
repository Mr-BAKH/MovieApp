import { NavigationContainer } from '@react-navigation/native';

import * as React from 'react';
import HomeNavigation from './src/routes/homeNavigation';

export default function App() {
  return (
    <NavigationContainer>
     <HomeNavigation/>
    </NavigationContainer>
  );
}