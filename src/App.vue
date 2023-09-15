<template>
  <!-- <el-config-provider :locale="locale"> -->
    <router-view />
  <!-- </el-config-provider> -->
</template>
<script>
import { defineComponent } from 'vue';
// import { ElConfigProvider } from 'element-plus';
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default defineComponent({
    // components: {
    //   ElConfigProvider
    // },
    setup() {
        // 全局修改样式
        document.body.style.setProperty('--el-text-color-regular', '#1D2129');
        document.body.style.setProperty('--el-color-primary', '#165dff');
        document.body.style.setProperty('--el-color-primary-light-3', '#4c82fd');
        document.body.style.setProperty('--el-color-primary-dark-2', '#094de9');
        document.body.style.setProperty('--el-menu-item-height', '50px');
        return {
            // locale: zhCn
        };
    }
});
</script>
<style>
#app {
    font: 14px/1.5 Helvetica Neue, Helvetica, Arial, Microsoft Yahei,
    Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100%;
    height: 100%;
}
html,
body,
#app {
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
