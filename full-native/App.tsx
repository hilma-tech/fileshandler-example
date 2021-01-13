import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AllCats from './AllCats';
import Login from './Login';
import CatUploader from './CatUploader';
import NewCat from './NewCat';
import EditCat from './EditCat';
import Register from './Register';

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}


// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { AuthProvider } from '@hilma/auth-native';
// import { provide } from '@hilma/tools';


// const RootStack = createStackNavigator();

// const App = () => (
//     <RootStack.Navigator>
//         <RootStack.Screen name="Admin" component={Admin} />
//         <RootStack.Screen name="Client" component={Client} />
//         <RootStack.Screen name="Login" component={Login} />
//     </RootStack.Navigator>
// );

// export default provide(NavigationContainer, AuthProvider)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
