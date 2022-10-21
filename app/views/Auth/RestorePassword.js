import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import GrayInput from '../../components/GrayInput';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const RestorePassword = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.body}>
            <StatusBar backgroundColor={'#fff'} />
            <View style={styles.titleContainer}>
                <Text style={styles.prefix}>EKO</Text><Text style={styles.suffix}>MODA</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Nueva contraseña</Text>
                <GrayInput label={'Contraseña'} secureTextEntry />
                <GrayInput label={'Repetir contraseña'} secureTextEntry />
                <Button text={'Cambiar'} onPress={() => navigation.replace('SignUser')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(20),
    },
    prefix: {
        fontFamily: 'Helvetica-Light',
        color: '#0093b2',
        fontSize: RFValue(30)
    },
    suffix: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#0093b2',
        fontSize: RFValue(30)
    },
    container: {
        flex: 1,
        marginTop: hp(10),
    },
    label:{
        fontFamily: 'Helvetica-Light',
        textAlign: 'center',
        fontSize: RFValue(15),
        marginBottom: hp(3),
    },
});

export default RestorePassword;