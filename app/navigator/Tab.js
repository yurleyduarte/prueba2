import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Routes from './routes';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import PlacesStack from './PlacesStack';

const BottomTab = createBottomTabNavigator();

export default function Tab() {
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
            <BottomTab.Screen options={{
                unmountOnBlur: true, tabBarShowLabel: false, tabBarIcon: ({ focused }) => {
                    const image = focused ? require('src/img/activeHome.png') : require('src/img/home.png');
                    return (
                        <Image resizeMode='contain'
                            source={image}
                            style={{ height: 20, width: 20 }}
                        />
                    )
                }
            }}
                name="HomeStack" component={HomeStack} />
            <BottomTab.Screen options={{
                unmountOnBlur: true, tabBarShowLabel: false, tabBarIcon: ({ focused }) => {
                    const image = focused ? require('src/img/activeSearch.png') : require('src/img/search.png');
                    return (
                        <Image resizeMode='contain'
                            source={image}
                            style={{ height: 20, width: 20 }}
                        />
                    )
                }
            }}
                name="Search" component={Routes.Search} />
            <BottomTab.Screen options={{
                unmountOnBlur: true, tabBarShowLabel: false, tabBarIcon: ({ focused }) => {
                    const image = focused ? require('src/img/activeStore.png') : require('src/img/store.png');
                    return (
                        <Image resizeMode='contain'
                            source={image}
                            style={{ height: 20, width: 20 }}
                        />
                    )
                }
            }}
                name="PlacesStack" component={PlacesStack} />
            <BottomTab.Screen options={{
                unmountOnBlur: true, tabBarShowLabel: false, tabBarIcon: ({ focused }) => {
                    const image = focused ? require('src/img/activeProfile.png') : require('src/img/profile.png');
                    return (
                        <Image resizeMode='contain'
                            source={image}
                            style={{ height: 20, width: 20 }}
                        />
                    )
                }
            }}
                name="ProfileStack" component={ProfileStack} />
        </BottomTab.Navigator>
    );
}