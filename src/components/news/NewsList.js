import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./news.css"


export default class NewsList extends Component {
    render() {
        const friends = this.props.friendships.filter(friendship => friendship.userId === Number(sessionStorage.getItem("credentials")))
        .map(friendship => friendship.friend)
        return (
            <section className="news">
                {this.props.articles.filter(article => article.userId === Number(sessionStorage.getItem("credentials")) ||
                friends.includes(article.userId))
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
                            { (article.userId === Number(sessionStorage.getItem("credentials"))) ? <div> 
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
                                </div> : ""}
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