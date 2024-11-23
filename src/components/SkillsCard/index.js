import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="skill-card-container">
      <img className="skills-image" alt={name} src={imageUrl} />
      <p className="skills-name">{name}</p>
    </li>
  )
}

export default SkillCard
