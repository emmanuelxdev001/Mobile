import axios from "axios";
import { ImagesController } from "../../api/images/images.controller";
import { ImagesRequestImpl } from "../../api/images/images.request";

import {
  CREATE_IMAGES_ITEM,
  DELETE_IMAGES_ITEM,
  GET_IMAGES,
  GET_IMAGES_ITEM,
  UPDATE_IMAGES_ITEM,
  PAGINATE_IMAGES,
} from "../types";

const request = new ImagesRequestImpl();
const controller = new ImagesController(request);

export const imagesModel = {
  state: {
    images: [],
    imagesItem: {},
    currentPage: 1,
  },
  reducers: {
    [GET_IMAGES]: (state, payload) => {
      let newState = { ...state };
      newState.images = payload;
      return newState;
    },
    [GET_IMAGES_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.imagesItem = payload;
      return newState;
    },
    [CREATE_IMAGES_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.images = [...newState.images, payload];
      return newState;
    },
    [UPDATE_IMAGES_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.images.findIndex(
        (item) => item.id === payload.id
      );
      newState.images[indexOfItem] = payload;
      return newState;
    },
    [DELETE_IMAGES_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.images.findIndex(
        (item) => item.id === payload.id
      );
      newState.images = newState.images.filter(
        (item, index) => index !== indexOfItem
      );
      return newState;
    },
    [PAGINATE_IMAGES]: (state, payload) => {
      let newState = { ...state };
      newState.currentPage = payload.pageNumber;
      return newState;
    },
  },
  effects: (dispatch) => ({
    async getImages(payload, rootState) {
      const response = await controller.getImages(
        payload.newsId,
        payload.pageNumber,
        payload.limit
      );
      dispatch.imagesModel[GET_IMAGES](response);
    },
    async getSingleImage(payload, rootState) {
      const response = await controller.getSingleImage(
        payload.newsId,
        payload.imageId
      );
      dispatch.imagesModel[GET_IMAGES_ITEM](response);
    },
    async createImage(payload, rootState) {
      try {
        const res = await Promise.all(
          payload.imageData.map((image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "ieahvhqz");
            return fetch(
              "https://api.cloudinary.com/v1_1/dcjxlbq4z/image/upload",
              {
                method: "post",
                headers: { "Content-Type": "multipart/form-data" },
                body: formData,
              }
            );
          })
        );

        const data = await Promise.all(res.map((r) => r.json()));
        const urls = data.map((img) => img.url);
        urls.map(async (url) => {
          const response = await controller.createImage(payload.newsId, url);
          dispatch.imagesModel[CREATE_IMAGES_ITEM](response);
        });
      } catch (err) {
        throw Error(err);
      }
    },

    async updateImage(payload, rootState) {
      const response = await controller.updateImage(
        payload.newsId,
        payload.imageId,
        payload.newImageData
      );
      dispatch.imagesModel[UPDATE_IMAGES_ITEM](response);
    },
    async deleteImage(payload, rootState) {
      const response = await controller.deleteImage(
        payload.newsId,
        payload.imageId
      );
      response && dispatch.imagesModel[DELETE_IMAGES_ITEM](payload.imageId);
    },
  }),
};
