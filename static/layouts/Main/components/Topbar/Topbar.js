
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {debounce} from '../../../../node_modules/lodash';
import Box from '@material-ui/core/Box';
import { ChipSelect } from '../../../../components/ChipSelect';
// import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      // width: 'auto',
      // width: '70%',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: 200,
    // },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, onSearchQueryResults,searchQuery, setSearchQuery, ...rest } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [authorSelection, setAuthorSelection] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function setAuthors(event) {
    console.log(event);
    //TODO
  }

  function handleSearchEnter(event) { 
      // event.preventDefault();

      if(event.key==='Enter'){
        console.log("Searching ", searchQuery, authorSelection); 
        submitSearchQuery(searchQuery, authorSelection);   
    }
  }

  function handleSearchQueryChange(event) { 
    setSearchQuery(event.target.value);
  }
  
  function submitSearchQuery(searchQuery, authorSelection){ 
    fetch('/search_paper', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
      "title": searchQuery,
      "authors": authorSelection.map(x=> x['author']['id'])
     })
    })
    .then(response => 
      //TODO: initialize loading here
        response.json().then(post=> {
          console.log(post);
          //TODO: Finish loading here.
          //TODO: Send object to authors
          onSearchQueryResults(post)
        }
          )
      )
    .catch(error =>
       console.error('Error:', error)
       //TODO: Reset loading here
       );;
   };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar  {...rest}
            className={clsx(classes.root, className)}>
        <Toolbar>
            <Box display='flex' flexDirection='row' width='218'  alignItems='center'>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap color="inherit">
              Expert lookup
            </Typography>
          </Box>
          <Grid container direction="row"

            style={{marginLeft: 20}}
            alignItems='center' spacing={4}
            padding={0}
            >
            <Grid item className={classes.searchIcon}>
              <SearchIcon />
            </Grid>
            <Grid item  sm="5">
              <InputBase
                placeholder="Search…"
                className={classes.grow}
                classes={{
                  root: clsx(classes.inputRoot,classes.grow),
                  input: clsx(classes.inputInput,classes.grow),
                }}
                onChange = {handleSearchQueryChange}
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onKeyPress={handleSearchEnter}
              />
            </Grid>
            <Grid item>
                <Typography className={classes.title} variant="h6" noWrap color="inherit">
                      By
                </Typography>
            </Grid>
            <Grid item  sm="5">
              < ChipSelect setRecommendedAuthors={setAuthors} selection={authorSelection} setSelection={setAuthorSelection} placeholder = "Authors..."></ChipSelect>
            </Grid>
          </Grid>
          {/* <Container  maxWidth="md" direction="row" alignItems="center" spacing={20}>
            <Grid item sm={1}>
                <Typography className={classes.title} variant="h6" noWrap color="inherit">
                  By
                </Typography>
              </Grid>
              <Grid item sm={12}>
              < ChipSelect setRecommendedAuthors={setAuthors} selection={authorSelection} setSelection={setAuthorSelection}></ChipSelect>
              </Grid>
          </Container> */}
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
       {renderMobileMenu} 
       { renderMenu}
    </div>
  );
}

export default Topbar;

