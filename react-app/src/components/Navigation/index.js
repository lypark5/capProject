import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	let homeUrl;																													// declare the url for home button
	sessionUser ? homeUrl = "/recipes/all" : homeUrl = "/";								// if there is a logged-in user, make the home button go to get all photos, else make it go to landing page.

	return (
		<div id='nav-bar'>
			{isLoaded && (
				<ProfileButton user={sessionUser} />
			)}
			<NavLink to={homeUrl} id='logo'>Logo</NavLink>
			{sessionUser && (
				<NavLink to="/recipes/new" id='create-recipe-link-nav'>Upload a Recipe!</NavLink>
			)}
		</div>
	);
}

export default Navigation;