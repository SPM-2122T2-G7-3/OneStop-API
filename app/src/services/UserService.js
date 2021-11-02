import http from "../http-common";

class UserService {

    getUsersByRole(role){
      return http.get(`/user/role/${role}`)
    }
  

    
    
  }


export default new UserService();