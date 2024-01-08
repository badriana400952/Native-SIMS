import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Routing from './routing/Routing';

function App(): JSX.Element {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store={store}>
          <Routing />
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
