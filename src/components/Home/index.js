import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg-container">
      <h1 className="home-page-title">Find The Job That Fits Your Life</h1>
      <p className="home-page-text">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button type="button" className="home-find-jobs-btn">
        Find Jobs
      </button>
    </div>
  </>
)

export default Home
