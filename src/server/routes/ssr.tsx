import express from 'express'
import Registration from '../../pages/registrationForm'
import React from 'react'
import { renderToString } from 'react-dom/server'
import hbs from 'handlebars'

const ssrRoutes = express.Router()

const theHtml = `
  <html>
  <head><title>My First SSR</title></head>
  <body>
  <h1>My First Server Side Render</h1>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `

ssrRoutes.get('/', async (_req, res) => {
  const hbsTemplate = hbs.compile(theHtml)
  const reactComp = renderToString(<Registration />)
  const htmlToSend = hbsTemplate({ reactele: reactComp })
  res.send(htmlToSend)
})

export default ssrRoutes
