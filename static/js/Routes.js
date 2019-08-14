import React, {useState} from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts'; 
import { Authors as AuthorsView} from '../views/Authors/Authors';
import { Dashboard as DashboardView } from '../views/Dashboard/Dashboard'
import { WatchAuthor as WatchAuthorView } from '../views/WatchAuthor/WatchAuthor'

//TODO: Create hash history!!! not good
// import { createHashHistory } from 'history'
// const history = createHashHistory();

const Routes = () => {

  const [recommendedAuthors, setRecommendedAuthors] = useState([]);
  const [author, setAuthor] = useState(null);
  // const [authorsSubView, setAuthorsSubView] = useState('search');

  // const [showAuthors, setShowAuthors] = useState(false);
  const [showWatchAuthor, setShowWatchAuthor] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  //Author filter selection
  const [selection, setSelection] = React.useState(null);

  const onSearchQueryResults = (results) => {
      setRecommendedAuthors(results);
      // history.push('/authors/search')
      // authorsSubView('search');
      console.log("onSearchQueryResults")
      setShowWatchAuthor(false);

  };

  const onAuthorSelected = (author) => {
    setAuthor(author);
    // history.push('/authors/watch')

    // authorsSubView('watch');
    console.log("Author selected");

    setShowWatchAuthor(true);
};

  return (
    // This was Switch
    <BrowserRouter> 


     <MainLayout onSearchQueryResults={onSearchQueryResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
         <Redirect
          exact
          from="/"
          to="/authors"
          push={true}
        /> 
       <Switch >
            <Route path="/authors" component={({match})=>
              <AuthorsView match={match}
               showWatchAuthor={showWatchAuthor}
               onAuthorSelected={onAuthorSelected} 
              author={author} 
              recommendedAuthors={recommendedAuthors} 
              setRecommendedAuthors={setRecommendedAuthors}
              selection={selection}
              setSelection={setSelection}
              
              />}
              />
            <Route path="/papers" component={({match})=>
              <DashboardView match={match}/>}
              /> 
       </Switch>
     </MainLayout>
      </BrowserRouter>

  );
};

export  { Routes };


      // {/* <RouteWithLayout
      //   component={UserListView}
      //   exact
      //   layout={MainLayout}
      //   path="/users"
      // />
      // <RouteWithLayout
      //   component={ProductListView}
      //   exact
      //   layout={MainLayout}
      //   path="/products"
      // />
      // <RouteWithLayout
      //   component={TypographyView}
      //   exact
      //   layout={MainLayout}
      //   path="/typography"
      // />
      // <RouteWithLayout
      //   component={IconsView}
      //   exact
      //   layout={MainLayout}
      //   path="/icons"
      // />
      // <RouteWithLayout
      //   component={AccountView}
      //   exact
      //   layout={MainLayout}
      //   path="/account"
      // /> */}
      // {/* <RouteWithLayout
      //   component={SettingsView}
      //   exact
      //   layout={MainLayout}
      //   path="/settings"
      // />
      // <RouteWithLayout
      //   component={SignUpView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/sign-up"
      // />
      // <RouteWithLayout
      //   component={SignInView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/sign-in"
      // />
      // <RouteWithLayout
      //   component={NotFoundView}
      //   exact
      //   layout={MinimalLayout}
      //   path="/not-found"
      // /> */}
      // {/* <Redirect to="/not-found" /> */}
