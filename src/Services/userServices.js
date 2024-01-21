import http from "../http-common";

const userLogin = (loginDetails) => {
  return http.post("/users/login", loginDetails);
};

// Register new user
const registerNewUser = (newUserData) => {
  return http.post("/users", newUserData);
};

// Verify new user
const verifyNewUser = (userEnteredVerificationCode) => {
  const requestBody = {
    code: userEnteredVerificationCode,
  };
  return http.post("/users/verify", requestBody);
};

// Update user account details
const updateUserAccountDetails = (userId, updatedData) => {
  const userData = {
    headers: {
      "User-Id": userId,
    },
  };

  const requestBody = {
    ...updatedData,
  };
  return http.put(`/users/${userId}`, requestBody, userData);
};

// Change user password
const changeUserPassword = (userId, passwordChangeData) => {
  const userData = {
    headers: {
      "User-Id": userId,
    },
  };
  const requestBody = {
    ...passwordChangeData,
  };
  return http.put("/users/password", requestBody, userData);
};

// Delete user account
const deleteUserAccount = (userId, password) => {
  const userData = {
    headers: {
      "User-Id": userId,
    },
  };
  const requestBody = {
    password: password,
  };
  return http.post(`/users/delete/${userId}`, requestBody, userData);
};

// Get all users
const getAllUsers = (userId) => {
  const userData = {
    headers: {
      "User-Id": userId,
    },
  };
  return http.get("/users", userData);
};

// Update user Role
const updateUserRole = (userId, updatedUserId, updatedRole) => {
  const userData = {
    headers: {
      "User-Id": userId,
    },
  };
  const requestBody = {
    updatedUserId: updatedUserId,
    updatedUserRole: updatedRole,
  };
  return http.put("/users/role", requestBody, userData);
};

const userServices = {
  userLogin,
  registerNewUser,
  verifyNewUser,
  updateUserAccountDetails,
  changeUserPassword,
  deleteUserAccount,
  getAllUsers,
  updateUserRole,
};

export default userServices;
