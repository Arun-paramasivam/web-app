import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from './gobal';

export const MovieList = (props) => {
    // const { movies } = props
    const history = useHistory()
    const [movies, setMovies] = useState([])
    const getMoviesApi = async () => {
        const response = await fetch(`${API_URL}/movies`).then(res => res.json())
        // console.log('response', response)
        setMovies(response)
    }

    useEffect(() => {
        getMoviesApi()
    }, [])

    useEffect(() => {
        // console.log('here3')
    }, [movies])


    const deleteMovie = async (id) => {
        const response = await fetch(`${API_URL}/movies/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
        if (response)
            getMoviesApi()
    }
    
    return <div className="movie-list">
        {movies.map((item, index) => {
            return <Movie
                key={item?.name + index}
                {...item}
                deleteButton={<IconButton color="error" aria-label="delete" onClick={() => {
                    // let newMoviesList = movies.filter((item, i) => i !== index)
                    // setMovies([...newMoviesList])
                    deleteMovie(item?._id)
                }}>
                    <DeleteIcon />
                </IconButton>}
                editButton={<IconButton
                    color="primary"
                    onClick={() => {
                        history.push(`movies/edit/${item._id}`)
                    }}>
                    <EditIcon />
                </IconButton>}
            />
        })}
    </div>
}


const Movie = (props) => {
    const { name, poster, rating, summary, _id, deleteButton, editButton } = props
    const [showSummary, setShowSummary] = useState(true)
    const history = useHistory()
    return <Card className="movie-container">
        <img className="movie-poster" src={poster} alt="img" />
        <CardContent>
            <div className="movie-specs">
                <h3 className="movie-name">
                    {name}
                    <IconButton color="primary" onClick={() => setShowSummary(!showSummary)}>
                        {showSummary ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton color="primary" onClick={() => history.push(`/movies/${_id}`)}>
                        <InfoIcon />
                    </IconButton>
                </h3>
                <p className="movie-rating">
                    ⭐️ {rating}
                </p>
            </div>
            <p className="movie-summary">
                {showSummary && summary}
            </p>
            <CardActions>
                <LikeButton />
                <div style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                    {deleteButton}
                    {editButton}
                </div>
            </CardActions>
        </CardContent>
    </Card>
}


const LikeButton = () => {
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    return <div className="counter-container">
        {/* <button onClick={() => setLike(like + 1)}>👍 Like {like}</button> */}
        {/* <Button variant="contained" onClick={() => setLike(like + 1)}>👍 Like {like}</Button> */}
        <Badge badgeContent={like} color="primary" >
            <IconButton
                color="primary"
                onClick={() => setLike(like + 1)}>
                👍
            </IconButton>
        </Badge>

        {/* <button onClick={() => setDislike(dislike + 1)}>👎 Dislike {dislike}</button> */}
        {/* <Button variant="contained" onClick={() => setDislike(dislike + 1)}>👎 Dislike {dislike}</Button> */}
        <Badge badgeContent={dislike} color="error">
            <IconButton
                color="primary"
                onClick={() => setDislike(dislike + 1)}>
                👎
            </IconButton>
        </Badge>
    </div>
}