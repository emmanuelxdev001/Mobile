import { NewsRequestImpl } from "./news.request";

// News Controller Class - Here, I implicitly write try catch finally logic to fetch, throw errors, do retries and possibly do any other permutations of operations after fetching request
export class NewsController {
  constructor(request) {
    this.request = request;
  }

  // 01. Get All News Controller
  async getNews(pageNumber, limit) {
    try {
      const response = await this.request.getNews(pageNumber, limit);

      return response;
    } catch (e) {
      return e;
    }
  }

  // 02.  Get Single News Item Controller
  async getSingleNews(newsId) {
    try {
      const response = await this.request.getSingleNews(newsId);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 03. Create  a News Item Controller
  async createNews(newsData) {
    try {
      const response = await this.request.createNews(newsData);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 04. Update  a News Item Controller
  async updateNews(newsId, newNewsData) {
    try {
      const response = await this.request.updateNews(newsId, newNewsData);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 05. Delete specific news Item Controller
  async deleteNews(newsId) {
    try {
      const response = await this.request.deleteNews(newsId);
      return response;
    } catch (e) {
      return e;
    }
  }
}
