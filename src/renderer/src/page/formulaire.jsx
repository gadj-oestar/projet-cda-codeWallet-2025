import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer le fragment à la base de données via Electron
    await window.api.addFragment({ title, tag });

    // Rediriger vers la liste des fragments
    navigate('/fragment');
  };

  return (
    <div>
      <h1>Formulaire</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="tag">Tag</label>
        <input type="text" id="tag" required value={tag} onChange={(e) => setTag(e.target.value)} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Form;
