/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from "react";
import {View, StyleSheet, ActivityIndicator, TextInput} from "react-native";
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  NativeBaseProvider,
} from "native-base";
import uuid from "react-native-uuid";
import {ApiKeyForNews, Url} from "@ConstantsValues";
import axios from "axios";
import {useTheme} from "@ThemeContext";
// create a component
const News = ({navigation}) => {
  const {theme} = useTheme();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [MasterData, setMasterData] = useState([]);
  const [Search, setSearch] = useState("");
  useEffect(() => {
    GetNewsFromApi();
  }, []);
  function GetNewsFromApi() {
    axios(Url + ApiKeyForNews)
      .then((res) => {
        setNews(res.data.articles);
        setMasterData(res.data.articles);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchFilter = (text: string) => {
    if (text) {
      const newData = MasterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNews(newData);
      setSearch(text);
    } else {
      setNews(MasterData);
      setSearch(text);
    }
  };

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <NativeBaseProvider>
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <TextInput
          placeholder="search here"
          style={styles.SearchInput}
          value={Search}
          onChangeText={(text) => searchFilter(text)}
          placeholderTextColor="gray"
        />
        <FlatList
          data={news}
          renderItem={({item}) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  size="50px"
                  source={{
                    uri: item.urlToImage
                      ? item.urlToImage
                      : "https://arts.tu.edu.ly/wp-content/uploads/2020/02/placeholder.png",
                  }}
                />
                <VStack style={{width: "80%"}}>
                  <Text
                    onPress={() => {
                      navigation.navigate("Detailed", {
                        item: item,
                      });
                    }}
                    style={[styles.Title, {color: theme.text}]}
                  >
                    {item.title}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          )}
          keyExtractor={() => uuid.v4()?.toString()}
          refreshing={isLoading}
          onRefresh={GetNewsFromApi}
        />
      </View>
    </NativeBaseProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  containerLight: {backgroundColor: "#FEFEFE"},
  containerDark: {backgroundColor: "#212121"},
  Title: {
    fontSize: 15,
  },
  titleDark: {color: "#FEFEFE"},
  titleLight: {color: "#212121"},
  SearchInput: {
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 15,
    borderColor: "#009688",

    width: "95%",
    shadowOffset: {height: 5, width: 0},
    shadowColor: "gray",
    shadowRadius: 6.68,
    elevation: 11,
  },
});

//make this component available to the app
export default News;
