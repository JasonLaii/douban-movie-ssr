const fs = require('fs')
const express = require('express')
const path = require('path')
const server = express()
const resolve = file => path.resolve(__dirname,file)

const { createBundleRenderer } =require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')


const renderer = createBundleRenderer(bundle,{
  runInNewContext: false,
  template: fs.readFileSync(resolve('./src/index.template.html'),'utf-8'),
  clientManifest: clientManifest
})



server.get("*", (req, res) => {

  if(!renderer){
    return res.end('waiting for compilation...refresh in a moment.')
  }

  res.setHeader("Content-Type","text/html")
  

  const context = {
    title: ' ',
    url: req.url
  }

  const handleError = err => {
    if (err.code === 404) {
      res.status(404).end("Page not found");
    } else {
      res.status(500).end("Internal server error");
      console.error(`error during render : ${req.url}`);
      console.error(err);
    }
  }

  switch (req.url){
    case '/released':
      context.title = '正在热映'
      break;
    case '/':
      context.title = '正在热映'
      break;
    case '/readyToRelease':
      context.title= '即将上映'
      break;
    case '/top250':
      context.title = "Top250";
      break;
    default:
      context.title = "404";
  }


  renderer.renderToString(context,(err,html)=>{
    if(err){
      return handleError(err)
    }
    res.send(html)
  });


});


let port = 3000
server.listen(port, () => {
  console.log(`server running at ${port}`)
});

