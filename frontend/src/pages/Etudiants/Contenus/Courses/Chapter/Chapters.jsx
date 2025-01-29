import { useState } from "react";
import { Header } from "../../../Accueil/Header/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../../../../data/courses.js";

const Chapters = () => {
    const { titre } = useParams();
    const chapters = data.find(course => course.titre === titre)?.chapters || [];
    const [currentChapter, setCurrentChapter] = useState(chapters[0]);
    const navigate = useNavigate();

    const nextChapter = () => {
        const currentIndex = chapters.indexOf(currentChapter);
        if (currentIndex < chapters.length - 1) {
            setCurrentChapter(chapters[currentIndex + 1]);
        }
    };

    const prevChapter = () => {
        const currentIndex = chapters.indexOf(currentChapter);
        if (currentIndex > 0) {
            setCurrentChapter(chapters[currentIndex - 1]);
        }
    };

    const showChapter = (title) => {
        setCurrentChapter(chapters.find(chapter => chapter.title === title));
    };

    const finishChapter = () => {
        navigate(`/courses`);
    };

    return (
        <div className="min-h-screen bg-blue-100 text-blue-900 flex flex-col">
            <Header />
            <div className="flex flex-grow p-6 gap-6">
                {/* Liste des chapitres */}
                <div className="w-1/4 bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-blue-700">Chapitres</h3>
                    <ul className="space-y-2">
                        {chapters.map(chapter => (
                            <li
                                key={chapter.title}
                                onClick={() => showChapter(chapter.title)}
                                className={`cursor-pointer p-2 rounded-lg hover:bg-blue-300 ${
                                    currentChapter?.title === chapter.title ? "bg-blue-400" : ""
                                }`}
                            >
                                {chapter.title}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Contenu du chapitre */}
                <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-blue-700 mb-4">{currentChapter?.title}</h4>
                    <p className="mb-4 text-gray-700">{currentChapter?.content?.text}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {currentChapter?.content?.images?.map((image, index) => (
                            <img key={index} src={image} alt="Chapter Illustration" className="rounded-lg shadow-md" />
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                        {chapters.indexOf(currentChapter) > 0 && (
                            <button onClick={prevChapter} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                Précédent
                            </button>
                        )}
                        {chapters.indexOf(currentChapter) < chapters.length - 1 ? (
                            <button onClick={nextChapter} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                Suivant
                            </button>
                        ) : (
                            <button onClick={finishChapter} className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800">
                                Terminer
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapters;
