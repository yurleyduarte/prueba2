import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Routes from './routes';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Routes.Home} />
        </Stack.Navigator>
    );
};

export default HomeStack;