import $api from "../http/index.js";

export default class AuthService {
    static async login(name) {
        return $api.get(`/user/create/${name}`)
    }

    static async changeName(name) {
        return $api.get(`/user/changeName/${name}`)
    }

    static async isAuth() {
        return $api.get('/user/isAuth')
    }

    static async logout() {
        return $api.get('/user/logout')
    }
}