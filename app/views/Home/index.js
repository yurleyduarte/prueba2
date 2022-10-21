import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, FlatList, Image, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

//components
import HighCard from '../../components/HighCard';
import MainHeader from '../../components/MainHeader';
import RoundedCard from '../../components/RoundedCard';
import SearchBar from '../../components/SearchBar';
import Slider from '../../components/Slider';
import TabBar from '../../components/TabBar';

//services
import requestMainBanner from '../../services/Slider/requestMainBanner';
import requestSecondaryBanner from '../../services/Slider/requestSecondaryBanner';
import requestGetCategories from '../../services/requestGetCategories';
import requestGetSubCategories from '../../services/requestGetSubCategories';

//context
import AuthContext from '../../context/Auth/AuthContext';
import requestGetProducts from '../../services/requestGetProducts';

const Home = () => {
    const navigation = useNavigation();

    const { user } = useContext(AuthContext);
    const tabElements = [{ id: 0, name: 'Categorías' }, { id: 1, name: 'Promociones' },];

    const [tabItemSelected, setTabItemSelected] = useState(tabElements[0]);
    const [mainBanner, setMainBanner] = useState([]);
    const [secondaryBanner, setSecondaryBanner] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getMainBanner = async () => {
            let response = await requestMainBanner();
            if (response.code != 200) { return; };
            setMainBanner(response.data ?? []);
        }
        const getSecondaryBanner = async () => {
            let response = await requestSecondaryBanner();
            if (response.code != 200) { return; };
            setSecondaryBanner(response.data ?? []);
        }
        const getCategories = async () => {
            let response = await requestGetCategories();
            if (response.code != 200) { return; };
            setCategories(response.data ?? []);
        }
        getMainBanner();
        getSecondaryBanner();
        getCategories();
    }, []);

    useEffect(() => {
        if (!category) { return; }
        const getSubCategories = async () => {
            let response = await requestGetSubCategories(category.id);
            if (response.code != 200) { return; };
            setSubCategories(response.data ?? []);
        }
        getSubCategories();
    }, [category]);

    useEffect(() => {
        const getProducts = async () => {
            let data = [{ key: 'page', value: 1 }, { key: 'pagination', value: 5 }];
            category && data.push({ key: 'category_id', value: category.id });
            tabItemSelected == 1 && data.push({ key: 'with_discount', value: true });
            let response = await requestGetProducts(data);
            if (response.code != 200) { return; };
            setProducts(response.data ?? []);
        }

        getProducts();
    }, [category, tabItemSelected]);

    return (
        <SafeAreaView style={styles.body}>

            <MainHeader label={'Hola, '} boldLabel={user?.name ?? ''} />

            <SearchBar />

            <ScrollView>
                <TabBar data={categories} tabItemSelected={category} setTabItemSelected={setCategory} design={'underlined'} />

                <SafeAreaView style={styles.banner}>
                    <Slider
                        data={mainBanner}
                        renderItem={({ item }) => <Image style={styles.bannerImg} resizeMethod='resize' resizeMode='stretch' source={{ uri: `https://admin.ekomoda.co/storage/${item.url}` }} />}
                    />
                </SafeAreaView>

                <TabBar data={tabElements} tabItemSelected={tabItemSelected} setTabItemSelected={setTabItemSelected} />

                {tabItemSelected.id == 0 &&
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            numColumns={4}
                            data={subCategories}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => <RoundedCard item={item} onPress={() => navigation.navigate('Category', { category_id: category.id })} />}
                        />
                    </SafeAreaView>
                }

                {tabItemSelected.id == 0 && <Text style={styles.label}>Productos</Text>}

                <SafeAreaView style={styles.container}>
                    <FlatList
                        horizontal
                        data={products}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => <HighCard item={item} />}
                    />
                </SafeAreaView>

                <Slider
                    data={secondaryBanner}
                    renderItem={({ item }) => <Image style={styles.bannerImg} resizeMethod='resize' resizeMode='stretch' source={{ uri: `https://admin.ekomoda.co/storage/${item.url}` }} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.54,
        borderColor: '#707070',
        marginTop: hp(2),

    },
    bannerImg: {
        height: hp(18),
        width: wp(86),
        marginHorizontal: wp(7),
        marginVertical: hp(3),
        borderRadius: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FBFBFB',
        marginTop: hp(2),
        marginHorizontal: wp(2),
    },
    label: {
        marginTop: hp(1),
        marginHorizontal: wp(3.5),
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold',
        color: '#0093b2',
    },
});


export default Home;