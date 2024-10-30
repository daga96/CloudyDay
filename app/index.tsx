// app/Home.tsx

import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
  const currentDate = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const [city, setCity] = useState("Seoul");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lastClickTime && Date.now() - lastClickTime > 1000) {
        setClickCount(0);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [lastClickTime]);
  const weatherIcons = {
    sunny: require("../assets/images/weather/sunny.png"),
    cloudy: require("../assets/images/weather/cloudy.png"),
    rainy: require("../assets/images/weather/rainy.png"),
    snowy: require("../assets/images/weather/snowy.png"),
    "partialy cloudy": require("../assets/images/weather/partialycloudy.png"),
  };

  const handleLoginNavigation = () => {
    router.push("./login");
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);
  const fetchWeather = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiUrl}&q=${currentLocation.coords.latitude},${currentLocation.coords.longitude}`; // Use API_KEY from .env

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
      <Logo />

      {/* Weather Info Container */}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherDate}>{formattedDate}</Text>
        <Text style={styles.weatherCity}>{city}</Text>
        <View style={styles.weatherDetails}>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherTemperature}>{weather?.temp_c}°</Text>
            <Text style={styles.weatherDescription}>
              {weather?.condition.text}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                const now = Date.now();
                setLastClickTime(now);

                if (clickCount === 2) {
                  handleLoginNavigation();
                  setClickCount(0);
                } else {
                  setClickCount(clickCount + 1);
                }
              }}
              activeOpacity={0.7}
            >
              <Image
                source={weatherIcons[weather?.condition.text.toLowerCase()]}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Button */}
      <ConfirmButton text="Report Unusual Weather" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
  },

  weatherContainer: {
    width: "90%",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    elevation: 5,
    alignItems: "center",
  },
  weatherDate: {
    fontSize: 20,
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
  weatherCity: {
    fontSize: 32,
    fontWeight: "regular",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
  weatherDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    marginVertical: 16,
  },
  weatherInfo: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    marginRight: 32,
  },
  weatherTemperature: {
    fontSize: 60,
    fontWeight: "regular",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
  weatherDescription: {
    fontSize: 20,
    fontWeight: "regular",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
  iconContainer: {
    marginTop: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default Home;
