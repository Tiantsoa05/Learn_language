import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pdfjs } from 'react-pdf';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Header } from "../../pages/Etudiants/Accueil/Header/Header";
import { ArrowLeft } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

const FileViewer = () => {
  const { id } = useParams();
  const [actualCourse, setActualCourse] = useState(null);
  const [fileType, setFileType] = useState(null);
  const prof = localStorage.getItem("prof");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (!prof) return;

    axios
      .get(`http://localhost:3000/courses/all/${prof}`)
      .then((response) => {
        const course = response.data.find((course) => course.id === parseInt(id));
        if (course) {
          setActualCourse(course);
          if (course.contenu_cours.endsWith(".mp4")) setFileType("video");
          else if (course.contenu_cours.endsWith(".pdf")) setFileType("pdf");
          else setFileType("unknown");
        }
      })
      .catch((error) => console.error("Erreur lors de la récupération du cours :", error));
  }, [id, prof]);

  if (!actualCourse) return <div className="text-center text-xl text-blue-700 mt-8">Cours introuvable.</div>;

  const fileUrl = actualCourse.contenu_cours.replace(
    "/home/joss/Bureau/App-rentissage/backend",
    "http://localhost:3000"
  );

  return (
    <>
      <Header />
      <div className="flex flex-col h-[85vh] bg-blue-100 text-blue-900">
        <div className="flex items-center mt-8 gap-[22vw] p-4">
          <Link to={'/courses'} className="text-blue-700 hover:text-blue-900">
            <ArrowLeft size={24} />
          </Link>
          <h3 className="text-lg font-semibold">{actualCourse.titre}</h3>
        </div>
        <div className="flex-grow overflow-auto p-6">
          <div className="max-w-screen-lg mx-auto">
            {fileType === "video" ? (
              <div className="relative w-full h-[60vh] bg-black rounded-lg overflow-hidden shadow-md">
                <video controls className="w-full h-full object-cover">
                  <source src={fileUrl} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            ) : fileType === "pdf" ? (
              <div className="relative w-full h-[80vh] bg-white rounded-lg overflow-hidden shadow-md border">
                <Worker workerUrl={`https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                  <div style={{ height: '500px' }}>
                    <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
                  </div>
                </Worker>
              </div>
            ) : (
              <div className="text-center text-blue-700">Type de fichier non pris en charge.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileViewer;
