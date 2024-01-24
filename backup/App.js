import React, { useCallback } from "react";

import Main from "./components/Main";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/ProximaNovaExtrabold.ttf"),
    "Roboto-Medium": require("./assets/fonts/ProximaNovaExtrabold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
