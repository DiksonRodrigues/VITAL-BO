import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import BO from '../pages/BO';
import BoDescription from '../pages/boDescription';
import BoPhoto from '../pages/boPhoto';
import MedidasTomadas from '../pages/medidasTomadas';
import BoCustos from '../pages/boCustos';
import BoFechamento from '../pages/BoFechamento';

const AuthStack = createStackNavigator();

const Routes: React.FC = () => (
  <>
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="B.O." component={BO} />
      <AuthStack.Screen name="Description" component={BoDescription} />
      <AuthStack.Screen name="Photo" component={BoPhoto} />
      <AuthStack.Screen name="MedidasTomadas" component={MedidasTomadas} />
      <AuthStack.Screen name="Custos" component={BoCustos} />
      <AuthStack.Screen name="Fechamento" component={BoFechamento} />
    </AuthStack.Navigator>
  </>
);

export default Routes;
