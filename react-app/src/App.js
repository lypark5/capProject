import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GetAllRecipesFunction from "./components/Recipes/GetAllRecipes";
import GetRecipeDetailsFunction from "./components/Recipes/GetRecipeDetails";
import GetAllRecipesOfCurrentFunction from "./components/Recipes/ManageMyRecipes";
import RecipeFormFunction from "./components/Recipes/CreateRecipe";
import EditRecipeFunction from "./components/Recipes/EditRecipe";
import GetAllBookmarksFunction from "./components/Bookmarks/ManageBookmarks";
import AboutMePage from "./components/AboutMe";
import NotFound from "./components/404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <ProtectedRoute path ='/:userId/bookmarks'>
            <GetAllBookmarksFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/recipes/all'>
            <GetAllRecipesFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/recipes/new'>
            <RecipeFormFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/recipes/manage'>
            <GetAllRecipesOfCurrentFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/recipes/:recipeId/edit'>
            <EditRecipeFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/recipes/:recipeId'>
            <GetRecipeDetailsFunction />
          </ProtectedRoute>
          <ProtectedRoute path ='/AboutMe'>
            <AboutMePage />
          </ProtectedRoute>
          <Route path='/*'>
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
