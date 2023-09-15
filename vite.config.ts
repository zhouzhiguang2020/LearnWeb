import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import requireTransform from 'vite-plugin-require-transform';
import path from "path"
import compressDist, {CompressOptions} from 'rollup-plugin-compress-dist';

const compressOpts: CompressOptions<'zip'> = {
    type: 'zip',
    archiverName: 'electronicscale-web.zip',
    sourceName: 'electronicscale-web'
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),

        vueJsx(),
        // ZipPlugin(),
        requireTransform({
            fileRegex: /.ts$|.tsx$|.vue$/
        }),
        compressDist(compressOpts)
        // AutoImport({
        //   resolvers: [ElementPlusResolver()]
        // }),
        // Components({r
        //   resolvers: [ElementPlusResolver()]
        // })
    ],
    resolve: {
        alias: {
            // Vite路径别名配置
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api': {
                // target: 'http://192.168.31.100:8001', //开发
                // target: 'http://192.168.31.100:8001', //开发
                //target: 'http://yn2022.work:71/api/', //测试环境
                // target: 'http://yn2022.work:92/', //外网开发环境
                ws: true,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        target: 'modules', //设置最终构建的浏览器兼容目标  //es2015(编译成es5) | modules
        outDir: 'dist', // 构建得包名  默认：dist
        assetsDir: 'assets', // 静态资源得存放路径文件名  assets
        sourcemap: false, //构建后是否生成 source map 文件
        minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
        chunkSizeWarningLimit: 1000, //chunk 大小警告的限制（以 kbs 为单位）默认：500
        cssTarget: 'chrome61' //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式

    }
});
