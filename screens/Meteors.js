import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground, ActivityIndicator, StatusBar, SafeAreaView, FlatList, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import axios from "axios";

export default function MeteorScreen({ }) {
    const [meteorsData, setmeteorsData] = useState({});
    const [meteors, setmeteors] = useState({})



    useEffect(() => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=i6u5RxDaCotlsbCmEHxza747e2mid4q1QwrwHpBs").then((response) => { setmeteorsData(response.data.near_earth_objects); console.log(response) }).catch((error) => { Alert.alert(error.message) })
    }, []);

    getmeteros = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=i6u5RxDaCotlsbCmEHxza747e2mid4q1QwrwHpBs").then((response) => { setmeteors(response.data.near_earth_objects) }).catch(error => { Alert.alert(error.message) });
    }

    renderItem = ({ item }) => {
        let meteor = item;
        let bg_image, speed, size;

        if (meteors.threatscore <= 30) {
            bg_image = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 100;
        } else if (meteors.threatscore <= 75) {
            bg_image = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 150;
        } else {
            bg_image = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 200;
        }

        return (
            <View>
                <ImageBackground source={bg_image} style={styles.backgroundImage}>
                    <View style={styles.gifcontainer}>
                        <Image source={speed} style={{ width: size, height: size, alignSelf: "center" }} />
                        <View>
                            <Text style={[styles.cardTitle, { marginTop: 250, marginLeft: 50 }]}>
                                {item.name}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
                                Closes to earth: {item.close_approach_data[0].close_approach_date_full}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Minimum Diameter(km):{item.estimated_diameter.kilometers.estimated_diameter_min}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Maximum Diameter(km):{item.estimated_diameter.kilometers.estimated_diameter_max}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Velocity (km/h):{item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                            </Text>
                            <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                                Missing Earth by (km):{item.close_approach_data[0].miss_distance.kilometers}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    keyExtractor = (item, index) => {
        return (index.toString());
    }

    useEffect(() => {
        // console.log(meteorsData[0]);

    }, [meteorsData]);



    if (Object.keys(meteorsData).length !== 0) {
        var data = Object.keys(meteorsData).map((date) => { return (meteorsData[date]) });
        let meteor = [].concat.apply([], data);

        meteor.forEach(function (meteor) {
            let diameter = (meteor.estimated_diameter.kilometers.estimated_diameter_min + meteor.estimated_diameter.kilometers.estimated_diameter_min) / 2;
            let threatscore = (diameter / meteor.close_approach_data[0].miss_distance.kilometers) * 100000000000000000000000000;
            console.log(threatscore);
        });
        meteor.sort(function (a, b) {
            return (b.threatscore - a.threatscore);
        });
        meteor = meteor.slice(0, 5);

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidsafearea} />
                <FlatList
                    keyExtractor={keyExtractor}
                    data={meteor}
                    renderItem={renderItem}
                    horizontal={true}
                />
            </View >
        )
    } else {
        return (
            <View>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    droidsafearea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }, backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }, gifcontainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }, cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#fff",
    }, cardText: {
        color: "#fff",

    }
})
