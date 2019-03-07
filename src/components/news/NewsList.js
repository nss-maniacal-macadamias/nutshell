import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./news.css"


export default class NewsList extends Component {
    render() {
        return (
            <section className="news">
                {this.props.articles.filter(article => article.userId === Number(sessionStorage.getItem("credentials")))
                .sort((a,b) => b.date - a.date )
                    .map(article =>
                        <div key={article.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {article.news}
                                    <br></br>
                                </h5>
                                <div> Synopsis: {article.newsSynopsis}</div>
                                <div> URL: {article.newsURL}</div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/articles/${article.id}/edit`);
                                }}>
                                Edit</button>
                            <button
                                onClick={() => this.props.deleteArticle(article.id)}
                                className="card-link">Delete</button>
                        </div>
                    )

                }
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/articles/new")
                    }
                    }>
                    Add Article
                    </button>
            </section>
        )
    }
}