import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Text, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

//components
import GrayInput from '../../components/GrayInput';
import Button from '../../components/Button';
import InfoModal from '../../components/InfoModal';

//services
import requestConfirmCode from '../../services/Auth/requestConfirmCode';
import requestSendCode from '../../services/Auth/requestSendCode';

const ConfirmCode = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cellphone, recovery = false } = route.params;

    const [code, setCode] = useState('');
    const [canResendCode, setCanResendCode] = useState(false);
    const [codeResend, setCodeResend] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!codeResend) {
            return;
        }
        setTimeout(() => {
            setCanResendCode(true);
            setCodeResend(false);
        }, 180000);
    }, [codeResend]);

    const resendCode = async () => {
        const data = { cellphone };

        let response = await requestSendCode(data);
        setMessage(response.message);

        if (response.code != 200) { return; };
        setCanResendCode(false);
        setCodeResend(true);
    }

    const confirmCode = async () => {
        if (recovery) {
            navigation.replace('RestorePassword');
            return;
        }

        const data = { cellphone, code };

        setLoading(true);
        let response = await requestConfirmCode(data);
        setLoading(false);
        setMessage(response.message);

        if (response.code != 200) { return; };

        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
            });
        }, 3000);
    }
    
    return (
        <SafeAreaView style={styles.body}>
            <InfoModal text={message} showModal={showModal} setShowModal={setShowModal} />

            <StatusBar backgroundColor={'#fff'} />
            <View style={styles.titleContainer}>
                <Text style={styles.prefix}>EKO</Text><Text style={styles.suffix}>MODA</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Código de recuperación</Text>
                <Text style={styles.redLabel}>{message}</Text>
                <GrayInput label={'******'} keyboardType={'numeric'} onChangeText={(text) => setCode(text)} />
                <View style={styles.resendContainer}>
                    {canResendCode &&
                        <>
                            <Text>¿No has recibido el código?</Text>
                            <Pressable onPress={resendCode}>
                                <Text style={styles.boldLabel}>Reenviar</Text>
                            </Pressable>
                        </>
                    }
                    {codeResend && <Text>Código reenviado. Podrá volver a reenviar el código luego de 3 minutos</Text>}
                </View>
                <Button onPress={confirmCode} loading={loading} text={'Continuar'} />
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
    label: {
        fontFamily: 'Helvetica-Light',
        textAlign: 'center',
        fontSize: RFValue(15),
        marginBottom: hp(3),
    },
    redLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: RFValue(15),
        color: 'red',
        marginHorizontal: wp(6)
    },
    resendContainer: {
        flexDirection: 'row',
        marginHorizontal: wp(6),
    },
    boldLabel: {
        fontFamily: 'Helvetica-Light',
        fontSize: RFValue(15),
        color: '#000',
        textDecorationLine: 'underline',
        marginHorizontal: wp(2)
    },
});

export default ConfirmCode;