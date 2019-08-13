import React, {useEffect } from 'react';
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
// import { SearchInput } from '../../components/SearchInput/SearchInput';
import user_logo from '../../assets/user.png'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import StarRatings from '../../node_modules/react-star-ratings';

import {ChipSelect} from '../../components/ChipSelect'


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

    const { onAuthorSelected, recommendedAuthors, setRecommendedAuthors,  ...rest } = props;

    console.log("onAuthorSelected2:  ", onAuthorSelected)

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
    // Dummy array of test values.
    const options = Array.from(new Array(1000), (_, index) => ({
      label: `Item ${index}`,
      value: index
    }));

    return (
         <Container  className={classes.container}  maxWidth="md"> 

        {/* <Select options={options} /> */}
        <ChipSelect setRecommendedAuthors={setRecommendedAuthors}></ChipSelect>
            <AuthorsList recommendedAuthors={recommendedAuthors} small={false} onAuthorSelected={onAuthorSelected}></AuthorsList>
         </Container>
    );
  };

  const AuthorsList= props => {

    const { recommendedAuthors, small, onAuthorSelected,  ...rest } = props;
    const classes = useStyles();
    // console.log(onAuthorSelected);
    // function handleClick(e, author) {
    //   e.preventDefault();
    //   console.log('The link was clicked.');
    //   onAuthorSelected();
    // }
    return (
          <GridList cellHeight={160} className={classes.gridList} cols={1} spacing={16} >
          {recommendedAuthors.map(author => (
            <div key={author.id}  onClick={e=>onAuthorSelected(author)}>
                <Author author={author} small={small} ></Author>
            </div>
          ))}
        </GridList>
    );
  };
  

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

  const Author = props => {
    const classes = useCardStyles();
    const theme = useTheme();

    const { author, small, ...rest } = props;

    console.log("SMALL", small);

    useEffect(() => {
      document.title ='You clicked';
    });

    // onclick={()=> {
    //   console.log("Clicked author", author);
    //   onAuthorSelected(author)}
    //   }

    if(small) {
      return (
        <Card className={classes.card}>
          <Grid container>
            <Grid item md={2} style={{alignItems: 'center', display:'flex', justifyContent:'center', padding: theme.spacing(2)}} >
              <Avatar src={author.img} style={{height: 120, width: 120}}  ></Avatar>
            </Grid>
            <Grid item md={3}  style={{padding: theme.spacing(2)}} >
              <Typography component="h5" variant="h5">
                    {author.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                  {author.affiliation}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )
    }


    else { 
    return (
      <Card className={classes.card} style={{cursor: 'pointer'}}>
        {/* <img src={user_logo} alt="Logo" width="100" height="100" /> */}
        {/* <Grid container style={{padding: theme.spacing(1)}}>  */}
        <Grid container> 

        {/* ={{justifyContent: 'center', display:'flex', flexDirection: 'column', alignItems: 'center'}} > */}
        {/* <PersonIcon className={classes.personIcon}></PersonIcon> */}
        {/* <AccountCircle className={classes.personIcon}></AccountCircle> */}
        {/* "https://scholar.google.com/citations?view_op=medium_photo&user=Smr99uEAAAAJ" */}
        {/* <img src={author.img}></img> */}
        {/* style={{alignItems: 'center', display:'flex', justifyContent:'center'}} */}
        {/* <Grid item md={2} style={{alignItems: 'center', display:'flex', justifyContent:'center', padding: theme.spacing(2)}} >
          <Avatar src={author.img} style={{height: 120, width: 120}}  ></Avatar>
          </Grid> */}


        <Grid item md={2} style={{alignItems:'center', justifyContent:'center', display: 'flex'}}>
          <img src={author.img} style={{maxHeight: '100%', maxWidth:'100%'}}></img>
        </Grid>

        {/* <div className={classes.details}> */}

        <Grid item md={8}   style={{paddingTop: theme.spacing(3), paddingBottom: theme.spacing(2)}} >
          <Grid container md={12} style={{ flex: 1, alignItems:'center'}} > 
              <Typography component="h4" variant="h4" style={{paddingLeft: theme.spacing(2), display: 'inline-block'}} >
                  {author.name}
                </Typography>
              <Typography ariant="h6" color="textSecondary" style={{paddingLeft: theme.spacing(2), display: 'inline-block'}}  >
                  {author.affiliation}
              </Typography>
            </Grid>
            {/* <Grid container md={12} style={{ flex: }} > 
              <Typography inline component="h4" variant="h4" style={{paddingLeft: theme.spacing(2)}} >
                  {author.name}
                </Typography>
              <Typography inline ariant="h6" color="textSecondary" style={{paddingLeft: theme.spacing(2)}}  >
                  {author.affiliation}
              </Typography>
            </Grid> */}
          <Grid item md={12} style={{ flex: 4, paddingLeft: theme.spacing(2)}}>
            {/* <Typography variant="subtitle1" color="textSecondary"> */}
              <List>
                {author.papers.map(paper => (
                  <div key={paper.id} >
                      <Typography  variant="h5" color="textSecondary" style={{display: 'inline-block'}}>
                      “{paper.name}”,
                      </Typography>
                      <Typography  variant="h5" color="textPrimary" style={{paddingLeft: theme.spacing(1), display: 'inline-block'}}>
                        {paper.year}
                      </Typography>

                  </div>
                ))}
                </List>
            {/* </Typography> */}
            </Grid>
          </Grid>
        <Grid item md={2} style={{padding: theme.spacing(3), alignItems:'center', display: 'flex' , flexDirection:'column'}}>
            
            <Typography component="h3" variant="h3">
                  { (5*(author.score)/10).toFixed(1)}
              </Typography>
              
            <div
              style ={{paddingTop: theme.spacing(1)}}>
              <StarRatings 
                rating={5*(author.score)/10}
                starRatedColor={theme.palette.text.secondary.dark}
                starEmptyColor = {theme.palette.text.secondary.light}
                starDimension="16px"
                starSpacing="1px"
                // changeRating={this.changeRating}
                numberOfStars={5}
                name='star_match_rank'
              />
              </div>
          </Grid>
          </Grid>
          {/* </CardContent> */}
      {/* <CardMedia
        className={classes.cover}
        image={user_logo}
        title="YOYOYOYO"
      /> */}
    </Card>

    );
    }
  };
export { Authors, Author, AuthorsList };
// return (
    //     <div>
    //       <p>{author.id}</p>
    //       <p>{author.name}</p>
    //     </div>
    // );