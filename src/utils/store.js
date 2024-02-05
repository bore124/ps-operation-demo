import {defineStore} from 'pinia'

export const useStateStore = defineStore("state", {
    //状态
    state: () => ({
        loading: false,
        canvasList:[],
    }),
    actions: {
        setLoading(load) {
            this.loading = load
        },
        setCanvasList(list){
            this.canvasList = list
        },

    },
    getters: {
        isLoading(state) {
            return state.loading
        },
        getCanvasList(state){
            return state.canvasList
        }

    }
})

