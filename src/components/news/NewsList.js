import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./news.css"


export default class NewsList extends Component {
     addclass = (article) => article.userId === parseInt(sessionStorage.getItem("credentials"))
            ? "card" : "card green "

    render() {
        const friends = this.props.friendships.filter(friendship => friendship.userId === Number(sessionStorage.getItem("credentials")))
        .map(friendship => friendship.friend)
        return (

            <section className="news">
               <div className="d-flex widthControl">
              <button type="button"
                    className="btn btn-success justify-content-center"
                    onClick={() => {
                        this.props.history.push("/articles/new")
                    }
                }>
                    Add Article
                    </button>
                    </div>
                <div className="row articlesContainer">
                {this.props.articles.filter(article => article.userId === Number(sessionStorage.getItem("credentials")) ||
                friends.includes(article.userId))
                .sort((a,b) => b.date - a.date )
                    .map(article =>
                        <div key={article.id} className={this.addclass(article)}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {article.news}
                                    <br></br>
                                </h5>
                                <div> Synopsis: {article.newsSynopsis}</div>
                                <div> URL: {article.newsURL}</div>
                            </div>
                            <div className="p-3 d-flex justify-content-center">
                            { (article.userId === Number(sessionStorage.getItem("credentials"))) ? <div> 
                                <button
                                type="button"
                                className="btn btn-success mr-1"
                                onClick={() => {
                                    this.props.history.push(`/articles/${article.id}/edit`);
                                }}>
                                Edit</button>
                            <button
                                onClick={() => this.props.deleteArticle(article.id)}
                                className="btn btn-danger">Delete</button>
                                </div> : ""}
                                </div>
                        </div>
                    )

                }
            </div>
            </section>
        )
    }
}