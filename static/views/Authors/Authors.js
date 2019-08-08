import React, { Component } from 'react';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1)
    },
    searchInput: {
      marginRight: theme.spacing(1)
    }
  }));

class Authors extends Component { 
    render() { 

        var classes = useStyles();

        return (
            <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search product"
            />
          </div>
        );
    }
};

export { Authors }