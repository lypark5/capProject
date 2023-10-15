import { useEffect, useState } from "react";
import { getAllRecipesThunk, searchRecipeThunk } from "../../../store/recipes";
import { getAllUsersThunk } from "../../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import './GetAllRecipes.css';


const GetAllRecipesFunction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipes = useSelector(state => state.recipes.allRecipes);
  const users = useSelector(state => state.users.allUsers);
  const userArr = Object.values(users);
  const [searchWord, setSearchWord] = useState("");
  const [errors, setErrors] = useState({});
  const [chosenBgImg, setChosenBgImg] = useState('https://recipe-capstone-project.s3.us-east-2.amazonaws.com/food2v2.png');
  const [recipeArr, setRecipeArr] = useState([]);
  const background_imgs = [
    'https://recipe-capstone-project.s3.us-east-2.amazonaws.com/food2v2.png',
    'https://recipe-capstone-project.s3.us-east-2.amazonaws.com/food4v2.png',
    'https://recipe-capstone-project.s3.us-east-2.amazonaws.com/foodv2.png'
  ]


  const shuffled = () => {
    console.log('recipeARr beforeeeee', recipeArr)
    setRecipeArr(Object.values(recipes).map((a) => ({ sort: Math.random(), value: a }))   // recipeArr is initially empty [], gotta use Object.values(recipes) since recipeArr isn't filled yet [].
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value));
    console.log('recipeARr afteerrrrr', recipeArr)
  }

  useEffect(() => {
    dispatch(getAllRecipesThunk());
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    shuffled();
  }, [recipes]);          // this only goes into effect when we have recipes


  let imgStyle = {
    backgroundImage: `url('${chosenBgImg}`,
    width: '100%',
    height: '500px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'flex-end',
    margin: '0px'
  }

  recipeArr.forEach(recipe => {
    recipe['Author'] = userArr.find(user => user.id === recipe.userId)        // tacking on the 'author' user obj to every recipe object.  Success!
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsObj = {}
    setChosenBgImg(background_imgs[Math.floor(Math.random() * background_imgs.length)]);

    if (searchWord.trim().length === 0) {
      errorsObj.searchWord = "Please type a word before submitting"
    } else {    
      await dispatch(searchRecipeThunk(searchWord))                      // do i need a separate page for none found?
      history.push(`/recipes/all`); 
      setSearchWord('');
    }
    setErrors(errorsObj);
  };


  return (
    <div id='all-recipe-overlord'>
      <div id='food-bg-pic-div' style={imgStyle}>
        <h1 id='discover'><em>Discover new recipes!</em></h1>
      </div>    
      <div id='search-n-cards'>
        <div id='search-div'>
          <form id="search-form" onSubmit={handleSubmit}>
            <input
              id='search-input'
              type='text'
              placeholder="pancakes, ramen, etc."
              value={searchWord}
              onChange={e => setSearchWord(e.target.value)}
            />
            <button type='submit' id='search-button'><i class="fas fa-search"></i></button>
          </form>
          {errors.searchWord && <p className='errors'>{errors.searchWord}</p>}
        </div>
        <div id='all-cards-container'>
          {recipeArr.length ? recipeArr.map(recipe =>
            <NavLink to={`/recipes/${recipe.id}`} title={recipe.foodName} className='link'>
              <span key={recipe.id} id='all-recipes-card'>
                <img src={recipe.url} alt={recipe.foodName} id='all-recipes-pic'></img>
                <div id='profile-card'>
                  <img src={recipe.Author?.profilePic} alt={recipe.Author?.username} id='all-recipes-profile-pic'></img>
                  <div id='recipe-card-author-info'>
                    <span id='recipe-card-food-name'>{recipe.foodName}</span>
                    <span id='recipe-card-author-name'>by: {recipe.Author?.username}</span>
                  </div>
                </div>
              </span>
            </NavLink>
          )
        :
          <div id='no-recipe-div'>
            <p id='no-recipe-p'>No recipe matches your search.</p>
            <img src='https://recipe-capstone-project.s3.us-east-2.amazonaws.com/catPainting1.jpg' alt='sad_cat' id='sad-cat'/>
          </div>
        }
        </div>
      </div>
    </div>
  )
}



export default GetAllRecipesFunction