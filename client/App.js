import { extendTheme, NativeBaseProvider } from 'native-base';
import React from 'react';
import { useFonts, Roboto_400Regular,Roboto_400Regular_Italic } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import Container from './Container';
export default function App() {

  //fonts
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
  });
    // Setup Font
    const fontConfig = {
      Roboto: {
        400: {
          normal: "Roboto_400Regular",
          italic: "Roboto_400Regular_Italic",
        },
      },
    };

   // Setup Theme
  const customeColor = {
    primary: {
      50: "#5A0120",
      100: "##5A0120",
      200: "#F8B198",
      300: "#D7493B",
      400: "#A20512",
      500: "#A20512",
      600: "#A20512",
      700: "#88031A",
      800: "#6D021E",
      900: "#5A0120",
    },
    amber: {
      400: "#bd0707",
    },
  };
 
  //Configuration Native Base Custom Theme
  const theme = extendTheme({
    colors: customeColor,
    fontConfig,
    fonts: {
      heading: "Roboto",
      body: "Roboto",
      mono: "Roboto",
    },
    config: { initialColorMode: "dark" },
  }); 

  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <NativeBaseProvider theme={theme}>
    <Container />
    </NativeBaseProvider>
  );
  }
}
