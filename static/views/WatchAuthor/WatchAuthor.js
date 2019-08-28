import React from 'react';
import { makeStyles, useTheme  } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import List from '@material-ui/core/List';

import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import {AuthorsList} from '../Authors/Authors';

// Add this in your component file


const useStyles = makeStyles(theme => ({
    container: { 
      padding: theme.spacing(5)
    },
    gridList: {
      direction: "column",
      justify: "flex-start",
      alignItems: "center"
    },

    gridListTile: { 
      // padding: theme.spacing(3)
    },

    paper: { 
      height : '100%'
    },

  }));


  const useCardStyles = makeStyles(theme => ({
    card: {
      display: 'flex',
      height: '100%',
      justifyContent:'center-left',
      // padding: theme.spacing(2)
    },
    details: {
      display: 'flex',
      flexDirection: 'row',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },

    personIcon: {
      width: 102,
      height: 102
    }

  }));

  const AuthorDetails = props => {
    const classes = useCardStyles();
    const theme = useTheme();

    const { author, ...rest } = props;

    return (
      <p>{author.name}</p>
    );

  }

  const WatchAuthor = props => {
    const classes = useCardStyles();
    const theme = useTheme();

    const {onAuthorSelected, recommendedAuthors, author, ...rest } = props;

    return (
      <Box display="flex" flexDirection="row" >
      <AuthorDetails  author={author}>
      </AuthorDetails>
      <AuthorsList  recommendedAuthors={recommendedAuthors} small={true} onAuthorSelected={onAuthorSelected}>

      </AuthorsList>
      </Box>

    );

  };

export { WatchAuthor };

