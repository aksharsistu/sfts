import React from 'react'
import './Styles/home.css'
import Start from "./Homepages/Start";
import End from "./Homepages/End";
import QA from "./Homepages/QA";
import Rework from "./Homepages/Rework";

/** Home page containing instructions by default and redirects to Start/End/QA/Rework components when
 * @param process is specified in App.js in the Browser Routes
 * @returns {JSX.Element}
 */
const Home = ({process}) => {
  if (process === 'start') {
    return <Start/>
  }
  if (process === 'end') {
    return <End/>
  }
  if (process === 'qa') {
    return <QA/>
  }
  if (process === 'rework') {
    return <Rework/>
  }

  return <div className='instructions'>
    <h3>Instructions:</h3>
  </div>
}

export default Home