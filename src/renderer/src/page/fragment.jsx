import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from "react-icons/ai";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeToggle from "../components/ThemeToggle";

function Fragment() {
  const [fragments, setFragments] = useState([]);
  const [selectedFragment, setSelectedFragment] = useState(null);
  const [editFragment, setEditFragment] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedTag, setEditedTag] = useState('');

  // Vérifie si window.api est disponible avant de faire l'appel API
  useEffect(() => {
    if (window.api) {
      // Charger les fragments depuis la base de données via Electron
      window.api.getFragments().then(setFragments).catch((err) => console.error("❌ Erreur lors de getFragments :", err));
    } else {
      console.error("❌ Erreur : window.api est undefined !");
    }
  }, []); // Ce useEffect se déclenche une seule fois au démarrage

  const deleteFragment = async (id) => {
    const response = await window.api.deleteFragment(id);
    if (response.success) {
      setFragments(fragments.filter(fragment => fragment.id !== id));
    }
  };

  const openModal = (fragment) => {
    setSelectedFragment(fragment);
  };

  const closeModal = () => {
    setSelectedFragment(null);
  };

  const openEditModal = (fragment) => {
    setEditFragment(fragment);
    setEditedTitle(fragment.title);
    setEditedTag(fragment.tag);
  };

  const closeEditModal = () => {
    setEditFragment(null);
  };

  const saveChanges = async () => {
    if (!editFragment) return;

    const updatedFragment = { ...editFragment, title: editedTitle, tag: editedTag };
    
    const response = await window.api.updateFragment(updatedFragment);
    if (response.success) {
      setFragments(fragments.map(frag => (frag.id === editFragment.id ? updatedFragment : frag)));
      closeEditModal();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);


  return (
    <main className='main'>
      <ThemeToggle />
      <button className='new_element'>
        <Link to="/formulaire">NEW</Link>
      </button>

      <section className='bloc_fragment'>
        {fragments.length > 0 ? (
          fragments.map((fragment) => (
            <div key={fragment.id} className="fragment">
              <h2>{fragment.title}</h2>
              <p>{fragment.tag}</p>
              {/* Bouton Supprimer */}
              <button onClick={() => deleteFragment(fragment.id)} className='delete' >
                <FaTrash size={20} color="red" />
              </button>
              {/* Bouton Modifier */}
              <button onClick={() => openEditModal(fragment)} className='edit' >
                <FaEdit size={20} color="blue" />
              </button>

              {/* Icône pour ouvrir la modale d'affichage */}
              <div style={{ fontSize: "34px", cursor: "pointer", marginTop: '10px' }} onClick={() => openModal(fragment)}>
                <AiOutlineEye />
              </div>
            </div>
          ))
        ) : (
          <p className='no_fragment'>Aucun fragment ajouté.</p>
        )}
      </section>

      {/* Modale d'affichage */}
      {selectedFragment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Fragment : {selectedFragment.title}</h2>
            <h3>Tag : {selectedFragment.tag}</h3>

            {/* Affichage du contenu avec coloration syntaxique */}
            <SyntaxHighlighter language="javascript" style={darcula}>
              {selectedFragment.content}
            </SyntaxHighlighter>
            
            <div className="modal-actions">
              <button onClick={closeModal}>Fermer</button>
            </div>
          </div>  
        </div>
      )}

      {/* formulaire de modification */}
      {editFragment && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>&times;</span>
            <h2>Edit Fragment</h2>
            <label>Titre :</label>
            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            
            <label>Tag :</label>
            <input type="text" value={editedTag} onChange={(e) => setEditedTag(e.target.value)} />
            
            <div className="modal-actions">
              <button onClick={saveChanges}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>  
        </div>
      )}
      
    </main>
  );
}

export default Fragment;
