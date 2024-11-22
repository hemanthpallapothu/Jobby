import './index.css'

const Skills = props => {
  const {eachSkills} = props
  console.log(eachSkills)
  const {imageUrl, description} = eachSkills
  return <img src={imageUrl} />
}

export default Skills
