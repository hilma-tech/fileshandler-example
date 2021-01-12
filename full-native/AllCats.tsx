import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View,ScrollView } from 'react-native';
import { winHeight, winWidth } from './styles';

const AllCats: React.FC = () => {
    const myCats: { name: string, imgSrc: string }[] = [
        {
            name: "pitzki",
            imgSrc: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"
        },
        {
            name: "dana",
            imgSrc: "https://www.loveyourdog.com/wp-content/uploads/2019/04/Toy-Poodle.jpg"
        },
        {
            name: "mooki",
            imgSrc: "https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg"
        },
        {
            name: "mooki",
            imgSrc: "https://icatcare.org/app/uploads/2018/06/Layer-1704-1920x840.jpg"
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                all my cats
            </Text>

            <ScrollView  contentContainerStyle={styles.catsContainer}>
                {
                    myCats.map((cat, index) => (
                        <View key={index} style={styles.catContainer}>
                            <Image source={{ uri: cat.imgSrc }} style={styles.image} />
                            <Text>
                                {cat.name}
                            </Text>
                        </View>
                    ))
                }
            </ScrollView>
            <Button title="new cat" onPress={() =>null} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: winWidth,
        height: winHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-around",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        paddingBottom: 40
        // justifyContent: "space-around"
    },
    title: {
        fontSize: 30,
    },
    image: {
        // width: 50,
        // width: "auto",
        height: 200
    },
    catsContainer: {
        alignItems: "center",
    },
    catContainer: {
        width: winWidth * 3 / 4
    }
});

export default AllCats;