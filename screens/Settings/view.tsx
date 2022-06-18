import React, {useState, useEffect} from "react";
import {TouchableOpacity, Text, View, Switch, Image} from "react-native";
import styles from "./styles";
import {RootTabScreenProps} from "../../types";
import {changeLanguage, strings} from "@Localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTheme} from "@ThemeContext";
import {CustomText} from "components/CustomText";
import CustomButton from "components/CustomeButtom";
import {_retrieveData} from "@StorageController";
import {LANG_KEY} from "@ConstantsValues";

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

  const [LangSelected, setLangSelected] = useState("");
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    changeTheme();
  };
  const changeTheme = () => {
    updateTheme(theme.ThemeMode);
  };

  const getCurrentLang = async () => {
    try {
      let retrievedItem: any;
      if (LANG_KEY == null) {
        let allKeys = await AsyncStorage.getAllKeys();
        retrievedItem = await AsyncStorage.multiGet(allKeys);
      } else {
        retrievedItem = await AsyncStorage.getItem(LANG_KEY);
      }
      return (
        JSON.parse(retrievedItem),
        setLangSelected(retrievedItem),
        console.log(LangSelected)
      );
    } catch (error) {}
  };

  useEffect(() => {
    getCurrentLang();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeModes")}
        </CustomText>
        <Switch
          trackColor={{false: "#60935F", true: "#fff"}}
          thumbColor={isEnabled ? "#60935F" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.ModeSwitchCont}>
        <CustomText color={theme.text} size={24}>
          {strings("ChangeLanguage")}
        </CustomText>
        <CustomButton
          disabled={LangSelected.includes("en") ? true : false}
          onPress={() => onLanguageChanged("en")}
        >
          <CustomText color={theme.text}>English</CustomText>
        </CustomButton>
        <CustomButton
          disabled={LangSelected.includes("de") ? true : false}
          onPress={() => onLanguageChanged("de")}
        >
          <CustomText color={theme.text}>German</CustomText>
        </CustomButton>
      </View>
    </View>
  );
}
