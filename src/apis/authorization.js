import { apiHelper } from "../utils/helpers";
export default {
  userLogin({ employeeId, password }) {
    return apiHelper.post('/users/login', {
      employeeId,
      password
    })
  },
};
