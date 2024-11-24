import { NewsController } from "../../api/news/news.controller";
import { NewsRequestImpl } from "../../api/news/news.request";
import {
  CREATE_NEWS_ITEM,
  DELETE_NEWS_ITEM,
  GET_NEWS,
  GET_NEWS_ITEM,
  UPDATE_NEWS_ITEM,
  PAGINATE_NEWS,
} from "../types";

const request = new NewsRequestImpl();
const controller = new NewsController(request);

export const newsModel = {
  state: {
    news: [],
    newsItem: {},
    currentPage: 1,
  },
  reducers: {
    [GET_NEWS]: (state, payload) => {
      let newState = { ...state };
      newState.news = payload;
      return newState;
    },
    [GET_NEWS_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.newsItem = payload;
      return newState;
    },
    [CREATE_NEWS_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.news = [...newState.news, payload];
      return newState;
    },
    [UPDATE_NEWS_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.news.findIndex(
        (item) => item.id === payload.id
      );
      newState.news[indexOfItem] = payload;
      return newState;
    },
    [DELETE_NEWS_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.news.findIndex(
        (item) => item.id === payload.id
      );
      newState.news = newState.news.filter(
        (item, index) => index !== indexOfItem
      );
      return newState;
    },
    [PAGINATE_NEWS]: (state, payload) => {
      let newState = { ...state };
      newState.currentPage = payload.pageNumber;
      return newState;
    },
  },
  effects: (dispatch) => ({
    async getNews(payload, rootState) {
      const response = await controller.getNews(
        payload.pageNumber,
        payload.limit
      );
      dispatch.newsModel[GET_NEWS](response);
    },
    async getSingleNews(payload, rootState) {
      const response = await controller.getSingleNews(payload.newsId);

      dispatch.newsModel[GET_NEWS_ITEM](response);
    },
    async createNews(payload, rootState) {
      const response = await controller.createNews(payload.newsData);
      dispatch.newsModel[CREATE_NEWS_ITEM](response);
      response &&
        payload?.hasImage &&
        dispatch.imagesModel.createImage({
          imageData: payload.imageData,
          newsId: response.id,
        });
    },
    async updateNews(payload, rootState) {
      const response = await controller.updateNews(
        payload.newsId,
        payload.newNewsData
      );
      dispatch.newsModel[UPDATE_NEWS_ITEM](response);
      response &&
        payload?.hasImage &&
        dispatch.imagesModel.createImage({
          imageData: payload.imageData,
          newsId: response.id,
        });
    },
    async deleteNews(payload, rootState) {
      const response = await controller.deleteNews(payload.newsId);
      response && dispatch.newsModel[DELETE_NEWS_ITEM](payload.newsId);
      console.log(response);
    },
  }),
};
