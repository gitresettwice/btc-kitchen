const {init} = require('xpresser');

const $ = init({
  name: "Test Server",
  env: 'development',
  port: 3010,
  
  paths: {base: __dirname, jsonConfigs: 'base://'},
});

$.on.boot((afterBoot) => {
  
  $.on.serverBooted((afterServerBoot) => {
    console.log($.store.data);
    
    return afterServerBoot();
  });
  
  return afterBoot();
});

$.boot();