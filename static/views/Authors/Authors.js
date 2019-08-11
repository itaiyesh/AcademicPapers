import React from 'react';
import { makeStyles, useTheme  } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
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
// import { SearchInput } from '../../components/SearchInput/SearchInput';
import user_logo from '../../assets/user.png'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

console.log(user_logo)
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

const Authors = props => {

    const { recommendedAuthors, ...rest } = props;
    //TODO: Remove mock
    // var recommendedAuthors = [
    //   {  'id': 0,
    
    //     'name': 'itai', 
    //   'papers': [{'name': 'the best paper in the world', 'year': 1986}, {'name': 'the second best paper in the world', 'date': 2019}],
    //   'score': 9.7,
    // },
    //   {  'id': 1,
    
    //     'name': 'amit', 
    //   'papers': [{'name': 'the best paper in the world', 'year': 1986}, {'name': 'the second best paper in the world', 'date': 2019}],
    // 'score': 9.6}
    
    // ];

    const classes = useStyles();

    return (
          <Container  className={classes.container}  maxWidth="md"> 
          <GridList cellHeight={160} className={classes.gridList} cols={1} spacing={16} >
          {recommendedAuthors.map(author => (
            // <Grid item > 
            // <Author author={author}></Author>
            // </Grid>
            <div  key={author.id}>
            {/* <GridListTile key={author.id} cols={1} className =  { classes.gridListTile} > */}
                <Author author={author}></Author>
            {/* </GridListTile> */}
            </div>
          ))}
        </GridList>
        </Container>
    );
  };

  const useCardStyles = makeStyles(theme => ({
    card: {
      display: 'flex',
      height: '100%'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },

  }));

  const Author = props => {
    const classes = useCardStyles();
    const theme = useTheme();

    const { author, ...rest } = props;

    return (
      <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {author.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            list of papers...
          </Typography>
        </CardContent>
      </div>
      {/* <img src={user_logo} alt="Logo" width="100" height="100" /> */}
      <CardMedia
        className={classes.cover}
        image={user_logo}
        title="YOYOYOYO"
      />
    </Card>

    );

  };
export { Authors };

// return (
    //     <div>
    //       <p>{author.id}</p>
    //       <p>{author.name}</p>
    //     </div>
    // );