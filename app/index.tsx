// app/Home.tsx

import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Home = () => {
  const [city, setCity] = useState<string>("Seoul");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const [lastClickTime, setLastClickTime] = useState<Date | null>(null);
  const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const weatherIcons = {
    sunny: require("../assets/images/weather/sunny.png"),
    cloudy: require("../assets/images/weather/cloudy.png"),
    rainy: require("../assets/images/weather/rainy.png"),
    snowy: require("../assets/images/weather/snowy.png"),
    "partialy cloudy": require("../assets/images/weather/partialycloudy.png"),
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (lastClickTime && Date.now() - lastClickTime > 1000) {
        setClickCount(0);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [lastClickTime]);

  useEffect(() => {
    fetchWeatherAndForecast();
  }, [city]);

  const handleLoginNavigation = () => {
    router.push("./login");
  };

  const getCurrentLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation.coords;
  };

  const getHourFromDate = (date: Date) => {
    const hours = new Date(date).getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // convert to 12-hour format
    return `${formattedHour} ${period}`;
  };
  const fetchWeatherAndForecast = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiUrl}&q=${latitude},${longitude}`;

    try {
      const response = await axios.get(url);
      setCity(response.data.location.name);
      setWeather(response.data.current);
      setForecast(response.data.forecast.forecastday[0].hour);
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

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.weatherHourly}
      >
        {forecast?.map((hour, index) => (
          <View key={index} style={styles.hour}>
            <Text>{getHourFromDate(hour.time)}</Text>
            <Text>{hour.temp_c}°</Text>
            <Text>{hour.condition.text}</Text>
          </View>
        ))}
      </ScrollView>
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
    padding: 10,
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    elevation: 5,
    alignItems: "center",
    marginVertical: 16,
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
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    marginVertical: 16,
    width: "80%",
  },
  weatherInfo: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    marginRight: 16,
  },
  weatherTemperature: {
    fontSize: 56,
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

  weatherHourly: {
    width: Dimensions.get("window").width * 0.9,
    height: 100,
    overflow: "scroll",
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    marginHorizontal: 24,
    padding: 10,
  },

  hour: {
    marginRight: 16,
    marginBottom: 8,
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
});

export default Home;
