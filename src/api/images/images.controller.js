// Images Controller Class - Here, I implicitly write try catch finally logic to fetch, throw errors, do retries and possibly do any other permutations of operations after fetching request
export class ImagesController {
  constructor(request) {
    this.request = request;
  }

  // 01. Get Images of a News Item Controller
  async getImages(newsId, pageNumber, limit) {
    try {
      const response = await this.request.getImages(newsId, pageNumber, limit);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 02. Get Single Image of a News Item Controller
  async getSingleImage(newsId, imageId) {
    try {
      const response = await this.request.getSingleImage(newsId, imageId);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 03. Create Image on a News Item Controller
  async createImage(newsId, imageData) {
    try {
      const response = await this.request.createImage(newsId, imageData);
      return response;
    } catch (e) {
      return e;
    }
  }

  // 04. Update an Image on a News Item Controller
  async updateImage(newsId, imageId, newImageData) {
    try {
      const response = await this.request.updateImage(
        newsId,
        imageId,
        newImageData
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  // 05. Delete specific Image on a news Item Controller
  async deleteImage(newsId, imageId) {
    try {
      const response = await this.request.deleteImage(newsId, imageId);
      return response;
    } catch (e) {
      return e;
    }
  }
}
