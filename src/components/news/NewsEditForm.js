import React, { Component } from "react"
import ArticleManager from '../../modules/resourceManagers/ArticleManager'

export default class NewsEditForm extends Component {
    // Set initial state
    state = {
        newsURL: "",
        news: "",
        newsSynopsis: "",
        date: "",
        userId: ""

    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingArticle = evt => {
      evt.preventDefault()

      if (this.state.newsURL === null && this.state.news === null && this.state.newsSynopsis === null) {
        window.alert("Please fill out all fields!");
      } else {
        const editedArticle = {
          id: this.props.match.params.articleId,
          newsURL: this.state.newsURL,
          newsSynopsis: this.state.newsSynopsis,
          news: this.state.news,
          date: this.state.date,
          userId: Number(sessionStorage.getItem("credentials"))
        };

    this.props.updateArticle(editedArticle)
    .then(() => this.props.history.push("/articles"))
    }
  }

    componentDidMount() {
      ArticleManager.GET(this.props.match.params.articleId)
      .then(article => {
        this.setState({
          newsURL: article.newsURL,
          news: article.news,
          newsSynopsis: article.newsSynopsis,
          date: article.date
        });
      });
    }


    render() {
      return (
        <React.Fragment>

          <form className="ArticleForm">
            <div className="form-group">
            <input type="hidden" id="date" value="date"></input>
              <label htmlFor="news">Article Title</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="news"
                value = {this.state.news}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newsSynopsis">Article Synopsis</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="newsSynopsis"
                value = {this.state.newsSynopsis}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newsURL">Article URL</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="newsURL"
                value = {this.state.newsURL}
              />
            </div>
            <button
              type="submit"
              onClick={this.updateExistingArticle}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </React.Fragment>
      );
    }
}