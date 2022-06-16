import {StyleSheet} from "react-native";
import styles from "./styles";
import {Text, View} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";

export default function HomeView(
  {navigation}: RootTabScreenProps<"TabOne">,
  props: any
) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}
