import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as ReduxProvider } from "react-redux";
import { routeNames } from "./config";
import ImageBrowser from "./src/components/Shared/ImageBrowser";
import { store } from "./src/redux/store";
import CreateNews from "./src/screens/CreateOrEditNews";
import Home from "./src/screens/Home";
import NewsItem from "./src/screens/NewsItem";

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    // headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={screenOptions}
          initialRouteName={routeNames.home}
        >
          <Stack.Screen
            name={routeNames.home}
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={routeNames.newsItem}
            component={NewsItem}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={routeNames.createOrEditNews}
            component={CreateNews}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={routeNames.imageBrowser}
            options={{
              title: "Selected 0 files",
            }}
            component={ImageBrowser}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
