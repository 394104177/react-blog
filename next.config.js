const path = require("path")
module.exports = (phase, defaultConfig) => {
    console.log("phase",phase)
    console.log("defaultConfig",defaultConfig)
    return {
      /* config options here */
      ...defaultConfig,
      env: {
        customKey: 'my-value',
      },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
        console.log("config",config)
        console.log("buildId",buildId)
        console.log("dev",dev)
        console.log("isServer",isServer)
        console.log("defaultLoaders",defaultLoaders)
        console.log("webpack",webpack)
      
        // Important: return the modified config
        return {...config,devServer: {
            contentBase: path.join(__dirname, 'dists'),
            compress: true,
            port: 9000,
          }}
      },
    }
  }