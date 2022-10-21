import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, Image, View, Text, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

//components
import ProfileHeader from '../../components/ProfileHeader';

//context
import AuthContext from '../../context/Auth/AuthContext';

//services
import clearStorage from '../../services/Auth/clearStorage';

const Profile = () => {
    const navigation = useNavigation();

    const { user, signOut } = useContext(AuthContext);

    const logOut = async () => {
        await clearStorage();
        signOut();
        navigation.replace('Splash');
    }

    return (
        <SafeAreaView style={styles.body}>
            <ProfileHeader subtitle={'Edita tu perfil'} />

            <Pressable onPress={() => navigation.navigate('EditProfile')} style={styles.card}>
                <View style={styles.row}>
                    <Image style={styles.profileImg} resizeMethod='resize' resizeMode='contain' source={require('src/img/pfp.png')} />
                    <View>
                        <Text style={styles.boldLabel}>{user?.name} {user?.last_name}</Text>
                        <View style={styles.row}>
                            <Image style={styles.locationIco} resizeMethod='resize' resizeMode='contain' source={require('src/img/locationPin.png')} />
                            <Text style={styles.label}>Col</Text>
                        </View>
                    </View>
                    <Image style={styles.rightArrow} resizeMethod='resize' resizeMode='contain' source={require('src/img/rightArrow.png')} />
                </View>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.text}>{user?.email}</Text>
                <Text style={styles.label}>Teléfono</Text>
                <Text style={styles.text}>+57 {user?.cellphone}</Text>
            </Pressable>

            <View style={styles.middleSection}>
                <Text style={styles.title}>Ayuda y soporte</Text>
                <Text style={styles.label}>Déjanos tus preguntas o problemas</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text>FAQs</Text>
                    <Image style={styles.rightArrow} resizeMethod='resize' resizeMode='contain' source={require('src/img/rightArrow.png')} />
                </View>
                <View style={styles.row}>
                    <Text>Contáctenos</Text>
                    <Image style={styles.rightArrow} resizeMethod='resize' resizeMode='contain' source={require('src/img/rightArrow.png')} />
                </View>
            </View>

            <Pressable onPress={logOut} style={styles.btn}>
                <Text style={styles.whiteLabel}>Cerrar sesión</Text>
                <Image style={styles.rightWhiteArrow} resizeMethod='resize' resizeMode='contain' source={require('src/img/rightWhiteArrow.png')} />
            </Pressable>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    card: {
        backgroundColor: '#E6E6E8',
        borderRadius: 20,
        width: wp(90),
        marginHorizontal: wp(5),
        paddingHorizontal: wp(5),
        marginVertical: hp(2),
        paddingTop: hp(2),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    profileImg: {
        height: hp(6.2),
        width: wp(13.3),
        marginRight: wp(4),
    },
    locationIco: {
        height: hp(1.4),
        width: wp(2.6),
        marginRight: wp(0.5),
    },
    rightArrow: {
        position: 'absolute',
        height: hp(1.4),
        width: wp(2.6),
        right: wp(1),
    },
    boldLabel: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#000',
        fontSize: RFValue(16),
    },
    label: {
        fontFamily: 'Helvetica-Light',
        fontWeight: '100',
        fontSize: RFValue(12),
    },
    text: {
        fontFamily: 'Helvetica-Light',
        fontWeight: '600',
        fontSize: RFValue(14),
        color: '#181818',
        marginBottom: hp(2),
    },
    middleSection: {
        marginHorizontal: wp(5),
        marginVertical: hp(2.5)
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: '600',
        color: '#000',
        fontSize: RFValue(20),
    },
    btn: {
        backgroundColor: '#0093b2',
        width: wp(90),
        height: hp(7),
        marginVertical: hp(1.5),
        marginHorizontal: wp(5),
        paddingHorizontal: wp(3),
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    whiteLabel: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: RFValue(16),
    },
    rightWhiteArrow: {
        height: hp(1.4),
        width: wp(2.6),
        right: wp(1),
    },
});

export default Profile;