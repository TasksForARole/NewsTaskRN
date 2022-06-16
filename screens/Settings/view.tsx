import {TouchableOpacity} from "react-native";
import React from "react";
import styles from "./styles";
import {Text, View} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {changeLanguage, strings} from "@Localization/";

export default function SettingsView(
  {navigation}: RootTabScreenProps<"Settings">,
  props: any
) {
  const onLanguageChanged = async (language: "en" | "ar") => {
    changeLanguage(language);
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
}
