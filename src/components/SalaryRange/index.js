import './index.css'

const SalaryRange = props => {
  const {eachLabel, onChangeSalaryRange} = props
  const {salaryRangeId, label} = eachLabel

  return (
    <li className="salary-range-container">
      <input
        type="radio"
        id={salaryRangeId}
        name="SalaryRange"
        value={salaryRangeId}
        onChange={onChangeSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="salary-range-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
