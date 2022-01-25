import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        Asset.loadAsync([
          require("../../assets/images/cloudy.jpeg"),
          require("../../assets/images/sunnyday.jpeg"),
          require("../../assets/images/rainy.jpeg"),
          require("../../assets/images/clear.jpeg"),
          require("../../assets/images/clock.png"),
          require("../../assets/images/leftarrow.png"),
          require("../../assets/images/rainyinfo.jpeg"),
          require("../../assets/images/snow.jpeg"),
          require("../../assets/images/starout.png"),
          require("../../assets/images/sunny.jpeg"),
          require("../../assets/images/back.png"),
        ]);
        // Load fonts
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        setTimeout(() => SplashScreen.hideAsync(), 0);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
