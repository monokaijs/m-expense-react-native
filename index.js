/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import 'react-native-reanimated';

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
