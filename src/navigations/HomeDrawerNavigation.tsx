import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigation} from '@navigations/MainStackNavigation';
import {CustomDrawer} from '@components/layout/CustomDrawer';

const Drawer = createDrawerNavigator();

export const HomeDrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="MainStack"
        component={MainStackNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
