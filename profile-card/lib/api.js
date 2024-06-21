import { getItem } from "../utils/AsyncStorage";

export const API_URL = "https://profile-card-api.vercel.app";

const DEFAULT_OPTIONS = {
  method: "GET",
  body: null,
  contentType: "application/json",
};

const api = async (endpoint, opts = DEFAULT_OPTIONS) => {
  const {
    method = DEFAULT_OPTIONS.method,
    body = DEFAULT_OPTIONS.body,
    contentType = DEFAULT_OPTIONS.contentType,
  } = opts;

  const result = {
    data: null,
    error: null,
  };

  const token = await getItem("token");

  const headers = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (contentType === "application/json") {
    headers["Content-Type"] = "application/json";
  }

  const requestInit = {
    method,
    headers,
    body: null,
  };

  if (body) {
    if (body instanceof FormData) {
      requestInit.body = body;
    } else {
      requestInit.body = JSON.stringify(body);
    }
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, requestInit);

    if (res.ok) {
      result.data = await res.json();
    } else {
      result.error = await res.json();
    }
  } catch (error) {
    result.error = {
      message: error.message,
    };
  }

  return result;
};

export default api;
