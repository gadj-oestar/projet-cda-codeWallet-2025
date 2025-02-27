


function About() {
  return (
    <main className="about-container">
      <section className="developer">
        <h2>Infos sur le développeur</h2>
        <p>
          Ce projet a été entièrement développé en solo par <strong>Gad Tshipata</strong>,  
          un développeur Fullstack passionné par React et Electron. L'objectif est de  
          proposer une solution simple et efficace pour la gestion et la sauvegarde  
          de fragments de code.
        </p>
      </section>

      <section className="legal">
        <h2>Cadre légal de gestion des données</h2>
        <p>
          La protection des données est une priorité. Voici les points essentiels :
        </p>
        <ul>
          <li><strong>Confidentialité :</strong> Toutes les données sont stockées en local.</li>
          <li><strong>Transparence :</strong> Aucune collecte de données personnelles.</li>
          <li><strong>Sécurité :</strong> Utilisation de SQLite pour une gestion sécurisée des fragments.</li>
        </ul>
        <p>
          Pour toute question sur la gestion des données, n’hésitez pas à me contacter.
        </p>
      </section>
    </main>
  );
}

export default About;
