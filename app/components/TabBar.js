import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Pressable, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const TabBar = (props) => {
    const { data = [], tabItemSelected = 0, setTabItemSelected = false, design = 'rounded' } = props;

    const styles = designs[design];

    const Item = ({ item }) => (
        <Pressable style={tabItemSelected.id == item.id ? styles.tabItemSelected : styles.tabItem} onPress={() => setTabItemSelected(item)}>
            <Text style={tabItemSelected.id == item.id ? styles.tabLabelSelected : styles.tabLabel}>{item.name ?? ''}</Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.tabBar}>
            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Item item={item} />}
            />
        </SafeAreaView>
    );
}

const underlinedStyle = StyleSheet.create({
    tabBar: {
        marginTop: hp(2),
        marginHorizontal: wp(2),
    },
    tabItem: {
        height: hp(2.8),
        marginHorizontal: wp(2),
        justifyContent: 'center',
    },
    tabItemSelected: {
        height: hp(2.8),
        marginHorizontal: wp(2),
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderColor: '#0093b2',
    },
    tabLabel: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
    },
    tabLabelSelected: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
    },
});

const roundedStyle = StyleSheet.create({
    tabBar: {
        marginTop: hp(2),
        marginHorizontal: wp(2),
    },
    tabItem: {
        height: hp(2.8),
        marginHorizontal: wp(2),
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: wp(3),
        backgroundColor: '#cbf6ff',
    },
    tabItemSelected: {
        height: hp(2.8),
        marginHorizontal: wp(2),
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: wp(3),
        backgroundColor: '#0093b2',
    },
    tabLabel: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#0093B2'
    },
    tabLabelSelected: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

const designs = { 'underlined': underlinedStyle, 'rounded': roundedStyle };

export default TabBar;