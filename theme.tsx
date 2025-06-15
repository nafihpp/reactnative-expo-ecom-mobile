import { createTheme } from "@rneui/themed"

export const theme = createTheme({
  lightColors: {
    primary: "#E91E63",
    secondary: "#9C27B0",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    text: "#000000",
    background: "#F5F5F5",
    surface: "#FFFFFF",
  },
  darkColors: {
    primary: "#F48FB1",
    secondary: "#CE93D8",
    success: "#81C784",
    warning: "#FFB74D",
    error: "#EF5350",
    text: "#FFFFFF",
    background: "#121212",
    surface: "#1E1E1E",
  },
  components: {
    Button: {
      raised: true,
      titleStyle: {
        fontWeight: "bold",
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderBottomWidth: 0,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingHorizontal: 15,
        height: 50,
      },
    },
  },
})
