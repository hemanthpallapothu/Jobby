import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMailOpen} from 'react-icons/hi'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li>
        <div className="job-card-container">
          <div className="title-review-container-alinement">
            <img
              alt={title}
              src={companyLogoUrl}
              className="company-logo-image"
            />
            <div className="title-review-alinement">
              <h1 className="title">{title}</h1>
              <div className="review-container-alinement ">
                <AiFillStar className="star-icon" />
                <p className="review">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container ">
            <div className="employment-type-location-alinement ">
              <div className="location-container-alinement">
                <HiLocationMarker className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-container-alinement">
                <HiMailOpen className="employment-type-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package-per-annum">{packagePerAnnum}</p>
          </div>

          <hr />
          <h1 className="description">Descrption</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
