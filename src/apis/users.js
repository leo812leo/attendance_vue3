import { apiHelper } from "../utils/helpers";

const getToken = () => localStorage.getItem("token");

export default {
  getCurrentUser() {
    return apiHelper.get("/getCurrentUser",)
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`,)
  },
  changPassword({ currentPassword, newPassword, checkPassword, employeeId }) {
    return apiHelper.post('/users/changePassword', {
      currentPassword,
      newPassword,
      checkPassword,
      employeeId,
    })
  }
};