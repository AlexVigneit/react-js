import React, { useState } from 'react';
import './App.css';

function App() {
  // Déclaration des états en utilisant le hook useState
  const [tasks, setTasks] = useState([]); // État pour stocker les objectifs
  const [newTask, setNewTask] = useState(''); // État pour stocker l'objectif en cours de saisie
  

  // Fonction pour ajouter un nouvel objectif à la liste
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]); // Ajoute le nouvel objectif à la liste des objectifs
      setNewTask(''); // Réinitialise l'input pour saisir un nouvel objectif
    }
  };

  // Fonction pour supprimer un objectif de la liste
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Crée une nouvelle liste en filtrant l'objectif à supprimer
    setTasks(updatedTasks); // Met à jour la liste des objectifs en supprimant l'objectif sélectionné
  };

  const editTask = (index) => {
    const updatedTask = prompt('Modifier la tâche', tasks[index]);
    if (updatedTask !== null) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setTasks(updatedTasks);
    }
  };

  // Rendu du composant
  return (
    <div>
      <h1>Objectifs de vie</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nouvel objectif"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button onClick={() => editTask(index)}>Editer</button>
            <button onClick={() => removeTask(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; // Exporte le composant App pour être utilisé ailleurs dans l'application