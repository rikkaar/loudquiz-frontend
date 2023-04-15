import $api from "../http/index.js";

export default class AuthService {
    static async putInRoom(roomId) {
        return $api.get(`/user/put/${roomId}`)
    }
}