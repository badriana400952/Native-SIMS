
import React  from 'react';
import MyTabs from '../TabNavigator';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginComponent from '../component/user/Login';
import { useAppSelector } from '../app/store';
import Registrasi from '../component/user/Registrasi';





const Stack = createStackNavigator();
const Router = ({ navigation }: any) => {
  const { token } = useAppSelector((state) => state.user)

  return (
    <>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {
          token ? (
            <>
              <Stack.Screen name="Tabs" component={MyTabs} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginComponent} />
              <Stack.Screen name="Registrasi" component={Registrasi} />
            </>
          )
        }
      </Stack.Navigator>
    </>
  );
};

export default Router;