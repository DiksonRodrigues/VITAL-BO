import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../components/DrawerContent';

import HomeRoutes from '../routes/stack.routes';
import Historic from '../pages/Historic';
import Support from '../pages/Support';
import TopMenu from '../components/TopMenu';

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => (
  <>
    <TopMenu />
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Novo B.O.">
      <Drawer.Screen name="Novo B.O." component={HomeRoutes} />
      <Drawer.Screen name="Histórico" component={Historic} />
      <Drawer.Screen name="Suporte" component={Support} />
    </Drawer.Navigator>
  </>
);

export default DrawerRoutes;
