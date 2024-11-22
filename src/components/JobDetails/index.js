import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMailOpen} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import Skills from '../Skills'
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

  render() {
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
    } = updatedJobDetails
    console.log(skills)

    return (
      <div>
        <Header />
        <div className="job-details-bg-container">
          <div className="job-details-card-container">
            <div className="job-details-card-container-alinement">
              <img
                alt=""
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

            <h1 className="description-heading">Description</h1>
            <a className="visit-button" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal />
            </a>
            <p className="description">{jobDescription}</p>
            <h1 className="life-at-company-heading">Life At Company</h1>
            <ul>
              {Skills.map(eachItem => (
                <Skills eachSkills={eachItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default JobDetails
