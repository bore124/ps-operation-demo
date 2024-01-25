<script>

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {defineComponent} from "vue";
import {useLongTokenSet} from "@/utils/system.js";



export default defineComponent({
    methods: {},
    data() {
        return {
            locale: zhCN,
        }
    },
    beforeCreate() {
        dayjs.locale('zh-cn');
        useLongTokenSet()
    },
    mounted() {

    }

})

</script>

<template>
    <a-config-provider
    >
        <a-config-provider :locale="locale">
            <a-spin :delay="500" tip="加载中" :spinning="false" >
                <div class="full-screen">
                    <router-view>
                    </router-view>
                </div>

            </a-spin>

        </a-config-provider>
    </a-config-provider>
</template>

<style scoped>
.full-screen{
    width: 100%;
    height: 100vh;
}
</style>
<style>

</style>
