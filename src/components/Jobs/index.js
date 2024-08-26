import {Component} from 'react'

import Cookies from 'js-cookie'

import {IoIosSearch} from 'react-icons/io'

import Loader from 'react-loader-spinner'

import Headers from '../Headers'

import EachJobItem from '../EachJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const profileApiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    labelName: 'Full Time',
    employeeId: 'FULLTIME',
  },
  {
    labelName: 'Part Time',
    employeeId: 'PARTTIME',
  },
  {
    labelName: 'Internship',
    employeeId: 'INTERNSHIP',
  },
  {
    labelName: 'Freelance',
    employeeId: 'FREELANCE',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {
    location: 'Hyderabad',
    locationId: 'Hyderabad',
  },
  {
    location: 'Bangalore',
    locationId: 'Bangalore',
  },
  {
    location: 'Chennai',
    locationId: 'Chennai',
  },
  {
    location: 'Delhi',
    locationId: 'Delhi',
  },
  {
    location: 'Mumbai',
    locationId: 'Mumbai',
  },
]

class Jobs extends Component {
  state = {
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: profileApiConstants.initial,
    jobsList: [],
    profileData: [],
    searchVal: '',
    radioVal: '',
    locationVal: '',
    onToggleFullTime: false,
    onTogglePartTime: false,
    onToggleFreelance: false,
    onToggleInternship: false,
    toggledEmploymentTypeList: [],
    onTogglePackage: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  onClickProfileRetry = () => {
    this.getProfileData()
  }

  onClickJobsRetry = () => {
    this.getJobsData()
  }

  onEnterSearchInput = event => {
    this.setState({searchVal: event.target.value})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onClickSearchIcon = () => {
    this.getJobsData()
  }

  onChangePackage = event => {
    this.setState({radioVal: event.target.id}, this.getJobsData)
  }

  onChangeLocation = event => {
    this.setState({locationVal: event.target.id}, this.getJobsData)
  }

  onChangeEmployeeType = event => {
    switch (event.target.id) {
      case 'FULLTIME':
        return this.setState(
          prevState => ({
            onToggleFullTime: !prevState.onToggleFullTime,
          }),
          this.verifyToggleList,
        )

      case 'PARTTIME':
        return this.setState(
          prevState => ({
            onTogglePartTime: !prevState.onTogglePartTime,
          }),
          this.verifyToggleList,
        )

      case 'INTERNSHIP':
        return this.setState(
          prevState => ({
            onToggleInternship: !prevState.onToggleInternship,
          }),
          this.verifyToggleList,
        )

      case 'FREELANCE':
        return this.setState(
          prevState => ({
            onToggleFreelance: !prevState.onToggleFreelance,
          }),
          this.verifyToggleList,
        )

      default:
        return null
    }
  }

  /* verifyToggleList = () => {
    const {
      onToggleFullTime,
      onTogglePartTime,
      onToggleInternship,
      onToggleFreelance,
      toggledEmploymentTypeList,
    } = this.state

    if (onTogglePartTime) {
      if (toggledEmploymentTypeList.includes('PARTTIME') === false) {
        this.setState(prevState => ({
          toggledEmploymentTypeList: [
            ...prevState.toggledEmploymentTypeList,
            'PARTTIME',
          ],
        }))
      }
    } else if (onTogglePartTime === false) {
      const filteredList = toggledEmploymentTypeList.filter(
        each => each !== 'PARTTIME',
      )
      this.setState({toggledEmploymentTypeList: filteredList})
    }

    if (onToggleInternship) {
      if (toggledEmploymentTypeList.includes('INTERNSHIP') === false) {
        this.setState(prevState => ({
          toggledEmploymentTypeList: [
            ...prevState.toggledEmploymentTypeList,
            'INTERNSHIP',
          ],
        }))
      }
    } else if (onToggleInternship === false) {
      const filteredList = toggledEmploymentTypeList.filter(
        each => each !== 'INTERNSHIP',
      )
      this.setState({toggledEmploymentTypeList: filteredList})
    }

    if (onToggleFreelance) {
      if (toggledEmploymentTypeList.includes('FREELANCE') === false) {
        this.setState(prevState => ({
          toggledEmploymentTypeList: [
            ...prevState.toggledEmploymentTypeList,
            'FREELANCE',
          ],
        }))
      }
    } else if (onToggleFreelance === false) {
      const filteredList = toggledEmploymentTypeList.filter(
        each => each !== 'FREELANCE',
      )
      this.setState({toggledEmploymentTypeList: filteredList})
    }

    if (onToggleFullTime) {
      if (toggledEmploymentTypeList.includes('FULLTIME') === false) {
        this.setState(prevState => ({
          toggledEmploymentTypeList: [
            ...prevState.toggledEmploymentTypeList,
            'FULLTIME',
          ],
        }))
      }
    } else if (onToggleFullTime === false) {
      const filteredList = toggledEmploymentTypeList.filter(
        each => each !== 'FULLTIME',
      )
      this.setState({toggledEmploymentTypeList: filteredList})
    }
  } */

  verifyToggleList = () => {
    const {
      onToggleFullTime,
      onTogglePartTime,
      onToggleInternship,
      onToggleFreelance,
      toggledEmploymentTypeList,
    } = this.state

    const updateList = (type, isToggled) => {
      if (isToggled) {
        if (!toggledEmploymentTypeList.includes(type)) {
          this.setState(
            prevState => ({
              toggledEmploymentTypeList: [
                ...prevState.toggledEmploymentTypeList,
                type,
              ],
            }),
            this.getJobsData,
          )
        }
      } else {
        this.setState(
          prevState => ({
            toggledEmploymentTypeList: prevState.toggledEmploymentTypeList.filter(
              each => each !== type,
            ),
          }),
          this.getJobsData,
        )
      }
    }

    updateList('INTERNSHIP', onToggleInternship)
    updateList('FULLTIME', onToggleFullTime)
    updateList('PARTTIME', onTogglePartTime)
    updateList('FREELANCE', onToggleFreelance)
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: profileApiConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedProfileData = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileApiStatus: profileApiConstants.success,
        profileData: updatedProfileData,
      })
    } else {
      this.setState({jobsData: profileApiConstants.failure})
    }
  }

  getJobsData = async () => {
    const {radioVal, searchVal, toggledEmploymentTypeList} = this.state

    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const toggledList = toggledEmploymentTypeList.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${toggledList}&minimum_package=${radioVal}&search=${searchVal}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedJobsData = data.jobs.map(each => ({
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileApiInProgress = () => (
    <>
      <div className="profile-loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderProfileApiSuccess = () => {
    const {profileData} = this.state

    const {profileImage, name, shortBio} = profileData

    return (
      <div className="user-profile-container">
        <img src={profileImage} className="profile-img" alt="profile" />
        <h1 className="profile-name"> {name} </h1>
        <p className="profile-bio"> {shortBio} </p>
      </div>
    )
  }

  renderProfileApiFailure = () => (
    <div className="profile-retry-button-container">
      <button
        type="button"
        onClick={this.onClickProfileRetry}
        className="profile-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDataApiInProgress = () => (
    <>
      <div className="job-data-loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobDataApiSuccess = () => {
    const {jobsList, locationVal} = this.state

    let filteredJobs

    if (locationVal !== '') {
      filteredJobs = jobsList.filter(each => each.location === locationVal)
      console.log(filteredJobs)
    } else {
      filteredJobs = jobsList
    }

    const verifyVal = filteredJobs.length > 0

    return (
      <>
        {verifyVal ? (
          <div className="jobs-items-data-container">
            <ul className="each-jobs-items-data-container">
              {filteredJobs.map(eachData => (
                <EachJobItem key={eachData.id} jobDetails={eachData} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-heading"> No Jobs Found </h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobDataApiFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-image"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickJobsRetry}
        className="job-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileApiSwitchCondition = profileApiStatus => {
    switch (profileApiStatus) {
      case profileApiConstants.inProgress:
        return this.renderProfileApiInProgress()
      case profileApiConstants.success:
        return this.renderProfileApiSuccess()
      case profileApiConstants.failure:
        return this.renderProfileApiFailure()
      default:
        return null
    }
  }

  renderJobsSwitchCondition = jobsApiStatus => {
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobDataApiInProgress()
      case apiStatusConstants.success:
        return this.renderJobDataApiSuccess()
      case apiStatusConstants.failure:
        return this.renderJobDataApiFailure()
      default:
        return null
    }
  }

  render() {
    const {
      profileApiStatus,
      jobsApiStatus,
      searchVal,
      radioVal,
      locationVal,
    } = this.state

    console.log(locationVal)

    return (
      <div>
        <Headers />
        <div className="jobs-main-container">
          <div className="sidebar">
            <div className="sm-search-box-main-container">
              <div className="sm-search-box-container">
                <div>
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-box"
                    onChange={this.onEnterSearchInput}
                    value={searchVal}
                    onKeyDown={this.onClickEnter}
                  />
                </div>
                <div className="search-icon-container">
                  <button
                    type="button"
                    aria-label="search-icon"
                    data-testid="searchButton"
                    className="search-icon-btn"
                    onClick={this.onClickSearchIcon}
                  >
                    <IoIosSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg-name-filters-section-container">
              <div className="profile-container">
                {this.renderProfileApiSwitchCondition(profileApiStatus)}
              </div>
              <hr />
              <div className="employment-type-container">
                <h1 className="type-of-employment-heading">
                  Type of Employment
                </h1>
                <ul className="each-employment-type-container">
                  {employmentTypesList.map(each => (
                    <li
                      key={each.employeeId}
                      className="employee-type-list-item"
                    >
                      <input
                        type="checkbox"
                        id={each.employeeId}
                        value={each.labelName}
                        onChange={this.onChangeEmployeeType}
                        className="check-box"
                      />
                      <label
                        htmlFor={each.employeeId}
                        className="employment-type-label"
                      >
                        {each.labelName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />

              <div className="salary-range-container">
                <h1 className="type-of-salary-heading">Salary Range</h1>
                <ul className="each-salary-type-container">
                  {salaryRangesList.map(each => (
                    <li
                      key={each.salaryRangeId}
                      className="package-type-list-item"
                    >
                      <input
                        type="radio"
                        id={each.salaryRangeId}
                        value={radioVal}
                        onChange={this.onChangePackage}
                        name="package"
                        className="radio-button"
                      />
                      <label
                        htmlFor={each.packageID}
                        className="salary-type-label"
                      >
                        {each.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <hr />

              <div className="location-range-container">
                <h1 className="select-location-heading">Select location</h1>
                <ul className="each-salary-type-container">
                  {locationList.map(each => (
                    <li
                      key={each.locationId}
                      className="package-type-list-item"
                    >
                      <input
                        type="radio"
                        id={each.locationId}
                        value={locationVal}
                        onChange={this.onChangeLocation}
                        name="location"
                        className="radio-button"
                      />
                      <label
                        htmlFor={each.locationId}
                        className="salary-type-label"
                      >
                        {each.location}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg-search-jobs-data-container">
            <div className="lg-search-box-container">
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search-box"
                  onChange={this.onEnterSearchInput}
                  value={searchVal}
                  onKeyDown={this.onClickEnter}
                />
              </div>
              <div className="search-icon-container">
                <button
                  type="button"
                  aria-label="search-icon"
                  data-testid="searchButton"
                  className="search-icon-btn"
                  onClick={this.onClickSearchIcon}
                >
                  <IoIosSearch className="search-icon" />
                </button>
              </div>
            </div>

            <div className="jobs-items-container">
              {this.renderJobsSwitchCondition(jobsApiStatus)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
