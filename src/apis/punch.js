import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem("token");

export default {
  punch() {
    return apiHelper.get('/punch', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  }
}