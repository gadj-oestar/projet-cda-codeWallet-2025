import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Fragment() {
  const [fragments, setFragments] = useState([]);

  const deleteFragment = (id) => {
    setFragments(fragments.filter(fragment => fragment.id !== id));
  };
  // const updateFragment = (id, newTitle, newTag) => {
  //   setFragments(fragments.map(fragment =>
  //     fragment.id === id ? { ...fragment, title: newTitle, tag: newTag } : fragment
  //   ));
  // };
  useEffect(() => {
    // Charger les fragments depuis la base de données via Electron
    window.api.getFragments().then(setFragments);
  }, []);

  return (
    <main className='main'>
      <button className='new_element'>
        <Link to="/formulaire">NEW</Link>
      </button>

      <section className='bloc_fragment'>
        {fragments.length > 0 ? (
          fragments.map((fragment) => (
            <div key={fragment.id} className="fragment">
              <h2>{fragment.title}</h2>
              <p>{fragment.tag}</p>
              <button onClick={() => deleteFragment(fragment.id)}>❌ Supprimer</button>
             
            </div>
          ))
        ) : (
          <p>Aucun fragment ajouté.</p>
        )}
      </section>
    </main>
  );
}

export default Fragment;
