import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';


const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => navigation.replace('SignUser'), 1000);
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <StatusBar backgroundColor={'#fff'} />
            <View style={styles.titleContainer}>
                <Text style={styles.prefix}>Universidad del Atlantico</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
    },
    prefix: {
        fontFamily: 'Helvetica-Light',
        color: '#0093b2',
        fontSize: RFValue(25)
    },
    suffix: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#0093b2',
        fontSize: RFValue(25)
    },
});

export default Splash;