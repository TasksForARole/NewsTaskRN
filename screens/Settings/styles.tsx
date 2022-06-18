/* eslint-disable prettier/prettier */
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  HairLine: {},
  ModeSwitchCont: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  LangEnButton: {
    backgroundColor: "#ffffff",
    width: 205,
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    margin: 24,
  },
  Entxt: {
    fontSize: 15,
    lineHeight: 20,
    color: "#1A051D",
  },
  LangArButton: {
    backgroundColor: "#f1f3f6",
    width: 205,
    height: 60,
    borderRadius: 6,
    borderStyle: "solid",
    border: 15,
    borderColor: "#f1f3f6",
    justifyContent: "center",
    alignItems: "center",
  },
  Artxt: {
    fontSize: 20,
    lineHeight: 22,
    color: "#1A051D",
  },
});

export default styles;
