import { BaseRequest } from "../axios";

// News Requests Class - Here, I implicitly write API fetching logic
export class NewsRequestImpl extends BaseRequest {
  requestHeader = {
    headers: {},
  };

  // 01. Get All News Request
  async getNews(pageNumber, limit) {
    const { data: response } = await this.request.get(
      `?page=${pageNumber}&limit=${limit}`,
      this.requestHeader
    );
    return response;
  }

  // 02. Get Single News Item Request
  async getSingleNews(newsId) {
    const { data: response } = await this.request.get(
      `/${newsId}`,
      this.requestHeader
    );
    return response;
  }

  // 03. Create News Item Request
  async createNews(newsData) {
    const { data: response } = await this.request.post(
      `/`,
      newsData,
      this.requestHeader
    );
    return response;
  }

  // 04. Update a News Item Request
  async updateNews(newsId, newNewsData) {
    const { data: response } = await this.request.put(
      `/${newsId}`,
      newNewsData,
      this.requestHeader
    );
    return response;
  }

  // 05. Delete a News Item Request
  async deleteNews(newsId) {
    const { data: response } = await this.request.delete(
      `/${newsId}`,
      this.requestHeader
    );
    return response;
  }
}
