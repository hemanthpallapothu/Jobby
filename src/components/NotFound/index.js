import './index.css'

const NotFound = () => (
  <div className="not-found-view">
    <img
      alt="not found"
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-paragraph">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
