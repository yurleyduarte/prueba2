import React, { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';

//components
import GrayInput from '../../../components/GrayInput';
import Button from '../../../components/Button';
import InfoModal from '../../../components/InfoModal';

//services
import requestRegister from '../../../services/Auth/requestRegister';

const RegisterForm = (props) => {
    const { navigation, styles } = props;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const register = async () => {
        const registerForm = { name, last_name: lastName, email, cellphone, password, password_confirmation: passwordConfirmation };
        setLoading(true);
        let response = await requestRegister(registerForm);
        setLoading(false);
        setMessage(response.message);
        if (response.code != 200) { return; };
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigation.replace('ConfirmCode', { cellphone });
        }, 3000);
    }

    const openURL = async () => {
        const url = 'https://drive.google.com/file/d/1OtBKmSObOH29V4hvwc40ph8_UH1kImFW/view';
        // const supported = await Linking.canOpenURL(url);
        // console.log(supported);
        // if (supported) {
        await Linking.openURL(url);
        // }
    }

    return (
        <View style={styles.container}>
            <InfoModal text={message} showModal={showModal} setShowModal={setShowModal} />
            <Text style={styles.redLabel}>{message}</Text>
            <GrayInput label={'Nombre'} onChangeText={(text) => setName(text)} />
            <GrayInput label={'Apellido'} onChangeText={(text) => setLastName(text)} />
            <GrayInput label={'Correo electrónico'} keyboardType={'email-address'} onChangeText={(text) => setEmail(text)} />
            <GrayInput label={'Teléfono'} keyboardType={'phone-pad'} onChangeText={(text) => setCellphone(text)} />
            <GrayInput label={'Contraseña'} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <GrayInput label={'Repetir contraseña'} secureTextEntry onChangeText={(text) => setPasswordConfirmation(text)} />
            <Button loading={loading} width={90} text={'Crear cuenta'} onPress={register} />
            <View style={styles.footerContainer}>
                <Text>Al registrarte aceptas nuestras {/* y Cookies y nuestros <Text style={styles.blueText}>Términos y condiciones</Text> */}</Text>
                <Pressable onPress={openURL}><Text style={styles.blueText}>Políticas de privacidad</Text></Pressable>
            </View>
        </View>
    );
}

export default RegisterForm;