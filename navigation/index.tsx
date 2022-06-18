import {FontAwesome, Feather} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {useTheme} from "@ThemeContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from "react";
import {ColorSchemeName, Pressable} from "react-native";
import {DetailedScreen} from "../screens/Detailed/index";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import {HomeScreen} from "../screens/Home/index";
import {SearchScreen} from "../screens/SearchScreen/index";
import {SettingsScreen} from "../screens/Settings/index";
import {strings} from "@Localization";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detailed"
        component={DetailedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Group screenOptions={{presentation: "modal"}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const {theme} = useTheme();
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          height: 60,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 25,
          shadowColor: "white",
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}: RootTabScreenProps<"Home">) => ({
          tabBarActiveTintColor: theme.tabIconSelected,
          title: strings("Home"),
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name="home" color={theme.tabIconDefault} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarActiveTintColor: theme.tabIconSelected,

          title: strings("Settings"),
          tabBarIcon: ({color}) => (
            <TabBarIcon name="settings" color={theme.tabIconDefault} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  const {theme} = useTheme();
  return (
    <Feather
      size={30}
      style={{marginBottom: -3, color: theme.tabBarIcon}}
      {...props}
    />
  );
}
