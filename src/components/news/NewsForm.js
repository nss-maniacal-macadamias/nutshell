import React, { Component } from "react";


export default class NewsForm extends Component {
  // Set initial state
  state = {
    news: "",
    newsSynopsis: "",
    newsURL: "",
    userId: "",
    date: "",
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewArticle = evt => {
    evt.preventDefault();
      const article = {
        news: this.state.news,
        newsSynopsis: this.state.newsSynopsis,
        newsURL:"http://"+this.state.newsURL,
        date: Date.now(),
        userId: Number(sessionStorage.getItem("credentials"))
      };

      // Create the animal and redirect user to animal list
      this.props
        .addArticle(article)
        .then(() => this.props.history.push("/articles"));

  };

  render() {
    return (
      <React.Fragment>
        <form className="articleForm">
          <div className="form-group">
            <label htmlFor="news">Article Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="news"
              placeholder="Article Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newsSynopsis">Article  Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="newsSynopsis"
              placeholder="News Synopsis"
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
              placeholder="articleURL"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewArticle}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}