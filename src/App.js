import './App.css';
import { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Badge, Card, CardActions, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { ColorComponent } from './color-component';
import { MovieList } from './movie-list';
import { INITIAL_MOVIES } from './INITIAL_MOVIES';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// const movies = [
//   {
//     name: 'Avengers: Endgame',
//     rating: 9.0,
//     image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
//     description: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe'
//   }
// ]





function App() {

  const [movies, setMovies] = useState(INITIAL_MOVIES)

  return (
    <div className="App">
      <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/movies">Movie</Link></li>
        <li><Link to="/movies/add">Add Movie</Link></li>
        <li><Link to="/color-game">Color</Link></li>
      </ul>

      <Switch>
        <Route exact path="/">
          <HomeComponent />
        </Route>

        <Route path="/films">
          <Redirect to="/movies" />
        </Route>

        <Route exact path="/movies/add">
          <AddMovie movies={movies} setMovies={setMovies} />
        </Route>

        <Route exact path="/movies/:id">
          <MovieDetails movies={movies} setMovies={setMovies} />
        </Route>

        <Route exact path="/movies/edit/:id">
          <AddMovie movies={movies} setMovies={setMovies} />
        </Route>

        <Route exact path="/movies">
          <MovieList movies={movies} setMovies={setMovies} />
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
    <img src="https://i.pinimg.com/originals/fe/df/71/fedf7125acf620e856b6d09ef44eee51.gif" alt="Not found" />
  </div>
}

const MovieDetails = (props) => {
  const { id } = useParams()
  const history = useHistory()
  //=> if not valid index push to 404
  const { movies } = props
  const movie = movies[id]
  const { name, image, description, rating, trailer } = movie || {}
  console.log('MovieDetails', movies)
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
      <p className="movie-description">
        {description}
      </p>
      <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} onClick={() => history.goBack()}>
        Back
      </Button>
    </CardContent>
  </div>
}

const AddMovie = ({ movies, setMovies }) => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [rating, setRating] = useState('')
  const [poster, setPoster] = useState('')
  const [description, setDescription] = useState('')
  const [trailer, setTrailer] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (id) {
      const { name, rating, image, description, trailer } = movies[id]

      setName(name)
      setRating(rating)
      setPoster(image)
      setDescription(description)
      setTrailer(trailer)
    }
  }, [id, movies])

  const resetValues = () => {
    setName('')
    setPoster('')
    setDescription('')
    setRating('')
    setTrailer('')
    history.push('/movies')
  }

  const onSubmit = () => {
    if (name && rating && poster && description) {
      let params = {
        name,
        image: poster,
        rating,
        description: description,
        trailer
      }

      //=> if id is available then its edit
      if (id) {
        let tempMovies = [...movies]
        tempMovies[id] = params
        setMovies([...tempMovies])
      } else {
        movies.push(params)
        setMovies([...movies])
      }

      resetValues()
    } else {
      alert('Please fill all the fields')
    }
  }

  return <div>
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
      <TextField id="standard-basic" label="Trailer" variant="standard" type="text" value={trailer} onChange={event => {
        setTrailer(event.target.value)
      }} />
      <Button variant="contained" style={{ marginTop: 10 }} onClick={() => onSubmit()}>Add Movie</Button>
    </div>



  </div>
}




export default App;
