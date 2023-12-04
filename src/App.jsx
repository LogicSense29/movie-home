import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SearchIcon from "./assets/search.svg"
import MovieCard from './MovieCard'
import './App.css'

// const movie1 = {
//   "Title": "Superman, Spiderman or Batman",
//   "Year": "2011",
//   "imdbID": "tt2084949",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
// }
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=c18dc2e6"
function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    console.log(data.Search)
    setMovies(data.Search)
}

const search = () => {
  searchMovies(searchTerm);
}

  useEffect(() => {
    searchMovies("Spiderman")
  }, [])

  return (
    <>
      <div className='app'>
        <h1>Movie Home</h1>
        <div className='search'>
          <input
            placeholder='search for movies'
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)}}
          />

          <img 
            src={SearchIcon}
            alt='Search Icon'
            onClick={search}
          />
        </div>
          {
            movies?.length > 0 ? (
            <div className='container'>
            {
            movies.map((movie, index) => (
                <MovieCard 
                  key={index}
                  movies={movie}
                />
            ))
            }
            </div>
            ) 
            : (
              <div className='empty'>
                <h2>There is no match of <span style={{fontSize: "1.5rem", color:"red"}}>"{searchTerm}"</span> here</h2>
              </div>
            )
          }
        </div>
    </>
  )
}

export default App
