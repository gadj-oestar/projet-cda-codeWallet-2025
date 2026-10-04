import PageHeader from '../components/PageHeader'

const DATA_POLICY = [
  { label: 'Confidentialité', text: 'toutes les données sont stockées en local.' },
  { label: 'Transparence', text: 'aucune collecte de données personnelles.' },
  { label: 'Sécurité', text: 'les fragments sont enregistrés dans une base SQLite locale.' }
]

function AboutPage() {
  return (
    <>
      <PageHeader title="À propos" />

      <div className="about">
        <section className="card">
          <h2 className="section-title">Le développeur</h2>
          <p>
            Ce projet a été développé en solo par <strong>Gad Tshipata</strong>, développeur
            fullstack React et Electron. L&apos;objectif est de proposer une solution simple pour
            gérer et sauvegarder des fragments de code.
          </p>
        </section>

        <section className="card">
          <h2 className="section-title">Gestion des données</h2>
          <ul className="policy-list">
            {DATA_POLICY.map(({ label, text }) => (
              <li key={label}>
                <strong>{label} :</strong> {text}
              </li>
            ))}
          </ul>
          <p className="muted">Pour toute question sur la gestion des données, contactez-moi.</p>
        </section>
      </div>
    </>
  )
}

export default AboutPage
