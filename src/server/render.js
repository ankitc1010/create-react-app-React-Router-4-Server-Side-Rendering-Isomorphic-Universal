import { renderToString } from 'react-dom/server'
import fs from 'fs'
import path from 'path'
const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

export default (renderMe) => fs.readFile(filePath, 'utf8', (err, htmlData) => {
  if (err) {
    console.log('err', err)
    return 'literal Error'
  } else {
    const ReactApp = renderToString(renderMe)
    const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
    return RenderedApp
  }
})
