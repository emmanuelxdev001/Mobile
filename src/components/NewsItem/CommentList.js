import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Card, ListItem } from "react-native-elements";

export default function CommentList({ comments, loading }) {
  const renderAvatarLeft = (avatar) => (
    <View
      style={{
        height: "100%",
        marginRight: Platform.OS === "web" ? 10 : 0,
      }}
    >
      <Avatar source={{ uri: avatar }} size="medium" rounded />
    </View>
  );

  return (
    <View>
      <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <View>
          {Boolean(comments) && comments.length > 0 ? (
            comments.map((comment, index) => (
              <ListItem
                key={index}
                containerStyle={{
                  alignItems: "flex-start",
                  borderBottomWidth: 1,
                  flex: 1,
                  width: "100%",
                  // overflowX: "hidden",
                }}
                subtitleStyle={{ color: "rgba(0, 0, 0, 0.54)" }}
              >
                {renderAvatarLeft(comment.avatar)}
                <ListItem.Content>
                  <ListItem.Title>{comment.name}</ListItem.Title>
                  <ListItem.Subtitle>{comment.comment}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          ) : (
            <></>
          )}
        </View>
      </Card>
    </View>
  );
}
