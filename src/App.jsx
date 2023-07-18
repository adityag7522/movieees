import { fetchDataFromApi } from "./utils/api"
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from "./pages/home/Home";
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import NotFound from './pages/404/NotFound';

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then((res)=>{

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }

      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async() => {
    let promises = [];
    let endPoints = ["tv","movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({genres})=>{
      return genres.map((item)=>(
        allGenres[item.id] = item.name
      ))
    });

    dispatch(getGenres(allGenres));

  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
