import {Linking} from "react-native";

export const openLink = async (link: string) => {
  Linking.openURL(link);
};
