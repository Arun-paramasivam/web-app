import './App.css';
import { createContext, useEffect, useState } from 'react';
import { Button, IconButton, TextField, Badge, Card, CardActions, CardContent, AppBar, Toolbar, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { ColorComponent } from './color-component';
import { MovieList } from './movie-list';
import { INITIAL_MOVIES } from './INITIAL_MOVIES';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { AddMovie } from './AddMovie';
import { BasicForm } from './BasicForm';
import { EditMovie } from './EditMovie';
// const movies = [
//   {
//     name: 'Avengers: Endgame',
//     rating: 9.0,
//     image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9',
//     summary: 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe'
//   }
// ]


const context = createContext({})


function App() {

  const [movies, setMovies] = useState([])
  const history = useHistory()

  const [mode, setMode] = useState('light')
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  })

  const paperStyle = {
    borderRadius: 0,
    minHeight: '100vh'
  }

  const getMoviesApi = async () => {
    const response = await fetch('https://61ab1cb7bfb110001773f3b4.mockapi.io/movies').then(res => res.json())
    // console.log('response', response)
    setMovies(response)
  }
  useEffect(() => {
    getMoviesApi()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} style={paperStyle}>
        <div className="App">
          {/* <ul>
        <li><Link to="/" >Home</Link></li>
        <li><Link to="/movies">Movie</Link></li>
        <li><Link to="/movies/add">Add Movie</Link></li>
        <li><Link to="/color-game">Color</Link></li>
      </ul> */}

          <AppBar position="static">
            <Toolbar>
              <Button onClick={() => history.push('/')} size="large" color="inherit" aria-label="home">
                Home
              </Button>
              <Button onClick={() => history.push('/movies')} size="large" color="inherit" aria-label="home">
                Movie
              </Button>
              <Button onClick={() => history.push('/movies/add')} size="large" color="inherit" aria-label="home">
                Add Movie
              </Button>
              <Button onClick={() => history.push('/basic-form')} size="large" color="inherit" aria-label="home">
                Basic Form
              </Button>
              {/* <Button onClick={() => history.push('/color-game')} size="large" color="inherit" aria-label="home">
            Color
          </Button> */}
              {/* <Button color="inherit">Login</Button> */}
              <Button
                style={{ marginLeft: 'auto' }}
                startIcon={() => mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={() => mode === 'light' ? setMode('dark') : setMode('light')}
                size="large"
                color="inherit"
                aria-label="home">
                {mode === 'dark' ? <LightModeIcon style={{ marginRight: 5 }} /> : <DarkModeIcon style={{ marginRight: 5 }} />}{mode === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ margin: 20 }}>
            <Switch>
              <Route exact path="/">
                <HomeComponent />
              </Route>

              <Route path="/films">
                <Redirect to="/movies" />
              </Route>

              <Route exact path="/movies/add">
                <AddMovie />
              </Route>

              <Route exact path="/movies/:id">
                <MovieDetails />
              </Route>

              <Route exact path="/movies/edit/:id">
                <EditMovie />
              </Route>

              <Route exact path="/movies">
                <MovieList />
              </Route>

              <Route path="/color-game">
                <ColorComponent />
              </Route>

              <Route path="/basic-form">
                <BasicForm />
              </Route>

              <Route path="**">
                <NotFound />
              </Route>
            </Switch>
          </div>



        </div>
      </Paper>
    </ThemeProvider>
  );
}





const HomeComponent = () => {
  return <div>
    Welcome to Movie CRUD app!!!
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
  const [movie, setMovie] = useState({})
  // const { movies } = props
  // const movie = movies[id]
  const [name, setName] = useState('')
  const [poster, setPoster] = useState('')
  const [summary, setSummary] = useState('')
  const [rating, setRating] = useState(0)
  const [trailer, setTrailer] = useState('')
  // console.log('MovieDetails', movies)
  const getMovie = async (id) => {
    const response = await fetch(`https://61ab1cb7bfb110001773f3b4.mockapi.io/movies/${id}`).then(res => res.json())
    console.log('response', response)
    setMovie(response)
    if (response) {
      const { name, poster, summary, rating, trailer } = response || {}
      setName(name)
      setPoster(poster)
      setSummary(summary)
      setRating(rating)
      setTrailer(trailer)
    }
  }
  useEffect(() => {
    getMovie(id)
  }, [id])

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
      <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} onClick={() => history.goBack()}>
        Back
      </Button>
    </CardContent>
  </div>
}


export default App;
