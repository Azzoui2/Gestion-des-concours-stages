import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AjouCNC = () => {
  const [nom, setNom] = useState('');
  const [lien, setLien] = useState('');
  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/ajouter', {
        nom, lien, date, date2, confirmation
      });
      console.log('Réponse du serveur:', response.data);
      setMessage('Données ajoutées avec succès!');
      setError('');

      // Réinitialiser les champs du formulaire
      setNom('');
      setLien('');
      setDate('');
      setDate2('');
      setConfirmation('');
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      setError("Une erreur s'est produite lors de l'ajout.");
      setMessage('');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row>
         
          <h2 className="text-center">Entrez les informations du CNC</h2>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nom">
              <Form.Label>Nom:</Form.Label>
              <Form.Control
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="lien">
              <Form.Label>Lien:</Form.Label>
              <Form.Control
                type="text"
                value={lien}
                onChange={(e) => setLien(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date Délai:</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                 
              />
            </Form.Group>

            <Form.Group controlId="date2">
              <Form.Label>Date CNC:</Form.Label>
              <Form.Control
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                 
              />
            </Form.Group>

            <Form.Group controlId="confirmation">
              <Form.Label>Confirmation:</Form.Label>
              <Form.Control
                as="select"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                 
              >
                <option value="">Choisir</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" className="mt-3 w-100" variant="dark">
              Ajouter
            </Button>
          </Form>
        
      </Row>
    </Container>
  );
};

export default AjouCNC;
