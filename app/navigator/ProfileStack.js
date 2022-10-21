import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Routes from './routes';

const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Routes.Profile} />
            <Stack.Screen name="EditProfile" component={Routes.EditProfile} />
        </Stack.Navigator>
    );
};

export default ProfileStack;