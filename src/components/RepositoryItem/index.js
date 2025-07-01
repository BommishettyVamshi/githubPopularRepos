// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="description-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="description-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="description-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon"
          alt="open issues"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
