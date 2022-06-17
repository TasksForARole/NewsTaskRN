import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, {useContext} from "react";
import styles from "./styles";
// import {} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {strings} from "@Localization/";
import {useTheme} from "@ThemeContext";
export default function HomeView(
  {navigation}: RootTabScreenProps<"Home">,
  props: any
) {
  const {theme} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <TouchableOpacity
        onPress={() => {
          console.log("sdsd");
        }}
      >
        {/* <Text>{theme}</Text> */}
      </TouchableOpacity>
      <Text style={[styles.title, {color: theme.tabIconSelected}]}>
        {strings("Settings")}
      </Text>
      <Text style={[styles.title, {color: theme.tabIconSelected}]}>
        {strings("Settings")}
      </Text>
    </View>
  );
}
