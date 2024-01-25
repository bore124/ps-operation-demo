<script>
import {SearchOutlined} from '@ant-design/icons-vue';

export default {
    name: "index",
    components: {SearchOutlined},
    data() {
        return {

        }
    },
    methods: {}
}
</script>

<template>
    <div class="body">
        <div class="left-tool-bar tool-bar">
        <div class="tool-box">
            <SearchOutlined />
        </div>
        </div>
        <div class="canvas-parent"
             v-draggable>
            <div class="canvas"
                 v-zoom

                 id="canvas" ref="canvas">

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
* {
    box-sizing: border-box;
    color: white;
}

.body {
    width: 100%;
    height: 100%;
    display: flex;
    background: #1E1F22;
}

.tool-bar {
    height: 100%;
    background: #2B2D30;
    flex: 0 0 auto; /* 固定大小的元素 */
    z-index: 2;

}

.left-tool-bar {
    width: 40px;
    left: 0;
    border-right: 1px solid #1E1F22;
}

.right-tool-bar {
    width: 250px;
    right: 0;
    border-left: 1px solid #1E1F22;
    padding: 20px 0;
}

.tool-box {
    padding: 5px 10px;
    border-bottom: 2px solid #1E1F22;
    border-top: 2px solid #1E1F22;
    background: #2B2D30;
}

.canvas-parent {
    flex-grow: 1; /* 占据剩余空间 */
    height: 100%;
    overflow: scroll;
    padding: 10px;
}

.canvas-parent::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: rgba(0,0,0,0);
}

.canvas-parent::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: rgba(83, 83, 84,.7);
}
.canvas-parent::-webkit-scrollbar-corner{
    background-color: rgba(0,0,0,0);

}


.canvas {
    position: relative; /* 添加这个定位 */
    transform-origin: 10px 10px; /* 缩放基点 */
    border: 1px solid black;
    width: 1920px;
    height: 1080px;
    background: white;
    transform: scale(1);
    z-index: 1;
}
</style>
