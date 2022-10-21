import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Routes from './routes';

const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Routes.Splash} />
                <Stack.Screen name="SignUser" component={Routes.SignUser} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;