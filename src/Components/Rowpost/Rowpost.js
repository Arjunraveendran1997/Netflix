import React,{useEffect,useState} from 'react'
import './Rowpost.css'
import axios from '../../Constants/axios'
import {imageurl,API_KEY} from '../../Constants/Constants'
import YouTube from 'react-youtube'

function Rowpost(props) {
  
    const [movies, setMovies] = useState([])
    const [urlid, setUrlid] = useState('')

    useEffect(() => {
       axios.get(props.url).then((response)=>{
           
           setMovies(response.data.results)
       })
          
      
    },[props.url])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

const handlemovie = (id)=>{
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
        if(response.data.results.length!==0){
            setUrlid(response.data.results[0])

        }
        else {
            console.log("Array empty");
        }

    })


}

    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="row_posters">
                { movies.map((obj)=>

                <img onClick={()=>handlemovie(obj.id)} className={props.isSmall ? "small_poster" :"poster"} src={`${imageurl+obj.backdrop_path}`} alt="poster" />

    )}
               
         </div>
       {  urlid && <YouTube opts={opts} videoId={urlid.key} />   }
        </div>
    )
}

export default Rowpost
