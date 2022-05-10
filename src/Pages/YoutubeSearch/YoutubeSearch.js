
import axios from 'axios'
import moment from 'moment'
import { useRef, useState } from 'react'

import './YoutubeSearch.scss'

function YoutubeSearch() {
    const [videos, setVideos] = useState([])
    const [query, setQuery] = useState('')

    const inputSearchElement = useRef()

    const handleSearchYoutube = async () => {
        let res = await axios({
            "method": "GET",
            "url": "https://www.googleapis.com/youtube/v3/search",
            "params": {
                "part": "snippet",
                "maxResults": "5",
                "key": "AIzaSyBLEoe-03cp3gbxGBxL_P9lw0MWfjD1odY",
                "type": 'video',
                "q": query
            }
        })

        if (res && res.data) {
            const ItemsDataSearch = res.data.items
            var ArrItemsDataSearch = []
            ItemsDataSearch.map(item => {
                let ObjItemsDataSearch = {}
                ObjItemsDataSearch.id = item.id.videoId
                ObjItemsDataSearch.chanelTitle = item.snippet.channelTitle
                ObjItemsDataSearch.title = item.snippet.title
                ObjItemsDataSearch.description = item.snippet.description
                ObjItemsDataSearch.publishTime = item.snippet.publishTime

                return ArrItemsDataSearch.push(ObjItemsDataSearch)
            })

        }
        setVideos(ArrItemsDataSearch)
        setQuery('')
        inputSearchElement.current.focus()
    }

    return (
        <div className="yt-container">
            <h1>YOUTUBE SEARCH</h1>
            <div className="yt-search">
                <input ref={inputSearchElement} value={query} onChange={e => setQuery(e.target.value)} className="yt-search-input" />
                <button onClick={handleSearchYoutube} className="yt-seeach-btn" type="button">Search</button>
            </div>
            <div className="yt-result">
                {videos.map(item => (
                    <div className='result-item' key={item.id}>
                        <div className='left-section'>
                            <iframe width="360" height="220"
                                src={`https://www.youtube.com/embed/${item.id}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='right-section'>
                            <h3 className='title-video'>{item.title}</h3>
                            <p className='publish-time-video'>Published at {moment(item.publishTime).format("DD/MM/YYYY HH:mm:ss A")}</p>
                            <h4 className='chanel-title-video'>Author: {item.chanelTitle}</h4>
                            <p className='description-video'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YoutubeSearch