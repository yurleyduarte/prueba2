import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Pressable, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

//components
import TabBar from '../../../components/TabBar';

//services
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const SignUser = () => {
    const navigation = useNavigation();

    const tabElements = [{ id: 0, name: 'Inicia sesión' }, { id: 1, name: 'Regístrate' }]

    const [tabItemSelected, setTabItemSelected] = useState(tabElements[0]);

    return (
        <SafeAreaView style={styles.body}>
            <StatusBar backgroundColor={'#fff'} />
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.prefix}>EKO</Text><Text style={styles.suffix}>MODA</Text>
                </View>
                <TabBar data={tabElements} tabItemSelected={tabItemSelected} setTabItemSelected={setTabItemSelected} design={'underlined'} />
                {tabItemSelected.id == 0 && <LoginForm navigation={navigation} styles={styles} />}
                {tabItemSelected.id == 1 && <RegisterForm navigation={navigation} styles={styles} />}
            </ScrollView>
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
        marginVertical: hp(5),
    },
    prefix: {
        fontFamily: 'Helvetica-Light',
        color: '#0093b2',
        fontSize: RFValue(20)
    },
    suffix: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#0093b2',
        fontSize: RFValue(20)
    },
    container: {
        flex: 1,
        marginTop: hp(5),
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: hp(3),
        marginHorizontal: wp(5),
        width: wp(90),
        bottom: hp(2),
    },
    blueText: {
        color: '#0093b2',
    },
    redLabel: {
        color: 'red',
        marginHorizontal: wp(5)
    },
});

export default SignUser;