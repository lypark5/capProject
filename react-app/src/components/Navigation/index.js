import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom/';
import OpenModalButton from '../OpenModalButton';
import RecipeFormFunction from '../Recipes/CreateRecipe';
import { getAllRecipesThunk } from '../../store/recipes';					// why do i need this?
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch()
	const history = useHistory()
	let homeUrl;																													// declare the url for home button
	sessionUser ? homeUrl = "/photos/all" : homeUrl = "/";								// if there is a logged-in user, make the home button go to get all photos, else make it go to landing page.

	const createRecipeLinkFunction = (userId) => {												// this is for create a recipe link.
		// dispatch(getAllRecipesThunk(userId))															// why do i need this
		history.push("/albums/new")
	}

	return (
		<div>
		<div id='nav-div-to-center-logo'>
			<NavLink to={homeUrl}>Logo</NavLink>
			</div>
			{isLoaded && (
			
					<ProfileButton user={sessionUser} />
			
			)}
		</div>
	);
}

export default Navigation;