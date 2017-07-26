import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default () => (
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>About Page</title>
    </Helmet>
    <h1>Hello About</h1>
    <Link to='/'>Home</Link>
  </div>
)
