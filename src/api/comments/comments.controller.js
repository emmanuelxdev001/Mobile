// Comments Controller Class - Here, I implicitly write try catch finally logic to fetch, throw errors, do retries and possibly do any other permutations of operations after fetching request
export class CommentsController {
  constructor(request) {
    this.request = request;
  }

  // 01. Get Comments of a News Item Controller
  async getComments(newsId, pageNumber, limit) {
    try {
      const response = await this.request.getComments(
        newsId,
        pageNumber,
        limit
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  // 02. Get Single Comment of a News Item Controller
  async getSingleComment(newsId, commentId) {
    try {
      const response = await this.request.getSingleComment(newsId, commentId);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 03. Create Comment on a News Item Controller
  async createComment(newsId, commentData) {
    try {
      const response = await this.request.createComment(newsId, commentData);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 04. Update a Comment on a News Item Controller
  async updateComment(newsId, commentId, newCommentData) {
    try {
      const response = await this.request.updateComment(
        newsId,
        commentId,
        newCommentData
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  // 05. Delete specific Comment on a news Item Controller
  async deleteComment(newsId, commentId) {
    try {
      const response = await this.request.deleteComment(newsId, commentId);
      return response;
    } catch (e) {
      return e;
    }
  }
}
