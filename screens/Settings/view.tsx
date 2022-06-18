import React, {useState} from "react";
import {TouchableOpacity, Text, View, Switch, Image} from "react-native";
import styles from "./styles";
import {RootTabScreenProps} from "../../types";
import {changeLanguage, strings} from "@Localization";

import {useTheme} from "@ThemeContext";
import {CustomText} from "components/CustomText";
import CustomButton from "components/CustomeButtom";
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
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabledLang, setIsEnabledLang] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    changeTheme();
  };
  const changeTheme = () => {
    updateTheme(theme.ThemeMode);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeModes")}
        </CustomText>
        <Switch
          trackColor={{false: "blue", true: "gray"}}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeLanguage")}
        </CustomText>
        <CustomButton onPress={() => changeLanguage("en")}>
          <CustomText color={theme.text}>English</CustomText>
        </CustomButton>
        <CustomButton onPress={() => changeLanguage("de")}>
          <CustomText color={theme.text}>German</CustomText>
        </CustomButton>
      </View>
    </View>
  );
}
