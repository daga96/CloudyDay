import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F6F1F0",
  },

  subtitle: {
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 16,
    color: "#382215",
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    marginVertical: 8,
  },

  errorText: {
    fontFamily: "Manrope_400Regular",
    color: "#E13535",
    marginVertical: 4,
    backgroundColor: "#F3BEBE",
    padding: 8,
    width: "100%",
    textAlign: "center",
  },
});

export default GlobalStyles;
