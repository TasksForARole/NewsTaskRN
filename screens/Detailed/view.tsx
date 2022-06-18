import {
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import moment from "moment";
import axios from "axios";
import {ApiKeyForNews, Url} from "@ConstantsValues";
import {useQuery} from "react-query";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useContext, useCallback, useState} from "react";
import styles from "./styles";
// import {} from "../../components/Themed";
import {RootTabScreenProps} from "../../types";
import {strings} from "@Localization";
import {useTheme} from "@ThemeContext";
import {CustomText} from "components/CustomText";
import {WebViewScreen} from "../../components/webview/index";
import {Back} from "../../assets/gifs/index";
interface Route {
  params: {
    article: {
      author: string;
      title: string;
      urlToImage: string;
      publishedAt: string;
      url: string;
      content: string;
    };
    articleIndex: number;
  };
}
const DetailedView: React.FC<{props: Route}> = ({}) => {
  const route = useRoute();
  const article = route.params.item;
  const [isVisible, setIsVisible] = useState(false);
  const handleURLPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const navigation = useNavigation();

  ///
  const {theme} = useTheme();
  ///

  return (
    <>
      <TouchableOpacity
        style={styles.crossContainer}
        onPress={() => navigation.goBack()}
      >
        <Image style={styles.cross} source={Back} />
      </TouchableOpacity>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.ImageCont}>
          <Image
            source={{
              uri: article.urlToImage
                ? article.urlToImage
                : "https://arts.tu.edu.ly/wp-content/uploads/2020/02/placeholder.png",
              cache: "force-cache",
            }}
            style={styles.posterImage}
          />
        </View>
        <Text style={styles.author}>
          {strings("ArticleBy")} {article?.author ? article?.author : "Unknown"}
        </Text>
        <Text style={styles.Time}>
          {moment(article?.publishedAt).format("lll")}
        </Text>
        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.content}>{article?.content}</Text>
      </ScrollView>
      <View style={styles.readMoreContainer}>
        <Text style={styles.readMoreText} numberOfLines={2}>
          Read more at
          <Text onPress={handleURLPress} style={styles.link}>
            {article?.url}
          </Text>
        </Text>
      </View>
      <WebViewScreen
        {...{
          isVisible,
          url: article?.url ?? "https://google.com/",
          setIsVisible,
        }}
      />
    </>
  );
};
export default DetailedView;
