import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { getAllRecipesThunk } from '../../store/recipes';
import './Navigation.css';




function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	let homeUrl;																													// declare the url for home button
	sessionUser ? homeUrl = "/recipes/all" : homeUrl = "/";								// if there is a logged-in user, make the home button go to get all photos, else make it go to landing page.


	async function rerenderFunction () {
		await dispatch(getAllRecipesThunk());
		history.push('/recipes/all');
	}


	if (sessionUser) {
		return (
			<div id='nav-bar-logged-in'>
				<ProfileButton user={sessionUser} />
				<span id='center-logo-span' onClick={() => rerenderFunction()}>
					<img src='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/spoon-icon.png' id='logo'></img>
					<span id='recipe-share'>recipe-share</span>
				</span>
				<NavLink to="/recipes/new" id='create-recipe-link-nav' className='link'>Upload a Recipe!</NavLink>
			</div>
		)
	} else {
		return (
			<div id='nav-bar-logged-out'>
				<NavLink to={homeUrl} id='logo-obj'className='link'>
					<img src='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/spoon-icon.png' id='logo'></img>
					<span id='recipe-share'>recipe-share</span>
				</NavLink>
			</div>
		)
	}
}


export default Navigation;


/* part of nav, user will type sth inside.
it's always gonna redirect to a results page.
find a way to pass in each word to the result page param.   .filter
filter all recipes with param word
produce this filtered array.
if array empty, no results.

*/
