import './index.css'

const TypeOfEmployment = props => {
  const {eachLabel, onChangeEmploymentType} = props
  const {employmentTypeId, label} = eachLabel
  return (
    <li className="employability-container ">
      <input
        type="checkbox"
        id={employmentTypeId}
        value={employmentTypeId}
        onChange={onChangeEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="employability-label">
        {label}
      </label>
    </li>
  )
}
export default TypeOfEmployment
