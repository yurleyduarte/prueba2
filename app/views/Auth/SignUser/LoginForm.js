import React, { useState, useContext } from 'react';
import { View, Pressable, Text } from 'react-native';

//components
import GrayInput from '../../../components/GrayInput';
import Button from '../../../components/Button';

//services
import requestLogin from '../../../services/Auth/requestLogin';
import setUserToken from '../../../services/Auth/setUserToken';

//context
import AuthContext from '../../../context/Auth/AuthContext';

const LoginForm = (props) => {
    const { navigation, styles } = props;

    const { signIn, user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const loginForm = { cellphone, password };
        setLoading(true);
        let response = await requestLogin(loginForm);
        setLoading(false);
        setMessage(response.message);
        if (response.code != 200) { return; };
        let token = response?.data?.auth?.token;
        setUserToken(token);
        let customer = response?.data?.customer ?? {};
        await signIn(customer);
        navigation.replace('Splash');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.redLabel}>{message}</Text>
            <GrayInput label={'Celular'} keyboardType={'phone-pad'} onChangeText={(text) => setCellphone(text)} />
            <GrayInput label={'Contraseña'} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <Button loading={loading} width={90} text={'Entrar'} onPress={login} />
            <Pressable style={styles.footerContainer} onPress={() => navigation.replace('Recovery')}>
                <Text>¿Olvidaste la Contraseña? Recuperar</Text>
            </Pressable>
        </View>
    );
}

export default LoginForm;