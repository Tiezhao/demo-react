//用中间代理解决跨域问题
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/devApi", {
      //当匹配到/devApi时,开始代理http://www.web-jshtml.cn/api/react（访问到这个地址）
      target: "http://www.web-jshtml.cn/api/react", //配置你要请求的服务器地址
      changeOrigin: true,
      pathRewrite: {
        "/devApi": "", //将/devApi重新设置成空 ,即最终代理的地址为http://www.web-jshtml.cn/api/react/login
      },
    })
  );
  // app.use(
  //   proxy("/manage/api", {
  //     target: "http://admintest.happymmall.com:7000", //配置你要请求的服务器地址
  //     changeOrigin: true,
  //   })
  // );
};
