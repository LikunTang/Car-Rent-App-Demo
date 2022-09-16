import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { selectTravelTimeInformation } from '../slices/navSlice'
import { useSelector } from 'react-redux'


const data = [
    {
        id: "CarChoose1",
        title: "Plus",
        multiplier: 1,
        image: "/Users/dorren/car-rent-uberclone/assets/CarChoose1.png"
    },
    {
        id: "CarChoose2",
        title: "Premium",
        multiplier: 2,
        image: "/Users/dorren/car-rent-uberclone/assets/CarChoose2.png"
    },
    {
        id: "CarChoose13",
        title: "Luxury",
        multiplier: 3,
        image: "/Users/dorren/car-rent-uberclone/assets/CarChoose4.png"
    }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionCard = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const TravelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>
                    Select a Ride -
                    {TravelTimeInformation?.distance.text}</Text>
            </View>

            <FlatList data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-blue-200"
                            }`}>
                        <Image style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain"
                        }}
                            source={{ uri: image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-center text-xl font-semibold`}>{title}</Text>
                            <Text>{TravelTimeInformation?.duration.text} travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'GBP'
                            }).format(
                                (TravelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-blue-400 py-3 m-3 ${!selected && "bg-gray-300"}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RideOptionCard

const styles = StyleSheet.create({})