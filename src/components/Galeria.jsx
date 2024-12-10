
import React, { useState } from "react";

const Galeria = () => {
  // Ruta de las imágenes dentro de la carpeta 'public/images'
  const images = [
    { src: "/images/galeria/galeria_1.jpg", category: "campo" },
    { src: "/images/galeria/galeria_2.jpg", category: "campo" },
    { src: "/images/galeria/galeria_3.jpg", category: "campo" },
    { src: "/images/galeria/galeria_4.jpg", category: "campo" },
    { src: "/images/galeria/galeria_5.jpg", category: "roble" },
    { src: "/images/galeria/galeria_6.jpg", category: "roble" },
    { src: "/images/galeria/galeria_7.jpg", category: "roble" },
    { src: "/images/galeria/galeria_8.jpg", category: "roble" },
    { src: "/images/galeria/galeria_9.jpg", category: "roble" },
    { src: "/images/galeria/galeria_10.jpg", category: "roble" },
    { src: "/images/galeria/galeria_11.jpg", category: "roble" },
    { src: "/images/galeria/galeria_12.jpg", category: "roble" },
    { src: "/images/galeria/galeria_13.jpg", category: "roble" },
    { src: "/images/galeria/galeria_14.jpg", category: "roble" },
    { src: "/images/galeria/galeria_15.jpg", category: "roble" },
    { src: "/images/galeria/galeria_16.jpg", category: "roble" },
    { src: "/images/galeria/galeria_17.jpg", category: "roble" },
    { src: "/images/galeria/galeria_18.jpg", category: "roble" },
    { src: "/images/galeria/galeria_19.jpg", category: "roble" },
    { src: "/images/galeria/galeria_20.jpg", category: "roble" },
    { src: "/images/galeria/galeria_21.jpg", category: "roble" },
    { src: "/images/galeria/galeria_22.jpg", category: "roble" },
    { src: "/images/galeria/galeria_23.jpg", category: "campo" },
    { src: "/images/galeria/galeria_24.jpg", category: "campo" },
    { src: "/images/galeria/galeria_25.jpg", category: "campo" },
    { src: "/images/galeria/galeria_26.jpg", category: "roble" },
    { src: "/images/galeria/galeria_27.jpg", category: "roble" },
    { src: "/images/galeria/galeria_28.jpg", category: "roble" },
    { src: "/images/galeria/galeria_29.jpg", category: "roble" },
    { src: "/images/galeria/galeria_30.jpg", category: "roble" },
    { src: "/images/galeria/galeria_31.jpg", category: "roble" },
    { src: "/images/galeria/galeria_32.jpg", category: "roble" },
    { src: "/images/galeria/galeria_33.jpg", category: "roble" },
    { src: "/images/galeria/galeria_34.jpg", category: "roble" },
    { src: "/images/galeria/galeria_35.jpg", category: "roble" },
    { src: "/images/galeria/galeria_36.jpg", category: "roble" },
    { src: "/images/galeria/galeria_37.jpg", category: "roble" },
    { src: "/images/galeria/galeria_38.jpg", category: "roble" },
    { src: "/images/galeria/galeria_39.jpg", category: "roble" },
    { src: "/images/galeria/galeria_40.jpg", category: "roble" },
    { src: "/images/galeria/galeria_41.jpg", category: "roble" },
    { src: "/images/galeria/galeria_42.jpg", category: "roble" },
    { src: "/images/galeria/galeria_43.jpg", category: "roble" },
    { src: "/images/galeria/galeria_44.jpg", category: "roble" },
    { src: "/images/galeria/galeria_45.jpg", category: "roble" },
    { src: "/images/galeria/galeria_46.jpg", category: "roble" },
    { src: "/images/galeria/galeria_47.jpg", category: "roble" },
    { src: "/images/galeria/galeria_48.jpg", category: "roble" },
    { src: "/images/galeria/galeria_49.jpg", category: "roble" },
    { src: "/images/galeria/galeria_50.jpg", category: "roble" },
    { src: "/images/galeria/galeria_51.jpg", category: "roble" },
    { src: "/images/galeria/galeria_52.jpg", category: "roble" },
    { src: "/images/galeria/galeria_53.jpg", category: "roble" },
    { src: "/images/galeria/galeria_54.jpg", category: "roble" },
    { src: "/images/galeria/galeria_55.jpg", category: "roble" },
    { src: "/images/galeria/galeria_56.jpg", category: "roble" },
    { src: "/images/galeria/galeria_57.jpg", category: "roble" },
    { src: "/images/galeria/galeria_58.jpg", category: "campo" },
    { src: "/images/galeria/galeria_59.jpg", category: "campo" },
    { src: "/images/galeria/galeria_60.jpg", category: "campo" },
    { src: "/images/galeria/galeria_61.jpg", category: "campo" },
    { src: "/images/galeria/galeria_62.jpg", category: "campo" },
    { src: "/images/galeria/galeria_63.jpg", category: "campo" },
    { src: "/images/galeria/galeria_64.jpg", category: "campo" },
    { src: "/images/galeria/galeria_65.jpg", category: "campo" },
    { src: "/images/galeria/galeria_66.jpg", category: "campo" },
    { src: "/images/galeria/galeria_67.jpg", category: "campo" },
    { src: "/images/galeria/galeria_68.jpg", category: "campo" },
    { src: "/images/galeria/galeria_69.jpg", category: "campo" },
    { src: "/images/galeria/galeria_70.jpg", category: "campo" },
    { src: "/images/galeria/galeria_71.jpg", category: "campo" },
    { src: "/images/galeria/galeria_72.jpg", category: "campo" },
    { src: "/images/galeria/galeria_73.jpg", category: "campo" },
    { src: "/images/galeria/galeria_74.jpg", category: "campo" },
    { src: "/images/galeria/galeria_75.jpg", category: "campo" },
    { src: "/images/galeria/galeria_76.jpg", category: "campo" },
    { src: "/images/galeria/galeria_77.jpg", category: "campo" },
    { src: "/images/galeria/galeria_78.jpg", category: "campo" },
    { src: "/images/galeria/galeria_79.jpg", category: "campo" },
    { src: "/images/galeria/galeria_80.jpg", category: "campo" },
    { src: "/images/galeria/galeria_81.jpg", category: "campo" },
    { src: "/images/galeria/galeria_82.jpg", category: "campo" },
    { src: "/images/galeria/galeria_83.jpg", category: "campo" },
    { src: "/images/galeria/galeria_84.jpg", category: "campo" },
    { src: "/images/galeria/galeria_85.jpg", category: "campo" },
    { src: "/images/galeria/galeria_86.jpg", category: "campo" },
    { src: "/images/galeria/galeria_87.jpg", category: "campo" },
    { src: "/images/galeria/galeria_88.jpg", category: "campo" },
    { src: "/images/galeria/galeria_89.jpg", category: "campo" },
    { src: "/images/galeria/galeria_90.jpg", category: "campo" },
    { src: "/images/galeria/galeria_91.jpg", category: "campo" },
    { src: "/images/galeria/galeria_92.jpg", category: "campo" },
    { src: "/images/galeria/galeria_93.jpg", category: "campo" },
    { src: "/images/galeria/galeria_94.jpg", category: "campo" },
    { src: "/images/galeria/galeria_95.jpg", category: "campo" },
    { src: "/images/galeria/galeria_96.jpg", category: "campo" },
    { src: "/images/galeria/galeria_97.jpg", category: "campo" },
    { src: "/images/galeria/galeria_98.jpg", category: "campo" },
    { src: "/images/galeria/galeria_99.jpg", category: "campo" },
    { src: "/images/galeria/galeria_100.jpg", category: "campo" },
    { src: "/images/galeria/galeria_101.jpg", category: "campo" },
    { src: "/images/galeria/galeria_102.jpg", category: "campo" },
    { src: "/images/galeria/galeria_103.jpg", category: "campo" },
    { src: "/images/galeria/galeria_104.jpg", category: "campo" },
    { src: "/images/galeria/galeria_105.jpg", category: "campo" },
    { src: "/images/galeria/galeria_106.jpg", category: "campo" },
    { src: "/images/galeria/galeria_107.jpg", category: "campo" },
    { src: "/images/galeria/galeria_108.jpg", category: "campo" },
    { src: "/images/galeria/galeria_109.jpg", category: "campo" },
    { src: "/images/galeria/galeria_110.jpg", category: "campo" },
    { src: "/images/galeria/galeria_111.jpg", category: "roble" },
    { src: "/images/galeria/galeria_112.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_113.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_114.jpg", category: "campo" },
    { src: "/images/galeria/galeria_115.jpg", category: "campo" },
    { src: "/images/galeria/galeria_116.jpg", category: "campo" },
    { src: "/images/galeria/galeria_117.jpg", category: "campo" },
    { src: "/images/galeria/galeria_118.jpg", category: "campo" },
    { src: "/images/galeria/galeria_119.jpg", category: "campo" },
    { src: "/images/galeria/galeria_120.jpg", category: "campo" },
    { src: "/images/galeria/galeria_121.jpg", category: "campo" },
    { src: "/images/galeria/galeria_122.jpg", category: "campo" },
    { src: "/images/galeria/galeria_123.jpg", category: "campo" },
    { src: "/images/galeria/galeria_124.jpg", category: "campo" },
    { src: "/images/galeria/galeria_125.jpg", category: "campo" },
    { src: "/images/galeria/galeria_126.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_127.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_128.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_129.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_130.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_131.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_132.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_133.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_134.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_135.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_136.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_137.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_138.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_139.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_140.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_141.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_142.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_143.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_144.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_145.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_146.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_147.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_148.jpg", category: "caoba" },
    { src: "/images/galeria/galeria_149.jpg", category: "campo" },

  ];

    // Estado para la página actual, el modal y el filtro
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState("todos"); // Categoría seleccionada
  
    const imagesPerPage = 10;
    const maxPageNumbers = 5;
  
    // Filtrar imágenes según la categoría seleccionada
    const filteredImages =
      filter === "todos" ? images : images.filter((img) => img.category === filter);
  
    // Calcular las imágenes a mostrar en la página actual
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);
  
    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  
    // Rango de páginas para mostrar
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
  
    // Funciones del modal
    const openModal = (image) => {
      setSelectedImage(image);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedImage(null);
    };
  
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  
    return (
      <div className="max-w-7xl mx-auto p-4">
        {/* Filtros */}
        <div className="flex justify-center space-x-4 mb-8">
          {["todos", "caoba", "roble", "campo"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${
                filter === category
                  ? "bg-red-700 text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => {
                setFilter(category);
                setCurrentPage(1); // Reinicia a la primera página al cambiar el filtro
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
  
        {/* Imagen principal */}
        {currentImages.length > 0 && (
          <div className="mb-8">
            <img
              src={currentImages[0].src}
              alt="Principal"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
  
        {/* Otras imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentImages.slice(1).map((image, index) => (
            <div key={index} className="relative group h-64">
              <img
                src={image.src}
                alt={`Imagen ${index + 2}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105 cursor-pointer"
                onClick={() => openModal(image.src)}
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