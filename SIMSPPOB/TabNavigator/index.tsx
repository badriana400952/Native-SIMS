import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Crud from '../component/Akun';

import Home from '../component/Home';
import Details from '../component/Transaksi';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Topup from '../component/Topup';
// import Login from '../component/user/Login';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
            // Gantilah "category" dengan ikon yang Anda inginkan
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Top Up"
        component={Topup}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="money-bill-1-wave" color={color} size={size} />
            // Gantilah "category" dengan ikon yang Anda inginkan
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Transaksi"
        component={Details}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="money-check" color={color} size={size} />
            // Gantilah "info-circle" dengan ikon yang Anda inginkan
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Crud}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
            // Gantilah "form" dengan ikon yang Anda inginkan
          ),
          headerShown: false,
        }}
      />

    </Tab.Navigator>
  );

}

export default MyTabs