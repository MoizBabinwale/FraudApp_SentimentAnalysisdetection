const API = "http://192.168.147.20:8081/FAD"
export const logIn = (API + "/user/login");
export const signUp = (API + "/user/register");
export const userList = (API + "/user/userlist");
export const userUpdate = (API + "/user/update");
export const saveApps = (API + "/user/app-save");
export const appList = (API + "/user/app-list");
export const uploadCSV = (API + "/user/upload-csv");
export const saveReview = (API + "/user/review-save");
var isLogin
export const isLoginApi = () => {
    if (isLogin) {
        // navigate('/', { replace: true });
    }
}