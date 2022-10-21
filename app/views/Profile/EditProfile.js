import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View, Text, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

//components
import ProfileHeader from '../../components/ProfileHeader';
import GrayInput from '../../components/GrayInput';
import Button from '../../components/Button';
import InfoModal from '../../components/InfoModal';

//context
import AuthContext from '../../context/Auth/AuthContext';

//services
import requestUpdateProfile from '../../services/Profile/requestUpdateProfile';

const EditProfile = () => {
    const navigation = useNavigation();

    const { user, signIn } = useContext(AuthContext);

    const [name, setName] = useState(user?.name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email);
    const [cellphone, setCellphone] = useState(user?.cellphone);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const updateProfile = async () => {
        const form = { name, last_name: lastName, email, cellphone, password };
        setLoading(true);
        const response = await requestUpdateProfile(form);
        console.log(response);
        setLoading(false);
        if (response.code != 200) { return setErrorMessage(response.message); };
        let customer = response?.data ?? user;
        await signIn(customer);
        setMessage(response.message ?? 'Perfil actualizado');
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }

    return (
        <SafeAreaView style={styles.body}>
            <InfoModal text={message} showModal={showModal} setShowModal={setShowModal} />

            <ProfileHeader subtitle={'Editando tu perfil'} />

            <Image style={styles.profileImg} resizeMethod='resize' resizeMode='contain' source={require('src/img/pfp.png')} />

            {/* <Pressable>
                <Text style={styles.label}>Cambiar foto</Text>
            </Pressable> */}

            <View style={styles.container}>
                <Text style={styles.redLabel}>{errorMessage}</Text>
                <GrayInput label={'Nombre'} value={name} onChangeText={(text) => setName(text)} />
                <GrayInput label={'Apellido'} value={lastName} onChangeText={(text) => setLastName(text)} />
                <GrayInput label={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
                <GrayInput label={'Teléfono'} value={cellphone} onChangeText={(text) => setCellphone(text)} />
                <GrayInput label={'Contraseña'} value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
                <Button loading={loading} onPress={updateProfile} text={'Guardar'} width={80} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        alignItems: 'center',
    },
    profileImg: {
        height: hp(14),
        width: wp(30),
        marginVertical: hp(2),
    },
    label: {
        fontFamily: 'Helvetica-Light',
        fontWeight: '600',
        color: '#000',
        fontSize: RFValue(14),
    },
    container: {
        width: wp(90),
        marginHorizontal: wp(5),
    },
    redLabel: {
        color: 'red',
        marginHorizontal: wp(5)
    },
});

export default EditProfile;