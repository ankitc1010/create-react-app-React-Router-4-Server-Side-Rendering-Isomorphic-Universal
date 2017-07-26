import express from 'express'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import spdy from 'spdy'
import { StaticRouter as Router } from 'react-router-dom'
import React from 'react'
import { renderToString } from 'react-dom/server'
import sourceMapSupport from 'source-map-support'
import Helmet from 'react-helmet'
import compression from 'compression'
sourceMapSupport.install()


// import About from '../src/components/About'
// import Home from '../src/components/Home'
// import NotFound from '../src/components/NotFound'
import App from '../App'
// import render from './render'
const PORT = process.env.PORT || 9000
const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html')
const options = {
  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
}

var app = express()

app.use(compression())
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use('/static', express.static(path.join(__dirname, '..', '..', 'build', 'static')))

app.get('*', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.log('err', err)
      res.status(404).send('literal Error')
    } else {
      const ReactApp = renderToString((
        <Router context={{}} location={req.url}>
          <App />
        </Router>))
          const head = Helmet.renderStatic()
      const BodyReplace = htmlData.replace('{{SSR}}', ReactApp)
      const TitleReplace = BodyReplace.replace('{{TITLE}}', head.title.toString())
      const FinalRenderedApp = TitleReplace.replace('{{META}}', head.meta.toString())
      res.status(200).send(FinalRenderedApp)
    }
  })
})

spdy
  .createServer(options, app)
  .listen(PORT, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + PORT + '.')
    }
  })
