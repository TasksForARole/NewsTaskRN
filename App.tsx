import {StatusBar} from "expo-status-bar";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React, {useState} from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {Appearance, Text, TouchableOpacity, View} from "react-native";
import {ThemeContext} from "@ThemeContext";
import ThemeWrapper from "components/ThemeWrapper";
import CustomStatusBar from "components/CustomStatusBar";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeContext>
        <ThemeWrapper>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />

            <CustomStatusBar />
          </SafeAreaProvider>
        </ThemeWrapper>
      </ThemeContext>
    );
  }
}
