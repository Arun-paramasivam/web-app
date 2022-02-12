import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup'
import { useFormik } from "formik";
import { Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { formValidationSchema } from './AddMovie';
import { API_URL } from './gobal';

export const EditMovie = (props) => {
    const { id } = useParams()
    // const [name, setName] = useState('')
    // const [rating, setRating] = useState('')
    // const [poster, setPoster] = useState('')
    // const [summary, setSummary] = useState('')
    // const [trailer, setTrailer] = useState('')
    const history = useHistory()
    const [movie, setMovie] = useState({})

    useEffect(() => {
        //=> if its edit
        if (id) {
            getSingleMovieApi(id)
        }
    }, [])

    // useEffect(() => {
    //     console.log('movie', movie)
    // }, [movie])


    const getSingleMovieApi = async () => {
        await fetch(`${API_URL}/movies/${id}`, {
            method: 'GET',
        }).then(res => res.json()).then(response => {
            // console.log('response', response)
            // if (response) {
            // setName(response?.name)
            // setRating(response?.rating)
            // setSummary(response?.summary)
            // setPoster(response?.image)
            // setTrailer(response?.trailer)
            setMovie({ name: response.name, poster: response.poster, summary: response.summary, rating: response.rating, trailer: response.trailer })
            // }
        })

    }

    const addMovieApi = async (params) => {
        await fetch(`${API_URL}/movies`, {
            headers: { "Content-type": "application/json" },
            method: 'POST',
            body: JSON.stringify(params)
        }).then(() => history.push('/movies'))
    }

    const updateMovieApi = async (params) => {
        await fetch(`${API_URL}/movies/${id}`, {
            headers: { "Content-type": "application/json" },
            method: 'PUT',
            body: JSON.stringify(params)
        }).then(() => history.push('/movies'))
    }

    const resetValues = () => {
        // setName('')
        // setPoster('')
        // setSummary('')
        // setRating('')
        // setTrailer('')
    }

    const onSubmit = (newMovie) => {
        const { name, rating, poster, summary, trailer } = newMovie
        if (name && rating && poster && summary) {
            let params = {
                name,
                poster,
                rating,
                summary,
                trailer
            }

            //=> if id is available then its edit
            if (id) {
                // let tempMovies = [...movies]
                // tempMovies[id] = params
                // setMovies([...tempMovies])
                updateMovieApi(params)
            } else {
                // movies.push(params)
                // setMovies([...movies])
                addMovieApi(params)
            }

            resetValues()
        } else {
            alert('Please fill all the fields')
        }
    }

    return movie.name ? <UpdateMovie movie={movie} onSubmit={onSubmit} /> : "";
};

const UpdateMovie = (props) => {
    const { movie, onSubmit } = props
    const formik = useFormik({
        initialValues: { name: movie.name, poster: movie.poster, summary: movie.summary, rating: movie.rating, trailer: movie.trailer },
        // validate: formValidate,
        validationSchema: formValidationSchema,
        onSubmit: onSubmit
    });
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = formik;
    const { name, poster, summary, rating, trailer } = values;

    return <div>
        <div className="add-movie-form">
            <TextField id="name" label="Name" variant="standard" type="text"
                name='name'
                value={name}
                placeholder='Enter Movie name'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={errors.name} />
            {/* {errors.name && touched ? errors.name : ''} */}
            <TextField id="standard-basic" label="Poster" variant="standard"
                name='poster'
                value={poster}
                placeholder='Enter Poster'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.poster && touched.poster}
                helperText={errors.poster} />
            {/* {errors.poster && touched ? errors.poster : ''} */}
            <TextField id="standard-basic" label="Summary" variant="standard" type="text"
                name='summary'
                value={summary}
                placeholder='Enter summary'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.summary && touched.summary}
                helperText={errors.summary} />
            {/* {errors.summary && touched ? errors.summary : ''} */}
            <TextField id="standard-basic" label="Rating" variant="standard" type="text"
                name='rating'
                value={rating}
                placeholder='Enter Rating'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.rating && touched.rating}
                helperText={errors.rating} />
            {/* {errors.rating && touched ? errors.rating : ''} */}
            <TextField id="standard-basic" label="Trailer" variant="standard" type="text"
                name='trailer'
                value={trailer}
                placeholder='Enter Trailer'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.trailer && touched.trailer}
                helperText={errors.trailer} />
            {/* {errors.trailer && touched ? errors.trailer : ''} */}
            <Button variant="contained" style={{ marginTop: 10 }} onClick={() => handleSubmit()}>Edit Movie</Button>
        </div>



    </div>;
}
