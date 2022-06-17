import {TouchableOpacity, Text, View} from "react-native";

import styles from "./styles";
// import {Text, View} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {changeLanguage, strings} from "@Localization/";
import React, {useContext} from "react";
import {useTheme} from "@ThemeContext";
export default function SettingsView(
  {navigation}: RootTabScreenProps<"Settings">,
  props: any
) {
  const onLanguageChanged = async (language: "en" | "ar") => {
    changeLanguage(language);
  };
  const {theme, updateTheme} = useTheme();

  const changeTheme = () => {
    updateTheme(theme.ThemeMode);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        onPress={() => onLanguageChanged("en")}
        style={styles.LangEnButton}
      >
        <Text style={styles.Entxt}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onLanguageChanged("ar")}
        style={styles.LangArButton}
      >
        <Text style={styles.Artxt}>عربي</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTheme("dadddrk")}
        style={styles.LangArButton}
      >
        <Text style={styles.Artxt}>dsd</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeTheme} style={styles.LangArButton}>
        <Text style={styles.Artxt}>theme</Text>
      </TouchableOpacity>
    </View>
  );
}
