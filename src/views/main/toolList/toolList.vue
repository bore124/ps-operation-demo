<script>
import {useStateStore} from '@/utils/store';
import draggable from 'vuedraggable'
import colorjoe from 'colorjoe'

const store = useStateStore()

export default {
    name: "toolList",
    components:{
        draggable
    },
    data() {
        return {
            list: store.getCanvasList,
            chooseIndex: -1,
            wrapper: document.createElement('div')
        }
    },
    methods: {
        chooseEleAttribute(){
            let style = this.list[this.chooseIndex - 1]?.element.style
            return {
                border: style?.borderColor,
                'background-color': style?.backgroundColor
            }
        },
        chooseLayer(item) {
            let element = item.element
            this.chooseIndex = item.index
            // 设置包装元素的样式
            this.wrapper.style.position = 'absolute';
            this.wrapper.style.border = '2px dashed red';
            this.wrapper.style.width = '110%';
            this.wrapper.style.height = '110%';
            this.wrapper.style.margin = '-2px';
            this.wrapper.style.top = '-5%';
            this.wrapper.style.left = '-5%';
            element.appendChild(this.wrapper)
        },
    },
    mounted() {
        const joe = colorjoe.rgb(this.$refs.bacColor, 'red');

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
                <div class="attr-parent">
                    <div class="attr-box">
                        <div class="attr-name">
                            背景色
                        </div>
                        <div class="attr-item">
                            <div ref="bacColor" >

                            </div>
                        </div>
                    </div>
                </div>
                {{chooseEleAttribute()}}
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
                            <div @click="chooseLayer(element)" class="layer-item" :class="element.index === chooseIndex?'layer-item-choose':''">{{element.name}}</div>
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
