import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { routeNames } from "../../../config";
import { Avatar, Button, ListItem } from "react-native-elements";
import sharedStyle from "../../theme/shared.style";
import { useDispatch } from "react-redux";

export default function NewsItem({ navigation, item, index, setLoading }) {
  const { button } = sharedStyle;
  const dispatch = useDispatch();
  const deleteNewsItem = async (newsId) => {
    setLoading(true);
    const response = await dispatch.newsModel.deleteNews({ newsId });
    response && navigation.navigate(routeNames.newsItem);
    setLoading(false);
  };
  const renderAvatarLeft = (avatar) => (
    <View
      style={{
        height: "100%",
        marginRight: Platform.OS === "web" ? 10 : 0,
      }}
    >
      {/* <Avatar source={{ uri: avatar }} size="medium" rounded /> */}
      <Text>{avatar}</Text>
    </View>
  );
  return (
    <View key={index}>
      {/* <Text>{`${item.body.substr(0, 100)} ...`}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routeNames.newsItem, { newsId: item.id });
        }}
      >
        <Text>Read more</Text>
      </TouchableOpacity> */}
      <ListItem
        containerStyle={{
          alignItems: "flex-start",
          borderBottomWidth: 1,
          // flex: 1,
          width: Dimensions.get("window").width,
          // overflowX: "hidden",
        }}
        subtitleStyle={{ color: "rgba(0, 0, 0, 0.54)" }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{`${item.body.substr(
            0,
            100
          )} ...`}</ListItem.Subtitle>
          <View
            style={{
              flexDirection: "row",
              width: Dimensions.get("window").width,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button
              title="Read more"
              icon={{
                color: "white",
                name: "eye",
                size: 15,
                type: "font-awesome",
              }}
              onPress={() => {
                navigation.navigate(routeNames.newsItem, { newsId: item.id });
              }}
              buttonStyle={{ ...button.containerStyle, ...{ marginRight: 5 } }}
            />
            <Button
              title="Edit"
              icon={{
                color: "white",
                name: "edit",
                size: 15,
                type: "font-awesome",
              }}
              onPress={() => {
                navigation.navigate(routeNames.createOrEditNews, {
                  newsId: item.id,
                  action: "edit",
                });
              }}
              buttonStyle={{ ...button.containerStyle, ...{ marginRight: 5 } }}
            />
            <Button
              title="Delete"
              icon={{
                color: "white",
                name: "trash",
                size: 15,
                type: "font-awesome",
              }}
              onPress={() => {
                deleteNewsItem(item.id);
              }}
              buttonStyle={{ ...button.containerStyle, ...{ marginRight: 20 } }}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}
