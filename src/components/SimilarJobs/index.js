import {Link} from 'react-router-dom'

import {IoMdStar} from 'react-icons/io'

import {FaMapMarkerAlt} from 'react-icons/fa'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props

  const {
    id,
    companyLogo,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li key={id} className="list-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div>
          <div className="similar-company-details-logo-title-container">
            <div className="similar-company-details-logo-container">
              <img
                src={companyLogo}
                className="similar-company-details-logo"
                alt="similar job company logo"
              />
            </div>

            <div className="similar-job-details-title-rating-container">
              <h1 className="similar-job-details-title"> {title} </h1>
              <div className="similar-job-details-rating-container">
                <IoMdStar className="similar-job-details-ratings-star-icon" />
                <p className="similar-job-details-rating"> {rating} </p>
              </div>
            </div>
          </div>

          <h1 className="similar-job-description-heading"> Description </h1>

          <p className="similar-job-description"> {jobDescription} </p>

          <div className="similar-job-type-location-container">
            <div className="similar-job-location-container">
              <FaMapMarkerAlt className="similar-job-location-icon" />
              <p className="similar-job-location"> {location} </p>
            </div>

            <div className="similar-job-type-container">
              <BsFillBriefcaseFill className="similar-job-type-icon" />
              <p className="similar-job-employment-type"> {employmentType} </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobs
