import { BaseRequest } from "../axios";

// Comments Requests Class - Here, I implicitly write API fetching logic
export class CommentsRequestImpl extends BaseRequest {
  url = "/comments";

  requestHeader = {
    headers: {},
  };

  // 01. Get Comments of a News Item Request
  async getComments(newsId, pageNumber, limit) {
    const { data: response } = await this.request.get(
      `/${newsId}/${this.url}?page=${pageNumber}&limit=${limit}`,
      this.requestHeader
    );
    return response;
  }

  // 02. Get Single Comment of a News Item Request
  async getSingleComment(newsId, commentId) {
    const { data: response } = await this.request.get(
      `/${newsId}/${this.url}/${commentId}`,
      this.requestHeader
    );
    return response;
  }

  // 03. Create Comment on a News Item Request
  async createComment(newsId, commentData) {
    const { data: response } = await this.request.post(
      `/${newsId}/${this.url}`,
      commentData,
      this.requestHeader
    );
    return response;
  }

  // 04. Update a Comment on a News Item Request
  async updateComment(newsId, commentId, newCommentData) {
    const { data: response } = await this.request.put(
      `/${newsId}/${this.url}/${commentId}`,
      newCommentData,
      this.requestHeader
    );
    return response;
  }

  // 05. Delete specific Comment on a news Item Request
  async deleteComment(newsId, commentId) {
    const { data: response } = await this.request.delete(
      `/${newsId}/${this.url}/${commentId}`,
      this.requestHeader
    );
    return response;
  }
}
