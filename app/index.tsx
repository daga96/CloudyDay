import ConfirmButton from "@/components/ConfirmButton";
import Logo from "@/components/Logo";
import GlobalStyles from "@/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import * as MailComposer from "expo-mail-composer";
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

interface WeatherIcons {
  [key: string]: any;
}

interface WeatherData {
  temp_c: number;
  condition: {
    text: string;
  };
}

interface HourlyForecast {
  time: string;
  temp_c: number;
}

const Home: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<HourlyForecast[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>("");

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const endHour = currentHour + 12;

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

  const getCurrentLocation = async (): Promise<
    Location.LocationObject["coords"]
  > => {
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

  const getHourFromDate = (date: Date): string => {
    const hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    return `${formattedHour} ${period}`;
  };

  const fetchWeatherAndForecast = async (): Promise<void> => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiUrl}&q=${latitude},${longitude}`;

      const response = await axios.get(url);
      setCity(response.data.location.name);
      setWeather(response.data.current);
      setForecast(response.data.forecast.forecastday[0].hour);
      getCurrentTime();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredForecast = forecast?.filter((hour) => {
    const forecastHour = new Date(hour.time).getHours();
    return forecastHour >= currentHour && forecastHour < endHour;
  });

  const reportIncident = async (): Promise<void> => {
    const savedEmail = await AsyncStorage.getItem("email");

    if (savedEmail) {
      const location = await Location.getCurrentPositionAsync();
      const message =
        "Incident occurred in " +
        city +
        " at " +
        location.coords.latitude +
        ", " +
        location.coords.longitude;
      await MailComposer.composeAsync({
        recipients: [savedEmail],
        subject: "Unusual Weather Report",
        body: message,
      });
    } else {
      router.push("./report");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Logo />

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

      <ConfirmButton
        text="Report Unusual Weather"
        onPress={() => {
          reportIncident();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    width: Dimensions.get("window").width * 0.9,
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
    fontSize: 18,
  },
  notAvailableContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: 24,
  },
  notAvailableText: {
    fontSize: 24,
    fontWeight: "regular",
    fontFamily: "Manrope_400Regular",
    color: "#382215",
    marginBottom: 16,
  },
  locationIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
});

export default Home;
