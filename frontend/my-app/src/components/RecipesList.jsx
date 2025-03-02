import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/RecipesList.css';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view recipes.');
          return;
        }
        const response = await axios.get('http://localhost:4000/api/recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipes(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch recipes');
        console.error('Failed to fetch recipes:', err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes-list-container">
      <h2>Recipes</h2>
      {error && <p className="error">{error}</p>}
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <Link to={`/recipe/${recipe._id}`}>
              {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
              <h3>{recipe.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
