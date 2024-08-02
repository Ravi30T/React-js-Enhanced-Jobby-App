import {Component} from 'react'

import Cookies from 'js-cookie'

import {IoMdStar} from 'react-icons/io'

import {FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import SimilarJobs from '../SimilarJobs'

import Headers from '../Headers'

import './index.css'

const jobDetailsConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsStatus: jobDetailsConstants.initial,
    jobDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onClickRetryJobDetails = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: jobDetailsConstants.inProgress})
    const {match} = this.props

    const {params} = match

    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedJobData = {
        companyLogo: data.job_details.company_logo_url,
        companyWebsite: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        title: data.job_details.title,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          image: each.image_url,
        })),

        lifeAtCompany: {
          lifeAtCompanyDescription:
            data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }

      const similarJobsData = data.similar_jobs.map(each => ({
        id: each.id,
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: updatedJobData,
        similarJobs: similarJobsData,
        jobDetailsStatus: jobDetailsConstants.success,
      })
    } else {
      this.setState({
        jobDetailsStatus: jobDetailsConstants.failure,
      })
    }
  }

  renderJobDetailsInProgress = () => (
    <div className="job-details-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccess = () => {
    const {jobDetails, similarJobs} = this.state

    const {
      companyLogo,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsite,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails

    const {lifeAtCompanyDescription, imageUrl} = lifeAtCompany

    return (
      <div>
        <div className="job-details-container">
          <div className="company-details-logo-title-container">
            <div className="company-details-logo-container">
              <img
                src={companyLogo}
                className="company-details-logo"
                alt="job details company logo"
              />
            </div>

            <div className="job-details-title-rating-container">
              <h1 className="job-details-title"> {title} </h1>
              <div className="job-details-rating-container">
                <IoMdStar className="job-details-ratings-star-icon" />
                <p className="job-details-rating"> {rating} </p>
              </div>
            </div>
          </div>

          <div className="job-details-location-type-package-container">
            <div className="job-details-type-location-container">
              <div className="job-details-location-container">
                <FaMapMarkerAlt className="job-details-location-icon" />
                <p className="job-details-location"> {location} </p>
              </div>

              <div className="job-details-type-container">
                <BsFillBriefcaseFill className="job-details-type-icon" />
                <p className="job-details-type"> {employmentType} </p>
              </div>
            </div>

            <div className="job-details-package-container">
              <p className="job-details-package"> {packagePerAnnum} </p>
            </div>
          </div>

          <hr />

          <div>
            <div className="job-details-description-company-website-container">
              <h1 className="job-details-description-heading"> Description </h1>
              <div className="job-details-company-website-container">
                <a
                  href={companyWebsite}
                  target="_blank"
                  className="job-details-company-website-link"
                  rel="noreferrer"
                >
                  Visit <FaExternalLinkAlt className="job-details-link-icon" />
                </a>
              </div>
            </div>

            <p className="job-details-description"> {jobDescription} </p>

            <div className="job-details-skills">
              <h1 className="skills-heading"> Skills </h1>
              <ul className="job-details-skills-container">
                {skills.map(each => (
                  <li key={each.name} className="each-skill-container">
                    <img
                      src={each.image}
                      className="each-skill-image"
                      alt={each.name}
                    />
                    <p className="each-skill-name"> {each.name} </p>
                  </li>
                ))}
              </ul>
            </div>

            <>
              <h1 className="life-at-company-heading"> Life at Company </h1>
              <div className="life-at-company-container">
                <div className="life-at-company-description-container">
                  <p className="life-at-company-description">
                    {' '}
                    {lifeAtCompanyDescription}{' '}
                  </p>
                </div>

                <img src={imageUrl} className="life-at-company-img" />
              </div>
            </>
          </div>
        </div>

        <>
          <h1 className="similar-jobs-heading"> Similar Jobs </h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} similarJobDetails={each} />
            ))}
          </ul>
        </>
      </div>
    )
  }

  renderJobDetailsFailure = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
      />
      <h1 className="job-details-failure-heading">
        {' '}
        Oops! Something Went Wrong{' '}
      </h1>
      <p className="job-details-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickRetryJobDetails}
        className="job-details-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsSwitchCondition = jobDetailsStatus => {
    switch (jobDetailsStatus) {
      case jobDetailsConstants.inProgress:
        return this.renderJobDetailsInProgress()
      case jobDetailsConstants.success:
        return this.renderJobDetailsSuccess()
      case jobDetailsConstants.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    const {jobDetailsStatus} = this.state
    return (
      <>
        <Headers />
        <div className="job-details-bg-container">
          <div>{this.renderJobDetailsSwitchCondition(jobDetailsStatus)}</div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
