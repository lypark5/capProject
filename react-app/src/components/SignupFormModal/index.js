import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import './SignupForm.css';

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();            
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [profilePic, setProfilePic] = useState(null);	
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [buttonId, setButtonId] = useState("disabled-signup-button");	
	const { closeModal } = useModal();
	const errorsObj = {};												// my errors basket
	// see if i wanna use the hide/show password feature.


	useEffect(() => {
		if (username && username.length < 4) {									// if statements for putting things in my errors basket
			errorsObj.username = 'Username must be at least 4 characters long'
		};
		if (password && password.length < 6) {
      errorsObj.password = 'Password must be at least 6 characters long'
    };
		if (firstName && (firstName.length < 3 || firstName.length > 50)) {
			errorsObj.firstName = 'First name must be between 3 and 50 characters';
		};
		if (lastName && (lastName.length < 3 || lastName.length > 50)) {
			errorsObj.lastName = 'Last name must be between 3 and 50 characters';
		};
		if (confirmPassword && confirmPassword !== password) {
			errorsObj.confirmPassword = 'Password and Confirm Password fields must match';
		};
		if (!profilePic) {
			errorsObj.profilePic = 'Profile picture required';
		};

		if (username.length >= 4 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50 && password === confirmPassword && profilePic) {
			setDisabled(false);																				// basically if all inputs are good to go, enable the submit button.
			setButtonId("enabled-signup-button")											// enabled css button
		}

		setErrors(errorsObj);																		// if any if statements got hit, setErrors with the updated basket.
	}, [username.length, password.length, firstName.length, lastName.length, password, confirmPassword, profilePic])										// we keep an eye on any change in this array.


	// study the useEffect and handleSubmit to see what I can change
	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	if (password === confirmPassword) {
	// 		const data = await dispatch(signUp(username, email, password));
	// 		if (data) {
	// 			setErrors(data);
	// 		} else {
	// 			closeModal();
	// 		}
	// 	} else {
	// 		setErrors([
	// 			"Confirm Password field must be the same as the Password field",
	// 		]);
	// 	}
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();										// for aws
		formData.append('username', username)								// adding key and value to formData
		formData.append('first_name', firstName)
		formData.append('last_name', lastName)
		formData.append('email', email)
		formData.append('profile_pic', profilePic)
		formData.append('password', password)

		await dispatch(sessionActions.signUp(formData));		// do the signup using this new formData
		closeModal();
		setUsername('');
		setFirstName('');
		setLastName('');
		setEmail('');
		setProfilePic('');
		setPassword('');
		history.push('/recipes/all');
	}																											

	return (
		<div className='modal' id='signup-modal'>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div>
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							required
						/>
						{errors.username && <p className="errors">{errors.username}</p>}
					</label>
					<label>
						First Name
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
							required
						/>
						{errors.firstName && <p className="errors">{errors.firstName}</p>}
					</label>
					<label>
						Last Name
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
							required
						/>
						{errors.lastName && <p className="errors">{errors.lastName}</p>}
					</label>
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							required
						/>
						{errors.email && <p className="errors">{errors.email}</p>}
					</label>
					<label>
						Upload your profile picture:
						<input
							className="signup-input"
							type="file"
							onChange={(e) => setProfilePic(e.target.files[0])}
							accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
							required
						/>							
					</label>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
						{errors.password && <p className="errors">{errors.password}</p>}
					</label>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm Password"
							required
						/>
						{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
					</label>
				</div>
				<button disabled={disabled} id={buttonId} type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;