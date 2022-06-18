import {TouchableOpacity, Text, View, Switch} from "react-native";
import styles from "./styles";
import {RootTabScreenProps} from "../../types";
import {changeLanguage, strings} from "@Localization";
import React from "react";
import {useTheme} from "@ThemeContext";
///
export default function SettingsView(
  {navigation}: RootTabScreenProps<"Settings">,
  props: any
) {
  const onLanguageChanged = async (language: "en" | "de") => {
    changeLanguage(language);
  };
  ///
  const {theme, updateTheme} = useTheme();

  const changeTheme = () => {
    updateTheme(theme.ThemeMode);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={styles.title}>{strings("Settings")}</Text>
      <TouchableOpacity
        onPress={() => onLanguageChanged("en")}
        style={styles.LangEnButton}
      >
        <Text style={styles.Entxt}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onLanguageChanged("de")}
        style={styles.LangArButton}
      >
        <Text style={styles.Artxt}>german</Text>
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
