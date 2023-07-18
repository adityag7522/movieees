import React , {useState , useEffect} from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import {useSelector} from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query,setQuery] = useState("");

    const navigate = useNavigate();

    const {url} = useSelector((state)=>state.movies)
 
    const {data,loading} = useFetch("/movie/upcoming");

    useEffect(()=>{
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    },[data])

    const searchQueryHandler = (e) => {
        console.log(e);
        if((e.key === "Enter" || e.type === "click") && query.length > 0)
        {  
            navigate(`/search/${query}`);
        }
    }

  return (
    <div className="heroBanner">
        {!loading && <div className="backdrop-img">
            <Img src={background}/>
        </div>}
        <div className='opacity-layer'></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">Millions of movies, TV shows and people to Discover, Explore Now.</span>
                <div className="searchInput">
                    <input type="text" 
                        placeholder='Search for a movies or TV Shows'
                        onKeyUp={searchQueryHandler}
                        onChange={(e)=>(setQuery(e.target.value))}
                        />
                    <button onClick={searchQueryHandler}>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner