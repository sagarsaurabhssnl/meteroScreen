import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function HomeScreen({ navigation }) {

    return (
        <ImageBackground
            source={require("../assets/bg_image.png")}
            style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate("ISS LOCATION") }} style={styles.button}>
                <Image source={require("../assets/iss_icon.png")} style={{ width: 100, height: 100, transform: [{ translateY: -30 }, { translateX: 70 }] }} />
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 25 }}>ISS LOCATION</Text>
                <Text style={{ color: "#a00", alignSelf: "flex-start", marginLeft: 20, marginBottom: 30 }}>Know More...</Text>
                <Text style={{ color: "#333", fontSize: 120, alignSelf: "flex-end", transform: [{ translateX: -30 }, { translateY: 20 }], position: "absolute" }}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("METEORS") }} style={styles.button}>
                <Image source={require("../assets/meteor_icon.png")} style={{ width: 100, height: 100, transform: [{ translateY: -30 }, { translateX: 70 }] }} />
                <Text style={{ alignSelf: "flex-start", marginLeft: 20, fontSize: 25 }}>METEORS</Text>
                <Text style={{ color: "#a00", alignSelf: "flex-start", marginLeft: 20, marginBottom: 30 }}>Know More...</Text>
                <Text style={{ color: "#333", fontSize: 120, alignSelf: "flex-end", transform: [{ translateX: -30 }, { translateY: 20 }], position: "absolute" }}>2</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, button: {
        width: "80%",
        height: 150,
        backgroundColor: "#aaa",
        borderRadius: 20,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    }
}