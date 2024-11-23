import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMailOpen} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    updatedJobDetails: '',
    similarJobs: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getCamelCasedData = data => {
    const jobDetails = data.job_details

    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      rating: jobDetails.rating,
      title: jobDetails.title,
      packagePerAnnum: jobDetails.package_per_annum,
      skills: jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
    }

    const similarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    return {updatedJobDetails, similarJobs}
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()

      const {updatedJobDetails, similarJobs} = this.getCamelCasedData(data)

      this.setState({
        apiStatus: apiStatusConstants.success,
        updatedJobDetails,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {updatedJobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = updatedJobDetails
    console.log(similarJobs)
    return (
      <div className="job-details-bg-container">
        <div className="job-details-card-container">
          <div className="job-details-card-container-alinement">
            <img
              alt="job details company logo"
              src={companyLogoUrl}
              className="job-details-company-logo"
            />
            <div>
              <h1 className="job-details-title">{title}</h1>
              <div className="job-details-review-container-alinement">
                <AiFillStar className="job-details-review-icon" />
                <p className="job-details-review ">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-alinement-1 ">
            <div className="job-details-alinement-2">
              <div className="job-details-alinement">
                <HiLocationMarker className="icon" />
                <p className="icon-text">{location}</p>
              </div>
              <div className="job-details-alinement">
                <HiMailOpen className="icon" />
                <p className="icon-text">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="icon-text ">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="description-heading-vist-btn-alinment ">
            <h1 className="description-heading">Description</h1>
            <a className="visit-button" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal />
            </a>
          </div>

          <p className="description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <SkillsCard key={eachSkill.name} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <ul className="life-at-company-container ">
            <p className="life-at-company-text">{lifeAtCompany.description}</p>
            <img alt="life at company" src={lifeAtCompany.imageUrl} />
          </ul>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderInprogressView = () => (
    <div className="job-details-inporgress-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="job-details-failure-view-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-view-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-failure-view-retry"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInprogressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobDetails
