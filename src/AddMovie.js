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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

