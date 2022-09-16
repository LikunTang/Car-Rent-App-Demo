import { FlatList, TouchableOpacity, Image, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from '@rneui/base';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';




const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "/Users/dorren/car-rent-uberclone/assets/rentCar-5.png",
        screen: "MapScreen",
    },

    {
        id: "456",
        title: "Oder Food",
        image: "/Users/dorren/car-rent-uberclone/assets/food order-2.png",
        screen: "EatsScreen",
    }

]

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);
    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-blue-100 m-2 w-40`}
                    disabled={!origin}
                >

                    <View style={tw`${!origin && "opacity-20"}`}>
                        <Image
                            style={{ width: 120, height: 120, resizeMode: "contain" }}
                            source={{ uri: item.image }} />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name='arrowright'
                            color='white'
                            type='antdesign' />
                    </View>
                </TouchableOpacity>
            )}
        />

    )
}

export default NavOptions

