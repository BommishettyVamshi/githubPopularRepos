import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepoistoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeOptionId: languageFiltersData[0].id,
    githubPopularReposList: [],
    status: apiStatusConstants.loading,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeOptionId} = this.state

    // setting the status to loading to appear the loader when filtering the language
    this.setState({
      status: apiStatusConstants.loading,
    })

    try {
      const url = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`

      // obtaing the response from server to the url (get method)
      const response = await fetch(url)

      // checking and handling response (for the erros like : bad url, server side errors etc)
      if (!response.ok) {
        this.setState({
          status: apiStatusConstants.failure,
        })
        return
      }
      const data = await response.json()
      const formattedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        githubPopularReposList: formattedData,
        status: apiStatusConstants.success,
      })
    } catch (error) {
      // checking and handling the errors like(internet error, DNS error, CORS errors etc.)
      this.setState({
        status: apiStatusConstants.failure,
      })
    }
  }

  changeLanguage = languageId => {
    this.setState(
      {
        activeOptionId: languageId,
      },
      this.getPopularRepos,
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-card">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccess = () => {
    const {githubPopularReposList} = this.state
    return (
      <ul className="repos-list-container">
        {githubPopularReposList.map(eachRepo => (
          <RepoistoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </>
  )

  renderPopularGitRepos = () => {
    const {activeOptionId, status} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="language-filter-list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageFilterDetails={each}
              changeLanguage={this.changeLanguage}
              isActiveLanguage={each.id === activeOptionId}
              key={each.id}
            />
          ))}
        </ul>
        {status === apiStatusConstants.loading && this.renderLoader()}
        {status === apiStatusConstants.success && this.renderSuccess()}
        {status === apiStatusConstants.failure && this.renderFailure()}
      </div>
    )
  }

  render() {
    return this.renderPopularGitRepos()
  }
}

export default GithubPopularRepos
