// Auth

import api from "./api";

export const signIn = async (body) => {
  return await api("/api/login", {
    method: "POST",
    body,
  });
};

export const signUp = async (body) => {
  return await api("/api/register", {
    method: "POST",
    body,
  });
};

// Get User Data

export const getUser = async () => {
  return await api("/api/user");
};

// Update User Data

export const updateUser = async (body) => {
  return await api("/api/user", {
    method: "PUT",
    body,
  });
};
