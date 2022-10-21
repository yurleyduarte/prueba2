import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const Button = (props) => {
    const { text = '', textColor = '#fff', btnColor = '#0093b2', onPress = false, width = false, fontSize = false, loading = false } = props;

    width && (styles.btn.width = wp(width));
    fontSize && (styles.text.fontSize = RFValue(fontSize));

    return (
        <TouchableOpacity style={[styles.btn, { backgroundColor: btnColor }]} onPress={() => onPress && onPress()} disabled={loading}>
            {!loading && <Text style={[styles.text, { color: textColor }]}>{text}</Text>}
            {loading && <ActivityIndicator size={'small'} color={textColor} />}
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 'auto',
        height: hp(6),
        marginVertical: hp(1.5),
        marginHorizontal: wp(5),
        borderRadius: 15,
        justifyContent: 'center'
    },
    text: {
        fontSize: RFValue(20),
        textAlign: 'center'
    }
});

export default Button;