import './App.css';
import { useState } from 'react';
import { Button, IconButton, TextField, Badge, Card, CardActions, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { ColorComponent } from './color-component';
import { MovieList } from './movie-list';
import { INITIAL_MOVIES } from './INITIAL_MOVIES';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
// const movies = [
//   {
//     name: 'Avengers: Endgame',
//     rating: 9.0,
//     image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
//     summary: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe'
//   }
// ]





function App() {


  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [poster, setPoster] = useState('')
  const [description, setDescription] = useState('')
  const [movieList, setMovieList] = useState(INITIAL_MOVIES)

  const onSubmit = () => {
    if (name && rating && poster && description) {
      let params = {
        name,
        image: poster,
        rating,
        summary: description
      }
      movieList.push(params)
      setMovieList([...movieList])
      console.log('here', movieList)
      setName('')
      setPoster('')
      setDescription('')
      setRating('')
    } else {
      alert('Please fill all the fields')
    }
  }


  return (
    <div className="App">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/movie">Movie</Link></li>
        <li><Link to="/color-game">Color</Link></li>
      </ul>

      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>
        <Route path="/films">
          <Redirect to="/movie" />
        </Route>
        <Route path="/movie/:id">
          {/* <MovieComponent /> */}
          <MovieDetails movies={movieList} />
        </Route>
        <Route path="/movie">
          <div>
            <div className="add-movie-form">
              <TextField id="standard-basic" label="Name" variant="standard" type="text" value={name} onChange={event => {
                setName(event.target.value)
              }} />
              <TextField id="standard-basic" label="Poster" variant="standard" value={poster} onChange={event => {
                setPoster(event.target.value)
              }} />
              <TextField id="standard-basic" label="Description" variant="standard" type="text" value={description} onChange={event => {
                setDescription(event.target.value)
              }} />
              <TextField id="standard-basic" label="Rating" variant="standard" type="text" value={rating} onChange={event => {
                setRating(event.target.value)
              }} />
              <Button variant="contained" style={{ marginTop: 10 }} onClick={() => onSubmit()}>Add Movie</Button>
            </div>

            <MovieList movies={movieList} />

          </div>
        </Route>
        <Route path="/color-game">
          <ColorComponent />
        </Route>
        <Route path="**">
          <NotFound />
        </Route>
      </Switch>

    </div>
  );
}





const HomeComponent = () => {
  return <div>
    Welcome to Web app!!!
  </div>
}

const NotFound = () => {
  return <div>
    <img src="https://i.pinimg.com/originals/fe/df/71/fedf7125acf620e856b6d09ef44eee51.gif" />
  </div>
}

const MovieDetails = (props) => {
  const { id } = useParams()
  const { movies } = props
  const movie = movies[id]
  const { name, image, summary, rating, trailer } = movie
  console.log('trailer', trailer)
  return <div className="movie-container">
    <iframe width="820" height="461" src={trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <CardContent>
      <div className="movie-specs">
        <h3 className="movie-name">
          {name}
        </h3>
        <p className="movie-rating">
          ⭐️ {rating}
        </p>
      </div>
      <p className="movie-summary">
        {summary}
      </p>
    </CardContent>
  </div>
}





export default App;
