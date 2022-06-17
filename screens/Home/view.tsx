import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import axios from "axios";
import {ApiKeyForNews, Url} from "@ConstantsValues/";
import React, {useContext, useState} from "react";
import styles from "./styles";
import {useQuery} from "react-query";
// import {} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {strings} from "@Localization/";
import {useTheme} from "@ThemeContext";
import {INewsData} from "../../types";
import {SCREEN_WIDTH} from "utils/scaling";
import {CustomText} from "../../components/CustomText";
import {LinearGradient} from "expo-linear-gradient";
import {transform} from "@babel/core";

///
const {width, height} = Dimensions.get("window");

const BACKDROP_HEIGHT = height * 0.65;

const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;
const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);
export default function HomeView(
  {navigation}: RootTabScreenProps<"Home">,
  props: any
) {
  // const searchFilter = (text: string) => {
  //   if (text) {
  //     const newData = MasterData.filter(item => {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setNews(newData);
  //     setSearch(text);
  //   } else {
  //     setNews(MasterData);
  //     setSearch(text);
  //   }
  // };
  ///

  const Backdrop = ({NewsData, scrollX}) => {
    return (
      <View style={{height: BACKDROP_HEIGHT, width, position: "absolute"}}>
        <FlatList
          data={movies.reverse()}
          keyExtractor={(item) => item.key + "-backdrop"}
          removeClippedSubviews={false}
          contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
          renderItem={({item, index}) => {
            if (!item.backdrop) {
              return null;
            }
            const translateX = scrollX.interpolate({
              inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
              outputRange: [0, width],
              // extrapolate:'clamp'
            });
            return (
              <Animated.View
                removeClippedSubviews={false}
                style={{
                  position: "absolute",
                  width: translateX,
                  height,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{uri: item.backdrop}}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: "absolute",
                  }}
                />
              </Animated.View>
            );
          }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "white"]}
          style={{
            height: BACKDROP_HEIGHT,
            width,
            position: "absolute",
            bottom: 0,
          }}
        />
      </View>
    );
  };
  ///
  const [Search, setSearch] = useState("");
  const {theme} = useTheme();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  ///
  const GetNews = () => {
    return axios(Url + ApiKeyForNews);
  };
  ////
  const {isLoading, error, data} = useQuery("getNews", GetNews);

  if (error) return <Text> Error : {error.message}</Text>;
  if (isLoading) return <ActivityIndicator />;
  console.log(data.data.articles);
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data.data.articles.reverse()}
        keyExtractor={(item) => item.title + "-backdrop"}
        refreshing={isLoading}
        horizontal
        contentContainerStyle={{alignItems: "center"}}
        onRefresh={GetNews}
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          if (!item) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            // extrapolate: "clamp",
          });

          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{translateY}],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{uri: item.urlToImage}}
                  style={styles.posterImage}
                />
                <CustomText size={17} numberOfLines={5}>
                  {item.title}
                </CustomText>
              </Animated.View>
              <View style={{marginBottom: 100}} />
            </View>
          );
        }}
      />
    </View>
  );
}
