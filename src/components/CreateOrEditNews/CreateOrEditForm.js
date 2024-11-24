import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../theme/shared.style";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { routeNames } from "../../../config";
import ImageSlider from "../NewsItem/ImageSlider";
import axios from "axios";
import Loader from "../Shared/Loader";

export default function CreateOrEditForm({ navigation, route }) {
  const { input, button } = styles;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const newsState = useSelector((state) => state.newsModel);
  const imagesState = useSelector((state) => state.imagesModel);
  const isEdit =
    route.params?.newsId &&
    route.params?.action &&
    route.params?.action === "edit";

  const onSubmit = async ({ author, title, body, images }) => {
    if (isEdit) {
      setLoading(true);
      await dispatch.newsModel.updateNews({
        newNewsData: {
          author,
          title,
          body,
        },
        newsId: newsState.newsItem?.id,
        imageData: route.params?.photos,
        hasImage: Boolean(route.params?.photos),
      });
      navigation.navigate(routeNames.home);
    } else {
      setLoading(true);
      await dispatch.newsModel.createNews({
        newsData: {
          author,
          title,
          body,
        },
        imageData: route.params?.photos,
        hasImage: Boolean(route.params?.photos),
      });
      navigation.navigate(routeNames.home);
    }
  };

  const fetchEditNewsData = useCallback(async (newsId) => {
    setLoading(true);
    await dispatch.newsModel.getSingleNews({ newsId });
    await dispatch.imagesModel.getImages({
      newsId,
      pageNumber: 1,
      limit: 1000,
    });
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isEdit) {
      fetchEditNewsData(route.params?.newsId);
    }
  }, []);

  const returnEditImages = (isEdit) => {
    if (isEdit) {
      if (isEdit && imagesState.images.length > 0) {
        return imagesState.images;
      } else return [];
    } else {
      if (route.params?.photos) {
        return route.params?.photos?.map((photo) => ({
          image: photo?.uri,
        }));
      } else return [];
    }
  };

  const form = () => (
    <Formik
      initialValues={{
        author: isEdit ? newsState.newsItem?.author : "",
        title: isEdit ? newsState.newsItem?.title : "",

        body: isEdit ? newsState.newsItem?.body : "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <Input
            containerStyle={input.containerStyle}
            inputStyle={input.inputStyle}
            label="Author"
            placeholder="Your name"
            onChangeText={handleChange("author")}
            value={values.author}
          />
          <Input
            containerStyle={input.containerStyle}
            inputStyle={input.inputStyle}
            label="Title"
            placeholder="What's the title of this news item?"
            onChangeText={handleChange("title")}
            value={values.title}
          />
          <Input
            containerStyle={input.containerStyle}
            inputStyle={input.inputStyle}
            label="Body"
            placeholder="Body of news item"
            onChangeText={handleChange("body")}
            value={values.body}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: "top" }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              marginLeft: 30,
              marginBottom: 30,
            }}
          >
            <Button
              title="ATTACH MEDIA"
              type="outline"
              icon={{
                name: "paperclip",
                size: 15,
                type: "antdesign",
              }}
              buttonStyle={button.containerStyle}
              onPress={() => {
                navigation.navigate(routeNames.imageBrowser);
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            {returnEditImages(isEdit).length > 0 ? (
              <ImageSlider images={returnEditImages(isEdit)} />
            ) : (
              <></>
            )}
          </View>
          <Button
            title={isEdit ? "UPDATE" : "POST"}
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
  );

  const renderForm = (isEdit) => {
    if (isEdit) {
      if (isEdit && Object.keys(newsState.newsItem).length > 0) {
        return form();
      } else return <Text>Loading</Text>;
    } else {
      return form();
    }
  };

  return <>{loading ? <Loader /> : renderForm()}</>;
}
