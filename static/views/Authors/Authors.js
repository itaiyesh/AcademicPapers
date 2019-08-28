import React, {useEffect, useState } from 'react';
import { makeStyles, useTheme  } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import StarRatings from '../../node_modules/react-star-ratings';

import {ChipSelect} from '../../components/ChipSelect'

import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import {WatchAuthor} from '../WatchAuthor/WatchAuthor';

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

    const { history, match, onAuthorSelected, author,  recommendedAuthors, setRecommendedAuthors, showWatchAuthor, selection,setSelection,  ...rest } = props;

    // <Route path={`${match.url}/search`} component={({match}) => 

    const renderRedirect = (showWatchAuthor) => {
      if(showWatchAuthor) {
        return <Redirect
        exact
        from="/"
        to={`${match.url}/watch`}
        push={true}
      /> 
       } else { 
        return <Redirect
          exact
          from="/"
          to={`${match.url}/search`}
          push={true}
  
        /> 
       }
    }

    return (
      <div>

        {renderRedirect(showWatchAuthor)}

      <Switch>
        <Route path={`${match.url}/search`}  component={({match}) => 
          <SearchView onAuthorSelected={onAuthorSelected} recommendedAuthors={recommendedAuthors} setRecommendedAuthors={setRecommendedAuthors} selection={selection} setSelection={setSelection}></SearchView>}/>
        <Route path={`${match.url}/watch`} component={({match}) => 
          <WatchAuthor onAuthorSelected={onAuthorSelected} recommendedAuthors={recommendedAuthors} author={author}></WatchAuthor>}/>
      </Switch>
      
      </div>

    );
  };

  //TODO: Separate file (like WatchAuthor)
  const SearchView = props => {

    const { match, onAuthorSelected, recommendedAuthors, setRecommendedAuthors, selection, setSelection,  ...rest } = props;
    const classes = useStyles();

    return (
      <Container  className={classes.container}  maxWidth="md"> 
          <ChipSelect setRecommendedAuthors={setRecommendedAuthors} selection={selection} setSelection={setSelection}></ChipSelect>
          <AuthorsList recommendedAuthors={recommendedAuthors} small={false} onAuthorSelected={onAuthorSelected}></AuthorsList>
      </Container>
    )
  }

  const AuthorsList= props => {

    const { recommendedAuthors, small, onAuthorSelected,  ...rest } = props;
    const classes = useStyles();
    return (
          <GridList cellHeight={160} className={classes.gridList} cols={1} spacing={5} >
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

    // useEffect(() => {
    //   document.title ='You clicked';
    // });

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

        <Grid container> 
        <Grid item md={2} style={{alignItems:'center', justifyContent:'center', display: 'flex'}}>
          <img src={author.img} style={{maxHeight: '100%', maxWidth:'100%'}}></img>
        </Grid>

        <Grid item md={8}   style={{paddingTop: theme.spacing(3), paddingBottom: theme.spacing(2)}} >
          <Grid container md={12} style={{ flex: 1, alignItems:'center'}} > 
              <Typography component="h4" variant="h4" style={{paddingLeft: theme.spacing(2), display: 'inline-block'}} >
                  {author.name}
                </Typography>
              <Typography ariant="h6" color="textSecondary" style={{paddingLeft: theme.spacing(2), display: 'inline-block'}}  >
                  {author.affiliation}
              </Typography>
            </Grid>
          <Grid item md={12} style={{ flex: 4, paddingLeft: theme.spacing(2)}}>
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
    </Card>

    );
    }
  };
export { Authors, Author, AuthorsList };
