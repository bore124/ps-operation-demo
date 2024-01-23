<script>
export default {
    name: "index",
    data() {
        return{

        }
    },
    methods: {
        canvasSizeChange(event){
            console.log(event.deltaY); // 鼠标滚轮值

            let  temp = this.$refs.canvas.style.transform
            var matches = temp.match(/\d+(\.\d+)?/);
            if (matches) {
                if (event.deltaY >0){
                    this.$refs.canvas.style.transform = `scale(${Number(matches[0]) - 0.1})`

                }else{
                    this.$refs.canvas.style.transform = `scale(${Number(matches[0]) + 0.1})`

                }

            } else {
                if (event.deltaY >0){
                    this.$refs.canvas.style.transform = `scale(0.9)`

                }else{
                    this.$refs.canvas.style.transform = `scale(1.1)`

                }
            }

            console.log()

        },
    }
}
</script>

<template>
    <div class="body">
        <div class="left-tool-bar tool-bar">

        </div>
        <div class="canvas-parent">
            <div class="canvas" id="canvas" ref="canvas" @wheel="canvasSizeChange">

            </div>
        </div>
        <div class="right-tool-bar tool-bar">
            <div class="tool-box">
                <div class="tool-detail">
                    <div class="tool-name">
                        属性
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
*{
    color: white;
}
.body{
    width: 100%;
    height: 100%;
    display: flex;
    background: #1E1F22;
}
.tool-bar{
    height: 100%;
    position: fixed;
    background: #2B2D30;
    z-index: 2;

}
.left-tool-bar{
    width: 40px;

    left: 0;
    border-right: 1px solid #1E1F22;
}
.right-tool-bar{
    width: 250px;
    right: 0;
    border-left: 1px solid #1E1F22;
    padding: 20px 0;
}

.tool-box{
    padding: 5px 10px;
    border-bottom: 2px solid #1E1F22;
    border-top: 2px solid #1E1F22;
    background: #2B2D30;
}
.canvas-parent{
    width: 100%;
    height: 100%;
    padding: 0 250px 0 40px;
    overflow: auto;
    box-sizing: border-box;
}
.canvas{
    width: 1920px;
    height: 1080px;
    background: white;
    transform:scale(1);
    z-index: 1;
}
</style>
