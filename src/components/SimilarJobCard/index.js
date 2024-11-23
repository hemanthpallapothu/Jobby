import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker, HiMailOpen} from 'react-icons/hi'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-bg-container">
      <div className="company-logo-container-alinement">
        <img
          alt="similar job company logo"
          className="similar-job-company-logo"
          src={companyLogoUrl}
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-alinement">
            <AiFillStar className="similar-job-star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description-paragraph">{jobDescription}</p>
      <div className="location-employement-type-alinement">
        <div className="location-container-alinement ">
          <HiLocationMarker className="location-color" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="location-container-alinement ">
          <HiMailOpen className="location-color" />
          <p className="similar-job-location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
