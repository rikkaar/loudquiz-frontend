import $api from "../http/index.js";

export default class AuthService {
    static async findRoom() {
        return $api.get('/room/findRoom')
    }

    static async changeComplicity(room, state) {
        return $api.get(`/room/${room}/complicity/${state}`)
    }

    static async changeExperimental(room, state) {
        return $api.get(`/room/${room}/experimental/${state}`)
    }

    static async changeLoudQuiz(room, state) {
        return $api.get(`/room/${room}/loud_quiz/${state}`)
    }

    static async deleteRoom(){
        return $api.delete(`/room/`)
    }

    static async createRoom() {
        return $api.get('/room/create')
    }

    static async getRoomById(roomId) {
        return $api.get(`/room/get/${roomId}`)
    }

    static async getRoomSettings(socket) {
        return $api.get(`/room/getBySocket/${socket}`)
    }

    static async getRoomByCode(code) {
        return $api.get(`/room/getByCode/${code}`)
    }
}