/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Lock,
  UserCircle,
  GraduationCap,
  Phone,
} from "lucide-react";

const ProfRegister = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ENSEIGNANT",
    diplome: "",
    phone: "",
    langueEnseigner: "",
  });

  const [error, setError] = useState(null);
  const [langues, setLangues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLangues = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all/lang");
        setLangues(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des langues:", error);
      }
    };
    fetchLangues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/prof/register", {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        diplome: formData.diplome,
        num_phone: formData.phone,
        id_langue: parseInt(formData.langueEnseigner),
      });

      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-300 from-blue-50 to-blue-100">
      {/* Formulaire Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="text-center space-y-4">
            <UserPlus className="h-12 w-12 text-blue-600 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">
              Créer un Compte Enseignant
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                icon={UserCircle}
                required
              />
              <FormField
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                icon={UserCircle}
                required
              />
            </div>

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
              required
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Diplôme"
                name="diplome"
                value={formData.diplome}
                onChange={handleChange}
                icon={GraduationCap}
                required
              />
              <FormField
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={Phone}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                label="Mot de passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
                required
              />
              <FormField
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                icon={Lock}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Langue à enseigner
              </label>
              <div className="relative">
                <select
                  name="langueEnseigner"
                  value={formData.langueEnseigner}
                  onChange={handleChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  required
                >
                  <option value="">Sélectionnez une langue</option>
                  {langues.map((langue) => (
                    <option key={langue.id_langue} value={langue.id_langue}>
                      {langue.nom_langue}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src="/images/profregister.jpg"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
            <div className="max-w-md mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Rejoignez notre communauté d'apprentissage
              </h2>
              <p className="text-lg">
                Partagez vos compétences avec Infinity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant FormField réutilisable
const FormField = ({ label, name, type = "text", value, onChange, icon: Icon, required }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Icon className="h-5 w-5" />
        </div>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>
    </div>
  );
};

export default ProfRegister;