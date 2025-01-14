import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <br /> <br /> <br />
      <h1 className="display-4">Mohammad EL AZZAOUI</h1>
      <p className="lead">Bienvenue sur la plateforme des Concours</p>
      <h3>Concours Vrs.01</h3>
      <div className="mt-4">
        <a href="/ajouter" className="btn btn-primary btn-lg mr-2">Ajouter un CNC</a>
        <a href="/list" className="btn btn-secondary btn-lg">Voir les CNC</a>
      </div>
    </div>
  );
};

export default Home;
