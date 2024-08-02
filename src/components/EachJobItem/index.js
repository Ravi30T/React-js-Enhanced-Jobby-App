import {Link} from 'react-router-dom'

import {IoMdStar} from 'react-icons/io'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const EachJobItem = props => {
  const {jobDetails} = props

  const {
    id,
    title,
    companyLogo,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <li key={id} className="each-job-list-item">
      <Link to={`/jobs/${id}`} className="each-job-link-item">
        <div className="each-job-container">
          <div className="each-company-logo-title-container">
            <div className="each-company-logo-container">
              <img
                src={companyLogo}
                className="each-company-logo"
                alt="company logo"
              />
            </div>

            <div className="job-title-rating-container">
              <h1 className="job-title"> {title} </h1>
              <div className="each-job-rating-container">
                <IoMdStar className="ratings-star-icon" />
                <p className="each-job-rating"> {rating} </p>
              </div>
            </div>
          </div>

          <div className="each-job-location-type-package-container">
            <div className="each-job-type-location-container">
              <div className="each-job-location-container">
                <FaMapMarkerAlt className="each-job-location-icon" />
                <p className="each-job-location"> {location} </p>
              </div>

              <div className="each-job-type-container">
                <BsFillBriefcaseFill className="each-job-type-icon" />
                <p className="each-job-type"> {employmentType} </p>
              </div>
            </div>

            <div className="each-job-package-container">
              <p className="each-job-package"> {packagePerAnnum} </p>
            </div>
          </div>

          <hr />

          <div className="each-job-description-container">
            <h1 className="description-heading"> Description </h1>
            <p className="each-job-description"> {jobDescription} </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EachJobItem
