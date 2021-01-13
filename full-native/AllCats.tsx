import { useLogout } from '@hilma/auth-native';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Axios from 'axios';

import { winHeight, winWidth } from './styles';
import UploadedImage from './UploadedImage';
import { useNavigation } from '@react-navigation/native';

const AllCats: React.FC = () => {
    const logout = useLogout();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await logout();
    }

    const [cats, setCats] = useState<{
        id: number,
        imagePath: string,
        name: string
    }[]>([]);


    useEffect(() => {
        (async () => {
            const res = await Axios.get("/cat/all-cats");
            setCats(res.data);
        })();
    }, []);

    const handleNewCat = () => {
        navigation.navigate("new-cat");
    }

    const handleEdit = (catId: number) => {
        navigation.navigate("update-cat", { catId });
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Text>
                    logout
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>
                all my cats
            </Text>

            <ScrollView contentContainerStyle={styles.catsContainer}>
                {
                    cats.map((cat, index) => (
                        <View key={index} style={styles.catContainer}>
                            <TouchableOpacity onPress={e => handleEdit(cat.id)}>
                                <UploadedImage source={{ uri: cat.imagePath }} style={styles.image} />
                                <Text>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
            <Button title="new cat" onPress={handleNewCat} />
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