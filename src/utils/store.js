import {defineStore} from 'pinia'

export const useStateStore = defineStore("state", {
    //状态
    state: () => ({
        loading: false,
        canvasList:[],
        zoomSize:1,
    }),
    actions: {
        setLoading(load) {
            this.loading = load
        },
        setCanvasList(list){
            this.canvasList = list
        },
        setZoomSize(size){
            this.zoomSize = size
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

