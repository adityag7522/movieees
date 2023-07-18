import React from 'react'
import './styles.scss';
import {useSelector} from 'react-redux';

const Genres = ({data}) => {

    const {genres} = useSelector(state=> state.movies);

  return (
    <div className="genres">
        {data?.map((g) => {
            if(!genres[g]) return ;
            return (
                <div key={g} className="genre">
                    {genres[g]}
                </div>
            )
        })}
    </div>
  )
}

export default Genres