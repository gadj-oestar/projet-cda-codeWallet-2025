import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tag() {
  const [tags, setTags] = useState([]);  // État pour stocker les tags

  useEffect(() => {
    if (!window.api) {
      console.error(" window.api est undefined");
      return;
    }
    
    window.api.getFragments()
      .then((fragments) => {
        const uniqueTags = [...new Set(fragments.map(fragment => fragment.tag))]; // Récupérer les tags uniques
        setTags(uniqueTags); // Mettre à jour l'état des tags
      })
      .catch(error => console.error("Erreur lors de la récupération des fragments :", error));
  }, []); // Ce useEffect se déclenche une seule fois au démarrage

  return (
    <div>
      <h1 className='e_tag'>Liste des Tags</h1>
      {tags.length > 0 ? (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <Link to={`/tag/${encodeURIComponent(tag)}`}>{tag}</Link> 
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun tag trouvé.</p>
      )}
    </div>
  );
}

export default Tag;
