// app/Home.tsx

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
  const navigation = useNavigation();
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const [city, setCity] = useState("Seoul");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoginNavigation = () => {
    router.push("./login");
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);
  const fetchWeather = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const url = `http://api.weatherapi.com/v1/current.json?key=3c4ac0bcec1a433c9fa73328242810&q=${currentLocation.coords.latitude},${currentLocation.coords.longitude}`; // Use API_KEY from .env

    try {
      const response = await axios.get(url);
      setCity(response.data.location.name);
      setWeather(response.data.current);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        resizeMode="contain"
        source={require("../assets/images/splash.png")}
        style={styles.logo}
      />

      {/* Weather Info Container */}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherDate}>{formattedDate}</Text>
        <Text style={styles.weatherCity}>{city}</Text>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherTemperature}>{weather?.temp_c}°</Text>
            <Text>{weather?.condition.text}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleLoginNavigation}
              activeOpacity={0.7}
            >
              <Image
                source={require("../assets/images/splash.png")} // Replace with your image URL
                style={{ width: 200, height: 200 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Hourly Weather Info Container */}
      <View style={styles.weatherContainer}>
        <Text style={styles.hourlyInfo}>3 PM: 27°C</Text>
        <Text style={styles.hourlyInfo}>4 PM: 26°C</Text>
        <Text style={styles.hourlyInfo}>5 PM: 25°C</Text>
      </View>

      {/* Button */}
      <Text style={styles.button}>Report Unusual Weather </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
    fontFamily: "Manrope",
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
  },
  weatherContainer: {
    width: "90%",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    elevation: 5,
    alignItems: "center",
  },
  weatherDate: {
    fontSize: 20,
  },
  weatherCity: {
    fontSize: 32,
    fontWeight: "regular",
  },
  weatherDetails: {
    flex: 1,
    flexDirection: "row",
  },
  weatherInfo: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
  },
  weatherTemperature: {
    fontSize: 60,
    fontWeight: "regular",
  },

  iconContainer: {
    marginTop: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },

  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#382215",
    color: "#F6F1F0",
    fontSize: 16,
    borderRadius: 50,
    textAlign: "center",
  },
});

export default Home;
