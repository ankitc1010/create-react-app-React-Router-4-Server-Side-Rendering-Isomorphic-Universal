import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default () => (
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Home Page</title>
    </Helmet>
    <h1>Home Route</h1>
    <Link to='/about'>About</Link>
  </div>
)
