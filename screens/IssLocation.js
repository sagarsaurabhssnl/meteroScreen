import React, { useState, useEffect } from 'react';
import { Text, View, Image, ImageBackground, ActivityIndicator, StatusBar, SafeAreaView, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";

export default function IssLocationScreen() {
    const [location, setlocation] = useState({});

    function getLocation() {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544").then((response) => { setlocation(response.data) }).catch((error) => { Alert.alert(error.message) });
    }

    useEffect(() => {
        console.log(location);
    }, [location])

    useEffect(() => {
        setInterval(() => { getLocation() }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.main}>
            <ImageBackground
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                source={require("../assets/iss_bg.jpg")}>
                <View>
                    {location.latitude ? (
                        <MapView
                            region={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 100,
                                longitudeDelta: 100,
                            }}
                            style={styles.map}>
                            {console.log(Object.keys(location))}
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }}
                                image={require("../assets/icon.png")}>
                            </Marker>
                        </MapView>
                    ) : (
                        <ActivityIndicator size="large" color="#00ff00" />
                    )}

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%"
    }, map: {
        width: 200,
        height: 200
    }
})