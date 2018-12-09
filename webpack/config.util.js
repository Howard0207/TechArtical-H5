const path = require('path');
const glob = require('glob');
module.exports = {
    // 归类所有入口文件
    getEntrys: function (globPath) {
        var files = glob.sync(globPath);
        var entries = {
            js: {},
            pages: {},
            resource: {},
            css: {}
        },
            entry, dirname, basename, pathname, extname;
        for (var i = 0; i < files.length; i++) {
            entry = files[i];
            dirname = path.dirname(entry);
            extname = path.extname(entry);
            basename = path.basename(entry, extname);
            var split = dirname.split('/');
            pathname = path.join(split.slice(2, split.length).join("/"), basename + extname);
            if (extname === '.js' && basename === 'index') {
                entries.js[pathname] = "./" + entry;
            } else if (extname === '.less') {
                entries.css[pathname.replace('.less', '')] = "./" + entry;
            } else if (extname === '.html') {
                entries.pages[pathname] = "./" + entry;
            } else {
                entries.resource[pathname] = "./" + entry;
            }
        }
        return entries;
    },
    //获取公共JS文件
    getCommonJSPath: function(isDev){
        // const fileList = ["../libs/compatible/console-polyfill.js","../libs/compatible/es5-shim.min.js","../libs/compatible/es5-sham.min.js"]
        const fileList = [];
        return fileList.concat(isDev ? ["/assets/libs/utils.js", "/assets/libs/ajax.js","/assets/libs/flexible.js"] :
            [ "../assets/libs/utils.js", "../assets/libs/ajax.min.js"]
        )
    },
    //获取公共Css文件
    getCommonCssPath: function(isDev){
        // const fileList = ["../libs/compatible/console-polyfill.js","../libs/compatible/es5-shim.min.js","../libs/compatible/es5-sham.min.js"]
        const fileList = [];
        return fileList.concat(isDev ?['/assets/fonts/iconfont.css','/assets/css/config.css','/assets/css/components.css','/assets/css/pages.css'] : 
            ['../assets/fonts/iconfont.css','../assets/css/config.min.css','../assets/css/components.min.css','../assets/css/pages.min.css']
        )
    },
    getCssRemOption:function(){
        return {
            dpr: 2,
            rem: 75,
            exclude: ['background-size']
        }
    }
}