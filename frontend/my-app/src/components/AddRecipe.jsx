import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State for the image URL
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a recipe.');
        return;
      }

      await axios.post(
        'http://localhost:4000/api/recipes',
        { name, ingredients, instructions, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Recipe added successfully!');
      setName('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe');
      console.error('Failed to add recipe:', err);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)" // Image URL input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
