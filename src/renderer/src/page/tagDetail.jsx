import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TagDetail() {
  const { tagName } = useParams();
  const [newTag, setNewTag] = useState(tagName);
  const [fragments, setFragments] = useState([]);
  const navigate = useNavigate();

  // Charger les fragments liés au tag
  useEffect(() => {
    window.api.getFragments().then((allFragments) => {
      const filtered = allFragments.filter(fragment => fragment.tag === tagName);
      setFragments(filtered);
    });
  }, [tagName]); // 🔥 Recharger les fragments si `tagName` change

  // Modifier le tag
  const handleUpdateTag = async (e) => {
    e.preventDefault();
    
    if (!newTag.trim()) {
      return;
    }

    try {
      for (const fragment of fragments) {
        await window.api.updateFragment({ ...fragment, tag: newTag });
      }

      // Forcer la mise à jour des fragments après modification
      window.api.getFragments().then((updatedFragments) => {
        const updatedList = updatedFragments.filter(frag => frag.tag === newTag);
        setFragments(updatedList);
      });

      // Rediriger vers le nouveau tag
      navigate(`/tag/${newTag}`, { replace: true });
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du tag :", error);
    }
  };

  // Supprimer le tag
  const handleDeleteTag = async () => {
    try {
      for (const fragment of fragments) {
        await window.api.deleteFragment(fragment.id);
      }
      console.log("🗑️ Tag supprimé avec succès !");

      // Revenir à la liste des tags après suppression
      navigate("/tag");
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du tag :", error);
    }
  };

  return (
    <div>
      <h1 className="title-formulaire">Modifier le tag : {tagName}</h1>
      <form onSubmit={handleUpdateTag} className="form">
        <label>Nouveau tag :</label>
        <input 
          type="text" 
          value={newTag} 
          onChange={(e) => setNewTag(e.target.value)} 
        />

        <button type="submit">Modifier</button>
        <button 
          type="button" 
          onClick={handleDeleteTag} 
          style={{ backgroundColor: "red", color: "white" }}
        >
          Supprimer
        </button>
        <button type="button" onClick={() => navigate("/tag")} className="btn btn-back">
            Retour
          </button>
      </form>

      <h2>Fragments associés :</h2>
      <ul>
        {fragments.map(fragment => (
          <li key={fragment.id}>{fragment.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TagDetail;
