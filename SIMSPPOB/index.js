/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
// import ImagePicker from 'react-native-image-picker';

// ImagePicker.showImagePicker({}, (response) => {
//   console.log('Response = ', response);
// });


AppRegistry.registerComponent(appName, () => App);
