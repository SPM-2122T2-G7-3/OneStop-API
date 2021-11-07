import http from "../http-common";

class UserService {

    getUsersByRole(role){
      return http.get(`/user/role/${role}`)
    }

    login(data){
      return http.post('/user/login', data)
  
    }
  

    
    
  }


export default new UserService();