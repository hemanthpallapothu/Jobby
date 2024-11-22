import {Component} from 'react'
import {IoSearchOutline} from 'react-icons/io5'

import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import TypeOfEmployment from '../TypeOfEmployment'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
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

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchJob: '',
    searchedJob: '',
    jobsList: [],
  }

  componentDidMount() {
    this.onGetJobs()
  }

  onChangeEmploymentType = event => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, event.target.value],
      }),
      this.onGetJobs,
    )
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.onGetJobs)
  }

  onSearchJob = event => {
    this.setState({searchJob: event.target.value}, this.onGetJobs)
  }

  onClickSearchButton = () => {
    const {searchJob} = this.state
    this.setState({searchedJob: searchJob}, this.onGetJobs)
  }

  onGetJobs = async () => {
    const {employmentType, salaryRange, searchedJob} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchedJob}
`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const formattedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {jobsList} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="filter-container">
            <ProfileDetails />
            <hr />
            <h1 className="employment-title">Type of Employment</h1>
            <ul className="employment-type-list">
              {employmentTypesList.map(eachItem => (
                <TypeOfEmployment
                  key={eachItem.employmentTypeId}
                  eachLabel={eachItem}
                  onChangeEmploymentType={this.onChangeEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h1 className="employment-title">Salary Range</h1>
            <ul className="employment-type-list">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  key={eachItem.salaryRangeId}
                  eachLabel={eachItem}
                  onChangeSalaryRange={this.onChangeSalaryRange}
                />
              ))}
            </ul>
          </div>
          <ul className="jobs-container">
            <div className="search-bar-alinement">
              <input
                type="search"
                className="search-bar"
                placeholder="Search"
                onChange={this.onSearchJob}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <IoSearchOutline className="search-icon" />
              </button>
            </div>

            {jobsList.map(eachItem => (
              <JobCard key={eachItem.id} jobDetails={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Jobs
