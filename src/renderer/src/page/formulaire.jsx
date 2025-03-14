import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false); // État pour charger l'envoi
  const [error, setError] = useState(''); // Gérer l'erreur éventuelle
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis avec :", { title, tag });
  
    if (!window.api) {
      console.error("❌ window.api est undefined");
      return;
    }
  
    try {
      const response = await window.api.addFragment({ title, tag });
      if (response.success) {
        console.log("Fragment ajouté avec succès");
        navigate('/fragment');
      } else {
        console.error("❌ Échec de l'ajout du fragment");
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout du fragment :", error);
    }
    
  };

  return (
    <div>
      <h1 className='title-formulaire'>Formulaire</h1>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Titre du fragment"
        />

        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          required
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          aria-label="Tag du fragment"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Envoi...' : 'Create'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Form;
