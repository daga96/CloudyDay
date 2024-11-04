import GlobalStyles from "@/styles/globalStyles";

import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import { useSession } from "@/contexts/AuthContext";
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

interface WeatherData {
  location: { name: string };
  current: { temp_c: number; condition: { text: string } };
  forecast: { forecastday: { hour: any[] } };
}

interface WeatherIcons {
  [key: string]: any;
}

const Home = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const { signOut } = useSession();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const endHour = currentHour + 8;

  const apiUrl = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  const weatherIcons: WeatherIcons = {
    sunny: require("../assets/images/weather/sunny.png"),
    cloudy: require("../assets/images/weather/cloudy.png"),
    rainy: require("../assets/images/weather/rainy.png"),
    snowy: require("../assets/images/weather/snowy.png"),
    partlycloudy: require("../assets/images/weather/partlycloudy.png"),
  };

  useEffect(() => {
    fetchWeatherAndForecast();
  }, [city]);

  const handleLoginNavigation = () => {
    router.push("./login");
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    return coords;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);
    setFormattedDate(formattedDate);
  };

  const getHourFromDate = (date: Date) => {
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
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
      getCurrentTime();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredForecast = forecast?.filter((hour) => {
    const forecastHour = new Date(hour.time).getHours();
    return forecastHour >= currentHour && forecastHour < endHour;
  });

  return (
    <View style={GlobalStyles.container}>
      <Logo />
      <Text onPress={() => signOut()}> Logout</Text>

      {city ? (
        <View style={GlobalStyles.container}>
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherDate}>{formattedDate}</Text>
            <Text style={styles.weatherCity}>{city}</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherInfo}>
                <Text style={styles.weatherTemperature}>
                  {weather?.temp_c}°
                </Text>
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
                    source={
                      weatherIcons[
                        weather?.condition.text.toLowerCase().replace(/\s/g, "")
                      ]
                    }
                    style={styles.weatherIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={GlobalStyles.subtitle}> Hourly Forecast </Text>
          <ScrollView contentContainerStyle={styles.forecastContainer}>
            {filteredForecast?.map((hour) => (
              <View style={styles.forecastInfo} key={hour.time}>
                <Text style={styles.forecastHour}>
                  {getHourFromDate(new Date(hour.time))}
                </Text>
                <Text style={styles.forecastTemperature}>{hour.temp_c}°</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.notAvailableContainer}>
          <Text style={styles.notAvailableText}> Location not available </Text>
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
              style={styles.locationIcon}
              source={require("../assets/images/location.png")}
            />
          </TouchableOpacity>
        </View>
      )}

      <ConfirmButton text="Report Unusual Weather" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    width: "90%",
    padding: 8,
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
    fontSize: 16,
    fontWeight: "regular",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
  },
  iconContainer: {
    marginTop: 10,
  },

  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  forecastContainer: {
    width: Dimensions.get("window").width * 0.9,
    overflow: "scroll",
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    marginHorizontal: 24,
    padding: 16,
    flexDirection: "row",
  },

  forecastInfo: {
    marginRight: 16,
    marginBottom: 8,
  },

  forecastHour: {
    fontFamily: "Manrope_700Bold",
    color: "#382215",
    fontSize: 16,
  },

  forecastTemperature: {
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    fontSize: 16,
  },

  notAvailableContainer: {
    width: "90%",
    height: 200,
    backgroundColor: "#ECD8C5",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  notAvailableText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#382215",
  },

  locationIcon: {
    width: 100,
    height: 100,
  },
});

export default Home;
