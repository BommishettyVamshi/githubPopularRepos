// Write your code here
import './index.css'

const LanguageFilterItem = porps => {
  const {languageFilterDetails, changeLanguage, isActiveLanguage} = porps
  const {id, language} = languageFilterDetails
  const activeClassName = isActiveLanguage ? 'activeid' : ''

  const onclickHandler = () => {
    changeLanguage(id)
  }

  return (
    <li className="language-item">
      <button
        type="button"
        className={`language-button ${activeClassName}`}
        onClick={onclickHandler}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
