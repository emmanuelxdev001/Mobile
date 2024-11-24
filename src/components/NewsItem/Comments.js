import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { Avatar, Button, Card, Input, ListItem } from "react-native-elements";
import styles from "../../theme/shared.style";

import CommentList from "./CommentList";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

const styles_ = StyleSheet.create({
  wrapper: {
    backgroundColor: "grey",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#fff",

    justifyContent: "center",
    marginVertical: 10,
  },
});
export default function Comments({ comments, loading, newsId, setLoading }) {
  const { input, button } = styles;
  const dispatch = useDispatch();
  const onSubmitComment = async ({ name, avatar, comment }) => {
    setLoading(true);
    await dispatch.commentsModel.createComment({
      newsId,
      commentData: {
        name,
        avatar,
        comment,
      },
    });
    setLoading(false);
  };

  return (
    <View style={{ paddingBottom: 100 }}>
      <Card containerStyle={{ marginTop: 15 }}>
        <Card.Title>Post a Comment</Card.Title>
        <Card.Divider />
        <Formik
          initialValues={{
            name: "",
            avatar:
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
            comment: "",
          }}
          onSubmit={onSubmitComment}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <Input
                label="Name"
                placeholder="Your name"
                containerStyle={input.containerStyle}
                inputStyle={input.inputStyle}
                onChangeText={handleChange("name")}
                value={values.name}
              />
              <Input
                label="Comment"
                placeholder="Post a comment"
                containerStyle={input.containerStyle}
                inputStyle={input.inputStyle}
                onChangeText={handleChange("comment")}
                value={values.comment}
              />
              <Button
                title="Post comment"
                icon={{
                  color: "white",
                  name: "paper-plane",
                  size: 15,
                  type: "font-awesome",
                }}
                buttonStyle={button.containerStyle}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </Card>
      {Boolean(comments) && comments.length > 0 ? (
        <CommentList comments={comments} loading={loading} />
      ) : (
        <></>
      )}
    </View>
  );
}
