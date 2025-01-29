/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import axios from 'axios';
import PasserExamen from "../components/examens/PasserExam";

const Exam = () => {
  const [selectedCours, setSelectedCours] = useState(null);
  const [cours, setCours] = useState([]);
  const [mode, setMode] = useState('liste'); // 'liste', 'creer', 'passer', 'options'
  const [nombreQuestions, setNombreQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cours');
        setCours(response.data.data);
      } catch (error) {
        console.error('Erreur de chargement des cours', error);
      }
    };
    fetchCours();
  }, []);

  const initializeQuestions = (nombre) => {
    const newQuestions = Array(nombre).fill({
      type: 'choix_multiple',
      enonce: '',
      options: ['', '', '', ''],
      bonneReponse: ''
    });
    setQuestions(newQuestions);
  };

  const handleCoursClick = (coursId) => {
    setSelectedCours(coursId);
    setMode('options');
  };

  const handleCreateExam = () => {
    initializeQuestions(nombreQuestions);
    setMode('creer');
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'options') {
      newQuestions[index] = {
        ...newQuestions[index],
        options: value
      };
    } else {
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
    }
    setQuestions(newQuestions);
  };

  const saveExam = async () => {
    try {
      // Validate required fields
      if (!selectedCours) {
        alert('Veuillez sélectionner un cours');
        return;
      }
      
      // Validate questions
      const isValid = questions.every(q => 
        q.enonce && 
        q.bonneReponse && 
        (q.type === 'vrai_faux' || 
         (q.type === 'choix_multiple' && q.options.some(opt => opt)))
      );
      
      if (!isValid) {
        alert('Veuillez remplir toutes les questions avec leurs réponses');
        return;
      }
  
      await axios.post('http://localhost:3000/examens/creer', {
        id_cours: selectedCours,
        titre: `Examen du cours ${selectedCours}`,
        questions,
        seuil_reussite: 70.00
      });
      alert('Examen créé avec succès !');
      setMode('liste');
    } catch (error) {
      console.error('Erreur lors de la création de l\'examen', error.response?.data || error);
      alert(error.response?.data?.message || 'Erreur lors de la création de l\'examen');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {(mode === 'liste' && cours.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cours.map((c) => (
            <div 
              key={c.id_cours}
              onClick={() => handleCoursClick(c.id_cours)}
              className="border p-4 rounded shadow hover:shadow-lg cursor-pointer transition-all"
            >
              <h3 className="font-bold text-lg">{c.nom}</h3>
              <p className="text-gray-600">{c.langue} - Niveau {c.niveau_difficulte}</p>
            </div>
          ))}
        </div>
      )}

      {mode === 'options' && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold mb-4">Que souhaitez-vous faire ?</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setMode('passer')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Passer l'examen
            </button>
            <button 
              onClick={() => setMode('config')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Créer un examen
            </button>
          </div>
          <button 
            onClick={() => setMode('liste')}
            className="text-gray-600 hover:text-gray-800"
          >
            Retour à la liste
          </button>
        </div>
      )}

      {mode === 'config' && (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Configuration de l'examen</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de questions
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={nombreQuestions}
                onChange={(e) => setNombreQuestions(parseInt(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setMode('options')}
                className="text-gray-600 hover:text-gray-800"
              >
                Retour
              </button>
              <button
                onClick={handleCreateExam}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Créer les questions
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'creer' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Création de l'examen</h2>
          {questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg shadow">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  value={question.enonce}
                  onChange={(e) => handleQuestionChange(index, 'enonce', e.target.value)}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  placeholder="Énoncé de la question"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Type de question
                </label>
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  <option value="choix_multiple">Choix multiple</option>
                  <option value="vrai_faux">Vrai/Faux</option>
                </select>
              </div>

              {question.type === 'choix_multiple' && (
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[optIndex] = e.target.value;
                        handleQuestionChange(index, 'options', newOptions);
                      }}
                      className="block w-full border rounded-md shadow-sm p-2"
                      placeholder={`Option ${optIndex + 1}`}
                    />
                  ))}
                  <select
                    value={question.bonneReponse}
                    onChange={(e) => handleQuestionChange(index, 'bonneReponse', e.target.value)}
                    className="mt-2 block w-full border rounded-md shadow-sm p-2"
                  >
                    <option value="">Sélectionner la bonne réponse</option>
                    {question.options.map((opt, optIndex) => (
                      <option key={optIndex} value={opt}>{opt || `Option ${optIndex + 1}`}</option>
                    ))}
                  </select>
                </div>
              )}

              {question.type === 'vrai_faux' && (
                <select
                  value={question.bonneReponse}
                  onChange={(e) => handleQuestionChange(index, 'bonneReponse', e.target.value)}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                >
                  <option value="">Sélectionner la bonne réponse</option>
                  <option value="vrai">Vrai</option>
                  <option value="faux">Faux</option>
                </select>
              )}
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setMode('config')}
              className="text-gray-600 hover:text-gray-800"
            >
              Retour
            </button>
            <button
              onClick={saveExam}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Enregistrer l'examen
            </button>
          </div>
        </div>
      )}

      {mode === 'passer' && (
        <PasserExamen 
          coursId={selectedCours} // Changé de examenId à coursId
          onRetour={() => setMode('options')} 
        />
      )}
    </div>
  );
};

export default Exam;