module.exports = {
  baseUrl: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1/znyw3.0/PHP/public/index.php/index/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}