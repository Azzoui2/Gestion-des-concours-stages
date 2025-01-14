import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListCNC() {
  const [cncs, setCncs] = useState([]);
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre de CNC par page

  // Fonction pour récupérer les CNC
  const fetchCncs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/concours');
      
      // Trier les CNC par date CNC (Date CNC)
      const sortedCncs = response.data.sort((a, b) => new Date(a.date2) - new Date(b.date2));
      
      setCncs(sortedCncs); // Mettre à jour les CNC avec l'ordre trié
    } catch (error) {
      console.error("Erreur lors de la récupération des CNC :", error);
      setError("Erreur lors de la récupération des CNC.");
    }
  };

  // Fonction pour modifier la confirmation d'un CNC
  const handleConfirmationToggle = async (id, currentConfirmation) => {
    const confirmChange = window.confirm(`Êtes-vous sûr de vouloir ${currentConfirmation ? 'désactiver' : 'activer'} la confirmation ?`);
    if (!confirmChange) return; // Sortir si l'utilisateur annule

    try {
      await axios.patch(`http://localhost:5000/api/ajouter/${id}`, {
        confirmation: !currentConfirmation // Inverser l'état de confirmation
      });
      fetchCncs(); // Mettre à jour la liste après modification
    } catch (error) {
      console.error("Erreur lors de la modification de la confirmation :", error);
      setError("Erreur lors de la modification de la confirmation.");
    }
  };

  // Fonction pour supprimer un CNC par ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce CNC ?");
    if (!confirmDelete) return; // Sortir si l'utilisateur annule

    try {
      await axios.delete(`http://localhost:5000/api/ajouter/${id}`);
      fetchCncs(); // Mettre à jour la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du CNC :", error);
      setError("Erreur lors de la suppression du CNC.");
    }
  };

  useEffect(() => {
    fetchCncs(); // Appel de la fonction pour récupérer les CNC lors du chargement du composant
  }, []);

  // Calculer les indices des CNC à afficher en fonction de la page
  const indexOfLastCNC = currentPage * itemsPerPage;
  const indexOfFirstCNC = indexOfLastCNC - itemsPerPage;
  const currentCncs = cncs.slice(indexOfFirstCNC, indexOfLastCNC);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Générer la liste des numéros de pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cncs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ height: '100vh' }}>
      <br />   <br /> <br />
      <div className="table-responsive">
        <h2 className="text-center">Liste des CNC</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <table  className="table table-striped" style={{ width: '80%', margin: 'auto' }}>
          <thead className="thead-dark">
            <tr>
              <th>Nom</th>
              <th>Lien</th>
              <th>Date Délai</th>
              <th>Date CNC</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCncs.map(cnc => (
              <tr key={cnc._id}>
                <td>{cnc.nom}</td>
                <td><a href={cnc.lien} target="_blank" rel="noopener noreferrer">{cnc.lien}</a></td>
                <td>{new Date(cnc.date).toLocaleDateString()}</td>
                <td>{new Date(cnc.date2).toLocaleDateString()}</td>
                <td>
                  <button 
                    className={`btn ${cnc.confirmation ? 'btn-secondary' : 'btn-success'}`} 
                    onClick={() => handleConfirmationToggle(cnc._id, cnc.confirmation)}
                  >
                    {cnc.confirmation ? 'NON' : 'OUI'}
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(cnc._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            {pageNumbers.map(number => (
              <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ListCNC;
