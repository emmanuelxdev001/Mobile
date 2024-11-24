import { BaseRequest } from "../axios";

// Images Requests Class - Here, I implicitly write API fetching logic
export class ImagesRequestImpl extends BaseRequest {
  url = "/images";

  requestHeader = {
    headers: {},
  };

  // 01. Get Images of a News Item Request
  async getImages(newsId, pageNumber, limit) {
    const { data: response } = await this.request.get(
      `/${newsId}/${this.url}?page=${pageNumber}&limit=${limit}`,
      this.requestHeader
    );
    return response;
  }

  // 02. Get Single Image of a News Item Request
  async getSingleImage(newsId, imageId) {
    const { data: response } = await this.request.get(
      `/${newsId}/${this.url}/${imageId}`,
      this.requestHeader
    );
    return response;
  }

  // 03. Create Image on a News Item Request
  async createImage(newsId, imageData) {
    const { data: response } = await this.request.post(
      `/${newsId}/${this.url}`,
      imageData,
      this.requestHeader
    );
    return response;
  }

  // 04. Update an Image on a News Item Request
  async updateImage(newsId, imageId, newImageData) {
    const { data: response } = await this.request.put(
      `/${newsId}/${this.url}/${imageId}`,
      newImageData,
      this.requestHeader
    );
    return response;
  }

  // 05. Delete specific Image on a news Item Request
  async deleteImage(newsId, imageId) {
    const { data: response } = await this.request.delete(
      `/${newsId}/${this.url}/${imageId}`,
      this.requestHeader
    );
    return response;
  }
}
