import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Platform,
  requireNativeComponent,
} from "react-native";
import axios from "axios";
import {ApiKeyForNews, Url} from "@ConstantsValues/";
import React, {useContext, useState} from "react";
import styles from "./styles";
import {useQuery} from "react-query";
import {RootTabScreenProps} from "../../types";
import {strings} from "@Localization/";
import {useTheme} from "@ThemeContext";
import {INewsData} from "../../types";
import {SCREEN_WIDTH} from "utils/scaling";
import {CustomText} from "../../components/CustomText";
import {LinearGradient} from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, {Rect} from "react-native-svg";
import CustomButton from "components/CustomeButtom";
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
///
const {width, height} = Dimensions.get("window");

const BACKDROP_HEIGHT = height * 0.65;

const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;

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

  const NewsApiData = data?.data.articles;
  if (error) return <Text> Error : {error.message}</Text>;
  if (isLoading) return <ActivityIndicator />;

  ///
  const Backdrop = ({newsApiData, scrollX}) => {
    const NewsBackDropData = data?.data.articles;

    return (
      <View style={{height: BACKDROP_HEIGHT, width, position: "absolute"}}>
        <FlatList
          data={NewsBackDropData}
          keyExtractor={(item) => item.title}
          removeClippedSubviews={false}
          contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
          renderItem={({item, index}) => {
            if (!item.urlToImage) {
              return null;
            }
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              // index * ITEM_SIZE,
            ];

            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width, 0],
            });
            return (
              <MaskedView
                androidRenderingMode="hardware"
                maskElement={
                  <AnimatedSvg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    style={{transform: [{translateX}]}}
                  >
                    <Rect
                      x="0"
                      y="0"
                      width={width}
                      height={height}
                      fill="red"
                    />
                  </AnimatedSvg>
                }
                style={{position: "absolute"}}
              >
                <Image
                  source={require("../../assets/images/musala.jpg")}
                  style={{
                    width,
                    height: BACKDROP_HEIGHT,
                    position: "absolute",
                    resizeMode: "cover",
                  }}
                />
              </MaskedView>
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
  // console.log(data?.data.articles);
  return (
    <View style={styles.container}>
      <Backdrop newsApiData={data?.data.articles} scrollX={scrollX} />
      <Animated.FlatList
        data={NewsApiData.reverse()}
        keyExtractor={(item) => item.title}
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
          if (!item.title) {
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
            extrapolate: "clamp",
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
                <CustomButton
                  onPress={() => navigation.navigate("Detailed", {item})}
                >
                  <CustomText>Read More</CustomText>
                </CustomButton>
              </Animated.View>
              <View style={{marginBottom: 100}} />
            </View>
          );
        }}
      />
    </View>
  );
}
