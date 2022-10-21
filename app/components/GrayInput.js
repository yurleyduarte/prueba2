import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GrayInput = (props) => {
    const { label = '', keyboardType = 'default', secureTextEntry = false, onChangeText = false, value = '' } = props;
    return (
        <TextInput
            style={styles.input}
            placeholder={label}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            defaultValue={value}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: hp(1.5),
        marginHorizontal: wp(5),
        backgroundColor: '#EEEEEE',
        borderRadius: 15,
        padding: 15,
    },
});

export default GrayInput;