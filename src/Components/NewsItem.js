import React from "react";

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date, source } = props;


    return (
        <>
            <div className="card my-3" style={{ width: '18rem' }}>
                <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '0%', zIndex: '1' }}>
                    {source}
                </span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </>
    )

}

export default NewsItem;