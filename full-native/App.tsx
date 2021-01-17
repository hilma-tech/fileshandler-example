import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, createPrivateNavigator, useIsAuthenticated } from '@hilma/auth-native';
import { provide } from '@hilma/tools';

import AllCats from './AllCats';
import Login from './Login';
import NewCat from './NewCat';
import EditCat from './EditCat';
import Register from './Register';

const RootStack = createPrivateNavigator();

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isAuthenticated ? "cats" : "Login"}>
      <RootStack.PublicOnlyScreen name="Login" componentName="login" component={Login} redirectName="cats" />
      <RootStack.PublicOnlyScreen name="sign-up" componentName="sign-up" component={Register} redirectName="cats" />
      <RootStack.PrivateScreen name="cats" componentName="cats" component={AllCats} />
      <RootStack.PrivateScreen name="new-cat" componentName="new-cat" component={NewCat} />
      <RootStack.PrivateScreen name="update-cat" componentName="update-cat" component={EditCat} />
    </RootStack.Navigator>
  );
}

export default provide(NavigationContainer, [AuthProvider, { accessTokenCookie: "actlt" }])(App);
