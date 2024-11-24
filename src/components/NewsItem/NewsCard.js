import { View, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-elements";
import { routeNames } from "../../../config";
import sharedStyle from "../../theme/shared.style";
import ImageSlider from "./ImageSlider";

export default function NewsCard({ newsItem, navigation, images }) {
  const { title, body, author, createdAt } = newsItem;
  const { button } = sharedStyle;
  return (
    <View>
      <Card>
        <Card.Title>{title}</Card.Title>
        <View style={{ marginBottom: 10 }}>
          <Text>
            Posted by {author} at {createdAt}
          </Text>
        </View>
        <Card.Divider />

        <View style={{ marginBottom: 10 }}>
          {images.length > 0 ? <ImageSlider images={images} /> : <></>}
        </View>
        <Text style={{ marginBottom: 10 }}>{body}</Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
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
                newsId: newsItem.id,
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
            buttonStyle={button.containerStyle}
          />
        </View>
      </Card>
    </View>
  );
}
