import { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Badge, Card, CardActions, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from "formik";
import { EditMovie } from './EditMovie';

export const formValidationSchema = yup.object({
    name: yup
        .string()
        // .min(5, 'need bigger mail')
        // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'enter valid email')
        .required('fill this name'),
    poster: yup
        .string()
        .min(4)
        // .max(12, 'need smaller password')
        .required('fill this poster'),
    summary: yup
        .string()
        .min(20)
        .required('fill this summary'),
    rating: yup
        .number()
        .min(0)
        .max(10)
        .required('fill this rating'),
    trailer: yup
        .string()
        .min(4)
        .required('fill this trailer'),
})

export const AddMovie = (props) => {
    // const [name, setName] = useState('')
    // const [rating, setRating] = useState('')
    // const [poster, setPoster] = useState('')
    // const [summary, setSummary] = useState('')
    // const [trailer, setTrailer] = useState('')
    const history = useHistory()
    const [movie, setMovie] = useState({})

    const addMovieApi = async (params) => {
        await fetch(`https://61ab1cb7bfb110001773f3b4.mockapi.io/movies`, {
            headers: { "Content-type": "application/json" },
            method: 'POST',
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
            addMovieApi(params)
            resetValues()
        }
    }




    const formik = useFormik({
        initialValues: { name: '', poster: '', summary: '', rating: '', trailer: '' },
        // validate: formValidate,
        validationSchema: formValidationSchema,
        onSubmit: onSubmit
    })
    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = formik
    const { name, poster, summary, rating, trailer } = values

    return <div>
        <div className="add-movie-form">
            <TextField id="standard-basic" label="Name" variant="standard" type="text"
                name='name'
                value={name}
                placeholder='Enter Movie name'
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={errors.name}
            />
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
            <Button variant="contained" style={{ marginTop: 10 }} onClick={() => handleSubmit()}>Add Movie</Button>
        </div>



    </div>

}

