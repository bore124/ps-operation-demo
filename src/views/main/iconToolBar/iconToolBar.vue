<script>
import {DragOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
    name: "iconToolBar",
    data() {
        return {
            activityTool: "move"
        }
    },
    methods: {
        chooseTool(name){
            this.activityTool = name
            this.$emit('chooseTool', name)
        },
    },
    components: {DragOutlined, PlusOutlined}
}
</script>

<template>
    <div class="tool-parent">
        <div class="tool-box-parent">
            <div  class="tool-box" @click="chooseTool('move')" :class="activityTool==='move'?'tool-box-activity':''">
                <DragOutlined/>
            </div>
        </div>
        <div class="tool-box-parent">
            <div class="tool-box" @click="chooseTool('plus')" :class="activityTool==='plus'?'tool-box-activity':''">
                <PlusOutlined/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tool-box-parent {
    border-bottom: 2px solid #1E1F22;
    padding: 5px 2px;
}

.tool-parent {
    padding: 5px;
    margin: 2px;
}

.tool-box {
    padding: 1px;
    background: #2B2D30;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
}

.tool-box-activity {
    background: #4E5157;
}


</style>
