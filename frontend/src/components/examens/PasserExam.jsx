/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";

const PasserExamen = ({ coursId, onRetour }) => {
  const [examen, setExamen] = useState(null);
  const [reponses, setReponses] = useState([]);
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const chargerExamen = async () => {
      try {
        setLoading(true);
        const examenResponse = await axios.get(`http://localhost:3000/examens/cours/${coursId}`);
        setExamen(examenResponse.data.data);
        setReponses(new Array(examenResponse.data.data.questions.length).fill(''));
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.response?.data?.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    chargerExamen();
  }, [coursId]);

  const handleReponseChange = (index, reponse) => {
    const newReponses = [...reponses];
    newReponses[index] = reponse;
    setReponses(newReponses);
  };

  const soumettrExamen = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        alert("Vous devez être connecté pour passer l'examen");
        return;
      }
      
      if (reponses.some(reponse => reponse === '')) {
        alert("Veuillez répondre à toutes les questions");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/examens/${examen.id_examen}/passer`,
        {
          id_utilisateur: userId,
          reponses
        }
      );
      
      if (response.data.success) {
        setResultat(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Erreur de soumission:', error);
      alert(error.response?.data?.message || "Une erreur est survenue lors de la soumission");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
        <button 
          onClick={onRetour}
          className="mt-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux cours
        </button>
      </div>
    );
  }

  if (resultat) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
            resultat.resultat === 'REUSSI' ? 'bg-green-100' : 'bg-red-100'
          } mb-4`}>
            <svg className={`w-8 h-8 ${
              resultat.resultat === 'REUSSI' ? 'text-green-600' : 'text-red-600'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {resultat.resultat === 'REUSSI' 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Résultat de l'Examen</h2>
          <div className="text-3xl font-bold mb-2">
            {resultat.note.toFixed(2)}%
          </div>
          <div className={`inline-block px-4 py-2 rounded-full font-medium ${
            resultat.resultat === 'REUSSI' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {resultat.resultat}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Détails des réponses :</h3>
          {resultat.details.map((detail, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              detail.estCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className="font-medium mb-2">{detail.question}</p>
              <p className={`text-sm ${
                detail.estCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                Votre réponse : {detail.reponseUtilisateur}
              </p>
            </div>
          ))}
        </div>

        <button 
          onClick={onRetour}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Retour aux cours
        </button>
      </div>
    );
  }

  const totalQuestions = examen.questions.length;
  const currentQuestionData = examen.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{examen.titre}</h2>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} sur {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium mb-6">{currentQuestionData.enonce}</p>
        
        <div className="space-y-3">
          {currentQuestionData.type === 'choix_multiple' && 
            currentQuestionData.options.map((option, optIndex) => (
              <label 
                key={optIndex} 
                className={`block p-4 rounded-lg border-2 transition-all cursor-pointer
                  ${reponses[currentQuestion] === option 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center">
                  <input 
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={reponses[currentQuestion] === option}
                    onChange={() => handleReponseChange(currentQuestion, option)}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${reponses[currentQuestion] === option 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                    }`}
                  >
                    {reponses[currentQuestion] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </label>
            ))
          }

          {currentQuestionData.type === 'vrai_faux' && (
            <div className="grid grid-cols-2 gap-4">
              {['vrai', 'faux'].map((option) => (
                <label 
                  key={option}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer text-center
                    ${reponses[currentQuestion] === option 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={reponses[currentQuestion] === option}
                    onChange={() => handleReponseChange(currentQuestion, option)}
                    className="hidden"
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-lg font-medium transition-colors
            ${currentQuestion === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          Question précédente
        </button>
        
        {currentQuestion === totalQuestions - 1 ? (
          <button 
            onClick={soumettrExamen}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Terminer l'examen
          </button>
        ) : (
          <button 
            onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Question suivante
          </button>
        )}
      </div>
    </div>
  );
};

export default PasserExamen;