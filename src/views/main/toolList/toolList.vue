<script>
import {useStateStore} from '@/utils/store';
import draggable from 'vuedraggable'


const store = useStateStore()

export default {
    name: "toolList",
    components: {
        draggable,
    },
    data() {
        return {
            list: store.getCanvasList,
            chooseElement: null,
            wrapper: document.createElement('div'),
        }
    },
    methods: {
        chooseLayer(item) {
            let element = item.element
            this.chooseElement = item
            // 设置包装元素的样式
            this.wrapper.style.position = 'absolute';
            this.wrapper.style.border = '2px dashed red';
            this.wrapper.style.width = '110%';
            this.wrapper.style.height = '110%';
            this.wrapper.style.margin = '-2px';
            this.wrapper.style.top = '-5%';
            this.wrapper.style.left = '-5%';
            element.appendChild(this.wrapper)


            let style = this.chooseElement.element.style;
            this.chooseElement.attr = {
                border: style?.borderColor,
                backgroundColor: style?.backgroundColor,
            }

        },
    },
    watch:{
        chooseElement:{
            handler(){
                console.log(this.chooseElement.attr.backgroundColor)
                let bacRgba = this.chooseElement.attr.backgroundColor.rgba
                let borderRgba = this.chooseElement.attr.border.rgba
                if (bacRgba?.r){
                    this.chooseElement.element.style.backgroundColor =  `rgba(${bacRgba.r},${bacRgba.g},${bacRgba.b},${bacRgba.a})`
                }
                if (borderRgba?.r){
                    this.chooseElement.element.style.borderColor =  `rgba(${borderRgba.r},${borderRgba.g},${borderRgba.b},${borderRgba.a})`
                }


            },
            deep:true,
        }
    },
    created() {


    }
}
</script>

<template>
    <div>
        <div class="tool-box">
            <div class="tool-detail">
                <div class="tool-name">
                    属性
                </div>
                <div class="attr-parent" v-if="chooseElement">
                    <div class="attr-box" >
                        <div class="attr-name">
                            背景色
                        </div>
                        <div class="attr-item">
                            <Sketch v-model="chooseElement.attr.backgroundColor"></Sketch>
                        </div>
                    </div>
                    <div class="attr-box" >
                        <div class="attr-name">
                            边框
                        </div>
                        <div class="attr-item">
                            <Sketch v-model="chooseElement.attr.border"></Sketch>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="tool-box">
            <div class="tool-detail">
                <div class="tool-name">
                    图层
                </div>
                <div class="tool-detail-box">
                    <draggable
                        v-model="list"
                        item-key="name">
                        <template #item="{element}">
                            <div @click="chooseLayer(element)" class="layer-item"
                                 :class="element.index === chooseElement?.index?'layer-item-choose':''">{{ element.name }}
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.tool-detail {
    padding: 0 5px;
}

.layer-item {
    margin: 2px 0;
    padding: 0 5px;
    cursor: pointer;
}

.layer-item-choose {
    background-color: #4E5157;
}

</style>
