import {create} from 'zustand'
import { devtools } from 'zustand/middleware'

export const useQuizStore = create(devtools((set, get) => ({
    user: {},
    setUserId: (userId) => set({userId: userId}),
    setUserName: (name) => set({
        user: {...get().user, name}
    }),
    roomSettings: {},

    setUser: (user) => set({user: user}),

    setRoomSettings: (settings) => set({roomSettings: settings})
})))