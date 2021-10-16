import 'react-native-gesture-handler';
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import AppProvider from './hooks';
import colors from './util/styles/colors';

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {Platform.OS === 'android' && (
          <StatusBar
            backgroundColor={colors.transl}
            translucent={true}
            barStyle="dark-content"
          />
        )}
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
