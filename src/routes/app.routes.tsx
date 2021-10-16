import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Drawer from './drawer.routes';

const Routes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AppStack.Screen name="Main" component={Drawer} />
  </AppStack.Navigator>
);

export default Routes;
