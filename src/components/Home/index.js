import {Link} from 'react-router-dom'

import Headers from '../Headers'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div>
      <Headers />
      <div className="home-container">
        <h1 className="home-main-heading">Find The Job That Fits Your Life</h1>
        <div className="home-description-container">
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potentail.
          </p>
        </div>
        <Link to="/jobs" className="btn-link-type">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
