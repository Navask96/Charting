// ** Import api
import http from "./http-common";

// Function to create an item

// Function to create everything
export const createEverything = async (data) => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(`/everything`, data, { headers });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userLogin = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(`/users/login`, data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const createUser = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const ent = "users";

  try {
    const response = await http.post(`/users?ent=${ent}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEverything = async (ent) => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.get(`/everything?ent=${ent}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.get("/users/all", { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (_id, ent) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.get(`/everything/${_id}?ent=${ent}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEverything = async (id, data, ent) => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  if (!token) {
    alert("You are in viewing mode!");
    return;
  }

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.put(`/everything/${id}?ent=${ent}`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEverything = async (id, ent) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.delete(`/everything/${id}?ent=${ent}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkPasswordProtection = async (id) => {
  const token = null;
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.get(
      `/everything/check-password-protection/${id}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateChartPassword = async (id, password) => {
  const token = null;
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(
      `/everything/validate-password/${id}`,
      { password },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyUser = async (email, code) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(
      `/users/verify`,
      { email, code },
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const sendCodeByEmail = async (email) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(
      `/users/send-code`,
      { email },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, code, password) => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await http.post(
      `/users/reset-password`,
      { email, code, password },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const MyPage = () => {
  return (
    <div>
      <h1>Hello, this is My Page!</h1>
    </div>
  );
};

export default MyPage;
