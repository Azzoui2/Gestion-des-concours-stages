const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialisation de l'application Express
const PORT = 5000;

// Middleware
const app = express();
app.use(cors());
app.use(express.json()); // Ajout du middleware pour parser le corps des requêtes en JSON

// Connexion à la base de données MongoDB
//mongoose.connect('mongodb+srv://fstz:1gDzUVieh5OOH3RB@cluster0.njdhb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {})
  

mongoose.connect('mongodb://localhost:27017/votreNomDeBaseDeDonnees', {
  
})
.then(() => console.log('Connecté à la base de données MongoDB'))
.catch(err => console.error('Erreur de connexion :', err));

// Création d'un schéma Mongoose
const CNCSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  lien: { type: String, required: true },
  date: { type: Date, required: true },
  date2: { type: Date, required: true },
  confirmation: { type: Boolean, default: false },
});

// Création d'un modèle
const CNC = mongoose.model('CNC', CNCSchema);

// Route pour ajouter des données
app.post('/api/ajouter', async (req, res) => {
  const { nom, lien, date, date2, confirmation } = req.body;

  // Validation des données d'entrée
  if (!nom || !lien || !date || !date2) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const nouveauCNC = new CNC({ nom, lien, date, date2, confirmation });

  try {
    await nouveauCNC.save();
    res.status(201).json({ message: 'Données ajoutées avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout des données', error });
  }
});

// Route pour récupérer tous les CNC
app.get('/api/concours', async (req, res) => {
  try {
    const cncs = await CNC.find();
    res.status(200).json(cncs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des CNC', error });
  }
});

// Route pour modifier la confirmation d'un CNC
app.patch('/api/ajouter/:id', async (req, res) => {
  const { id } = req.params;
  const { confirmation } = req.body;

  try {
    const result = await CNC.findByIdAndUpdate(id, { confirmation }, { new: true });
    if (!result) {
      return res.status(404).send('CNC non trouvé');
    }
    res.send(result);
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour de la confirmation');
  }
});

// Route pour supprimer un CNC par ID
app.delete('/api/ajouter/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCNC = await CNC.findByIdAndDelete(id);
    if (!deletedCNC) {
      return res.status(404).json({ message: 'CNC non trouvé' });
    }
    res.status(200).json({ message: 'CNC supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du CNC', error });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
