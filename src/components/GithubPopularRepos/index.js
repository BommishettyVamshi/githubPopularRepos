import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeOptionId: languageFiltersData[0].id,
    githubPopularReposList: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeOptionId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeOptionId}`

    const response = await fetch(url)
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
    })
  }

  changeLanguage = languageId => {
    this.setState(
      {
        activeOptionId: languageId,
      },
      this.getPopularRepos,
    )
  }

  render() {
    const {activeOptionId, githubPopularReposList} = this.state
    console.log(activeOptionId, githubPopularReposList)
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
      </div>
    )
  }
}

export default GithubPopularRepos
