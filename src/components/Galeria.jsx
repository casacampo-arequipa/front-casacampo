
import React, { useState } from "react";

const Galeria = () => {
  // Ruta de las imágenes dentro de la carpeta 'public/images'
  const images = [
    "/images/galeria/galeria_1.jpg",
    "/images/galeria/galeria_2.jpg",
    "/images/galeria/galeria_3.jpg",
    "/images/galeria/galeria_4.jpg",
    "/images/galeria/galeria_5.jpg",
    "/images/galeria/galeria_6.jpg",
    "/images/galeria/galeria_7.jpg",
    "/images/galeria/galeria_8.jpg",
    "/images/galeria/galeria_9.jpg",
    "/images/galeria/galeria_10.jpg",
    "/images/galeria/galeria_11.jpg",
    "/images/galeria/galeria_12.jpg",
    "/images/galeria/galeria_13.jpg",
    "/images/galeria/galeria_14.jpg",
    "/images/galeria/galeria_15.jpg",
    "/images/galeria/galeria_16.jpg",
    "/images/galeria/galeria_17.jpg",
    "/images/galeria/galeria_18.jpg",
    "/images/galeria/galeria_19.jpg",
    "/images/galeria/galeria_20.jpg",
    "/images/galeria/galeria_21.jpg",
    "/images/galeria/galeria_22.jpg",
    "/images/galeria/galeria_23.jpg",
    "/images/galeria/galeria_24.jpg",
    "/images/galeria/galeria_25.jpg",
    "/images/galeria/galeria_26.jpg",
    "/images/galeria/galeria_27.jpg",
    "/images/galeria/galeria_28.jpg",
    "/images/galeria/galeria_29.jpg",
    "/images/galeria/galeria_30.jpg",
    "/images/galeria/galeria_31.jpg",
    "/images/galeria/galeria_32.jpg",
    "/images/galeria/galeria_33.jpg",
    "/images/galeria/galeria_34.jpg",
    "/images/galeria/galeria_35.jpg",
    "/images/galeria/galeria_36.jpg",
    "/images/galeria/galeria_37.jpg",
    "/images/galeria/galeria_38.jpg",
    "/images/galeria/galeria_39.jpg",
    "/images/galeria/galeria_40.jpg",
    "/images/galeria/galeria_41.jpg",
    "/images/galeria/galeria_42.jpg",
    "/images/galeria/galeria_43.jpg",
    "/images/galeria/galeria_44.jpg",
    "/images/galeria/galeria_45.jpg",
    "/images/galeria/galeria_46.jpg",
    "/images/galeria/galeria_47.jpg",
    "/images/galeria/galeria_48.jpg",
    "/images/galeria/galeria_49.jpg",
    "/images/galeria/galeria_50.jpg",
    "/images/galeria/galeria_51.jpg",
    "/images/galeria/galeria_52.jpg",
    "/images/galeria/galeria_53.jpg",
    "/images/galeria/galeria_54.jpg",
    "/images/galeria/galeria_55.jpg",
    "/images/galeria/galeria_56.jpg",
    "/images/galeria/galeria_57.jpg",
    "/images/galeria/galeria_58.jpg",
    "/images/galeria/galeria_59.jpg",
    "/images/galeria/galeria_60.jpg",
    "/images/galeria/galeria_61.jpg",
    "/images/galeria/galeria_62.jpg",
    "/images/galeria/galeria_63.jpg",
    "/images/galeria/galeria_64.jpg",
    "/images/galeria/galeria_65.jpg",
    "/images/galeria/galeria_66.jpg",
    "/images/galeria/galeria_67.jpg",
    "/images/galeria/galeria_68.jpg",
    "/images/galeria/galeria_69.jpg",
    "/images/galeria/galeria_70.jpg",
    "/images/galeria/galeria_71.jpg",
    "/images/galeria/galeria_72.jpg",
    "/images/galeria/galeria_73.jpg",
    "/images/galeria/galeria_74.jpg",
    "/images/galeria/galeria_75.jpg",
    "/images/galeria/galeria_76.jpg",
    "/images/galeria/galeria_77.jpg",
    "/images/galeria/galeria_78.jpg",
    "/images/galeria/galeria_79.jpg",
    "/images/galeria/galeria_80.jpg",
    "/images/galeria/galeria_81.jpg",
    "/images/galeria/galeria_82.jpg",
    "/images/galeria/galeria_83.jpg",
    "/images/galeria/galeria_84.jpg",
    "/images/galeria/galeria_85.jpg",
    "/images/galeria/galeria_86.jpg",
    "/images/galeria/galeria_87.jpg",
    "/images/galeria/galeria_88.jpg",
    "/images/galeria/galeria_89.jpg",
    "/images/galeria/galeria_90.jpg",
    "/images/galeria/galeria_91.jpg",
    "/images/galeria/galeria_92.jpg",
    "/images/galeria/galeria_93.jpg",
    "/images/galeria/galeria_94.jpg",
    "/images/galeria/galeria_95.jpg",
    "/images/galeria/galeria_96.jpg",
    "/images/galeria/galeria_97.jpg",
    "/images/galeria/galeria_98.jpg",
    "/images/galeria/galeria_99.jpg",
    "/images/galeria/galeria_100.jpg",
    "/images/galeria/galeria_101.jpg",
    "/images/galeria/galeria_102.jpg",
    "/images/galeria/galeria_103.jpg",
    "/images/galeria/galeria_104.jpg",
    "/images/galeria/galeria_105.jpg",
    "/images/galeria/galeria_106.jpg",
    "/images/galeria/galeria_107.jpg",
    "/images/galeria/galeria_108.jpg",
    "/images/galeria/galeria_109.jpg",
    "/images/galeria/galeria_110.jpg",
    "/images/galeria/galeria_111.jpg",
    "/images/galeria/galeria_112.jpg",
    "/images/galeria/galeria_113.jpg",
    "/images/galeria/galeria_114.jpg",
    "/images/galeria/galeria_115.jpg",
    "/images/galeria/galeria_116.jpg",
    "/images/galeria/galeria_117.jpg",
    "/images/galeria/galeria_118.jpg",
    "/images/galeria/galeria_119.jpg",
    "/images/galeria/galeria_120.jpg",
    "/images/galeria/galeria_121.jpg",
    "/images/galeria/galeria_122.jpg",
    "/images/galeria/galeria_123.jpg",
    "/images/galeria/galeria_124.jpg",
    "/images/galeria/galeria_125.jpg",
    "/images/galeria/galeria_126.jpg",
    "/images/galeria/galeria_127.jpg",
    "/images/galeria/galeria_128.jpg",
    "/images/galeria/galeria_129.jpg",
    "/images/galeria/galeria_130.jpg",
    "/images/galeria/galeria_131.jpg",
    "/images/galeria/galeria_132.jpg",
    "/images/galeria/galeria_133.jpg",
    "/images/galeria/galeria_134.jpg",
    "/images/galeria/galeria_135.jpg",
    "/images/galeria/galeria_136.jpg",
    "/images/galeria/galeria_137.jpg",
    "/images/galeria/galeria_138.jpg",
    "/images/galeria/galeria_139.jpg",
    "/images/galeria/galeria_140.jpg",
    "/images/galeria/galeria_141.jpg",
    "/images/galeria/galeria_142.jpg",
    "/images/galeria/galeria_143.jpg",
    "/images/galeria/galeria_144.jpg",
    "/images/galeria/galeria_145.jpg",
    "/images/galeria/galeria_146.jpg",
    "/images/galeria/galeria_147.jpg",
    "/images/galeria/galeria_148.jpg",
    "/images/galeria/galeria_149.jpg",

  ];

  // Estado para la página actual y el modal
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesPerPage = 10;
  const maxPageNumbers = 5; // Número máximo de páginas a mostrar en el paginador

  // Calcular las imágenes a mostrar en la página actual
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Rango de páginas para mostrar
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  // Función para abrir el modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Función para avanzar de página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para retroceder de página
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Imagen principal */}
      <div className="mb-8">
        <img
          src={currentImages[0]}
          alt="Principal"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Otras imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentImages.slice(1).map((image, index) => (
          <div key={index} className="relative group h-64">
            <img
              src={image}
              alt={`Imagen ${index + 2}`}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105 cursor-pointer"
              onClick={() => openModal(image)}
            />
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={prevPage}
          className="px-3 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === number
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={nextPage}
          className="px-3 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg w-full max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 p-2 text-red-500"
              onClick={closeModal}
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;