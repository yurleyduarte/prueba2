import React from 'react';
import { StyleSheet, StatusBar, View, Text, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const ProfileHeader = (props) => {
    const { subtitle = '' } = props;

    const navigation = useNavigation();

    return (
        <>
            <StatusBar backgroundColor={'#FBFBFB'} />
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backIconContainer}>
                    <Image style={styles.backIcon} resizeMethod='resize'  source={require('src/img/back.png')} />
                </Pressable>
                <View>
                    <Text style={styles.title}>Cuenta</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFBFB',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        width: wp(90),
        height: hp(7),
        marginVertical: hp(1),
        marginHorizontal: wp(5),
    },
    backIconContainer: {
        height: hp(6),
        width: wp(12.5),
        marginRight: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        height: hp(5.54),
        width: wp(12),
        borderRadius: 10,
    },
    title: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: '600',
        color: '#000',
        fontSize: RFValue(18),
    },
    subtitle: {
        fontFamily: 'Helvetica-Light',
        fontSize: RFValue(14),
    },
});

export default ProfileHeader;