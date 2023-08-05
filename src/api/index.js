const API = "http://192.168.145.20:8081/FAD"
export const logIn = (API + "/user/login");
export const signUp = (API + "/user/register");
export const userList = (API + "/user/userlist");
export const userUpdate = (API + "/user/update");
var isLogin
export const isLoginApi = () => {
    if (isLogin) {
        // navigate('/', { replace: true });
    }
}