import { useState } from 'react';
import { Badge, Button, Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

// export const MovieComponent = () => {

    

// }

export const MovieList = (props) => {
    const { movies } = props
    return <div className="movie-list">
        {movies.map((item, index) => {
            return <Movie key={item?.name + index} index={index} {...item} />
        })}
    </div>
}


const Movie = (props) => {
    const { name, image, rating, summary, index } = props
    const [showDescription, setShowDescription] = useState(true)
    const history = useHistory()
    return <Card className="movie-container">
        <img className="movie-poster" src={image} alt="img" />
        <CardContent>
            <div className="movie-specs">
                <h3 className="movie-name">
                    {name}
                    <IconButton color="primary" onClick={() => setShowDescription(!showDescription)}>
                        {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <IconButton color="primary" onClick={() => history.push(`/movie/${index}`)}>
                        <InfoIcon />
                    </IconButton>
                </h3>
                <p className="movie-rating">
                    ⭐️ {rating}
                </p>
            </div>
            <p className="movie-summary">
                {showDescription && summary}
            </p>

            {/* <button style={{ margin: 10 }} onClick={() => setShowDescription(!showDescription)}>{showDescription ? 'Hide' : 'Show'} Description</button> */}
            {/* <Button variant="contained" style={{ margin: 10 }} onClick={() => setShowDescription(!showDescription)}>{showDescription ? 'Hide' : 'Show'} Description</Button> */}
            <CardActions>
                <LikeButton />
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