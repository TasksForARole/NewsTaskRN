import {StyleSheet} from "react-native";
import styles from "./styles";
import {Text, View} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {strings} from "@Localization/";
export default function HomeView(
  {navigation}: RootTabScreenProps<"TabOne">,
  props: any
) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{strings("Settings")}</Text>
    </View>
  );
}
