import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this recipe.');
          return;
        }
        const response = await axios.get(`http://localhost:4000/api/recipes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch recipe');
        console.error('Failed to fetch recipe:', err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to delete a recipe.');
        return;
      }
      await axios.delete(`http://localhost:4000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/home'); // Redirect to home after deleting
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete recipe');
      console.error('Failed to delete recipe:', err);
    }
  };

  if (error) {
    return <div className="recipe-detail-container"><p className="error">{error}</p></div>;
  }

  if (!recipe) {
    return <div className="recipe-detail-container">Loading...</div>;
  }

  return (
    <div className="recipe-detail-container">
      <h2>{recipe.name}</h2>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default RecipeDetail;
