import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from "axios-extensions";
import { API_ENDPOINT } from "@env";

export class BaseRequest {
  request;
  apiEndpoint = API_ENDPOINT;

  constructor() {
    this.request = axios.create({
      baseURL: this.apiEndpoint,
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      adapter: throttleAdapterEnhancer(
        cacheAdapterEnhancer(axios.defaults.adapter, {
          cacheFlag: "useCache",
        })
      ),
    });

    this.request.defaults.headers.common["Content-Type"] = "application/json";
  }
}
