import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = '30652c47';
  const APP_KEY = 'af20eba9b3d6c659e12edc355f2e04a9';
  const [search, setSearch] = useState("");
  const [query, SetQuery] = useState("chicken");
  
  useEffect(() => {
    getRecipes();
  }, [query]);

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    SetQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button 
          className="search-button" 
          type="submit">Search</button>
      </form>
      
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))} 
      </div>     
    </div>
  );
}

export default App;
