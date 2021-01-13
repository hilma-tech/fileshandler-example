import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AllCats from './AllCats';
import Login from './Login';
import CatUploader from './CatUploader';
import NewCat from './NewCat';
import EditCat from './EditCat';
import Register from './Register';



import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, createPrivateNavigator } from '@hilma/auth-native';
import { provide } from '@hilma/tools';


const RootStack = createPrivateNavigator();

const App = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.PrivateScreen name="cats" componentName="cats" component={AllCats} />
    <RootStack.PublicOnlyScreen name="Login" componentName="login" component={Login} redirectName="cats" />
    <RootStack.PublicOnlyScreen name="sign-up" componentName="sign-up" component={Register} redirectName="cats" />
    <RootStack.PrivateScreen name="new-cat" componentName="new-cat" component={NewCat} />
    <RootStack.PrivateScreen name="update-cat" componentName="update-cat" component={EditCat} />
  </RootStack.Navigator>
);

export default provide(NavigationContainer, AuthProvider)(App);
