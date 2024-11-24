import { CommentsController } from "../../api/comments/comments.controller";
import { CommentsRequestImpl } from "../../api/comments/comments.request";

import {
  CREATE_COMMENTS_ITEM,
  DELETE_COMMENTS_ITEM,
  GET_COMMENTS,
  GET_COMMENTS_ITEM,
  UPDATE_COMMENTS_ITEM,
  PAGINATE_COMMENTS,
} from "../types";

const request = new CommentsRequestImpl();
const controller = new CommentsController(request);

export const commentsModel = {
  state: {
    comments: [],
    commentsItem: {},
    currentPage: 1,
  },
  reducers: {
    [GET_COMMENTS]: (state, payload) => {
      let newState = { ...state };
      newState.comments = payload;
      return newState;
    },
    [GET_COMMENTS_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.commentsItem = payload;
      return newState;
    },
    [CREATE_COMMENTS_ITEM]: (state, payload) => {
      let newState = { ...state };
      newState.comments = [...newState.comments, payload];
      return newState;
    },
    [UPDATE_COMMENTS_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.comments.findIndex(
        (item) => item.id === payload.id
      );
      newState.comments[indexOfItem] = payload;
      return newState;
    },
    [DELETE_COMMENTS_ITEM]: (state, payload) => {
      let newState = { ...state };
      const indexOfItem = newState.comments.findIndex(
        (item) => item.id === payload.id
      );
      newState.comments = newState.comments.filter(
        (item, index) => index !== indexOfItem
      );
      return newState;
    },
    [PAGINATE_COMMENTS]: (state, payload) => {
      let newState = { ...state };
      newState.currentPage = payload.pageNumber;
      return newState;
    },
  },
  effects: (dispatch) => ({
    async getComments(payload, rootState) {
      const response = await controller.getComments(
        payload.newsId,
        payload.pageNumber,
        payload.limit
      );
      dispatch.commentsModel[GET_COMMENTS](response);
    },
    async getSingleComment(payload, rootState) {
      const response = await controller.getSingleComment(
        payload.newsId,
        payload.commentId
      );
      dispatch.commentsModel[GET_COMMENTS_ITEM](response);
    },
    async createComment(payload, rootState) {
      const response = await controller.createComment(
        payload.newsId,
        payload.commentData
      );
      dispatch.commentsModel[CREATE_COMMENTS_ITEM](response);
    },
    async updateComment(payload, rootState) {
      const response = await controller.updateComment(
        payload.newsId,
        payload.commentId,
        payload.newCommentData
      );
      dispatch.commentsModel[UPDATE_COMMENTS_ITEM](response);
    },
    async deleteComment(payload, rootState) {
      const response = await controller.deleteComment(
        payload.newsId,
        payload.commentId
      );
      response &&
        dispatch.commentsModel[DELETE_COMMENTS_ITEM](payload.commentId);
    },
  }),
};
