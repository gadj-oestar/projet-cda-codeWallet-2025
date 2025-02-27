import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tag() {
  const [tags, setTags] = useState([]);  // État pour stocker les tags

  useEffect(() => {
    // Charger les tags depuis la base de données ou une API
    window.api.getFragments().then((fragments) => {
      const uniqueTags = [...new Set(fragments.map(fragment => fragment.tag))]; // Récupérer les tags uniques
      setTags(uniqueTags); // Mettre à jour l'état des tags
    });
  }, []); // Le tableau vide signifie que cet effet se déclenche uniquement lors du montage du composant

  return (
    <div>
      <h1>Liste des Tags</h1>
      {tags.length > 0 ? (
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              <Link to={`/tag/${tag}`}>{tag}</Link> {/* Lien vers une page de détail du tag */}
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
