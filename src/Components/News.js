import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import { useEffect } from "react/cjs/react.production.min";

const News = (props) => {
    
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
    // const { country, category, pageSize } = props    
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews = async () => {
        
        props.setProgress(10);
        
        const { country, category, pageSize, apiKey , setProgress } = props
        
        // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        
        setLoading(true);
        
        let data = await fetch(url);
        setProgress(30);
        let parsedData = await data.json();
        setProgress(70);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        
        props.setProgress(100);
    }
    
    const handleNextPage = async () => {
        setPage(page + 1);
        updateNews();
    }
    
    const handlePrevPage = async () => {
        setPage(page - 1);
        updateNews();
    }
    

    
    useEffect(()=> {
        document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`;
        updateNews();
    },[] )


    const fetchMoreData = async () => {


        const { country, category, pageSize, apiKey } = props
        
        // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
        setPage(page + 1);

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)

    };

return (
    <>


        <div className="container my-3">

            <h2 className="text-center" style={{margin:'75px 0px '}}>
                NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
            </h2>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                // loader={'loading...'}
                loader={<Spinner />}
            >

                <div className="conatainer">

                    <div className="row my-3">

                        {articles.map((element) => {

                            return (
                                <div className="col md-4">
                                    <NewsItem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 85) : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            )
                        })}

                    </div>
                </div>

            </InfiniteScroll>

            <div className="container my-3 d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePrevPage}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextPage}>Next&rarr;</button>
            </div>

        </div>

    </>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
}

export default News;