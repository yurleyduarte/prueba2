import React from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const MainHeader = (props) => {
    const { cart = true, label = '', boldLabel = '', fontSize = false } = props;

    const navigation = useNavigation();

    return (
        <>
            <StatusBar backgroundColor={'#FBFBFB'} />
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.label, (fontSize ? { fontSize: RFValue(fontSize) } : {})]} >{label}</Text><Text style={[styles.boldLabel, (fontSize ? { fontSize: RFValue(fontSize) } : {})]}>{boldLabel}</Text>
                </View>
                <View style={styles.btnContainer}>
                    {/* <TouchableOpacity style={styles.btn}>
                        <Image source={require('src/img/star.png')} resizeMethod='resize' resizeMode='contain' style={styles.img} />
                    </TouchableOpacity> */}
                    {cart &&
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.btn}>
                            <Image source={require('src/img/cart.png')} resizeMethod='resize' resizeMode='contain' style={styles.img} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FBFBFB',
        height: hp(7),
        marginHorizontal: wp(2),
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    label: {
        fontFamily: 'Helvetica-Light',
        fontSize: RFValue(16),
        color: '#181818',
    },
    boldLabel: {
        fontFamily: 'Helvetica-Bold',
        fontSize: RFValue(16),
        fontWeight: 'bold',
        color: '#181818',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: wp(35),
        padding: 2,
        right: wp(3),
    },
    btn: {
        backgroundColor: '#cbf6ff',
        borderRadius: 15,
        width: wp(11),
        height: hp(5.5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: wp(5),
        height: hp(5),
    },
});

export default MainHeader;