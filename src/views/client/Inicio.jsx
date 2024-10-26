import React, { useEffect, useState, useContext } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import "../../styles/inicio.css";
import { CardInicio } from "../../components/CardInicio";
import ColoredSection from "../../components/Section/ColoredSection";
import WelcomeSection from "../../components/WelcomeSection";
import Contactanos from "../../components/Contactanos";
import { LanguageContext } from "../../components/LanguageContext";
import { useLocation } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import CabinCards from "./../../components/CabinCards";

export default function Inicio() {
  const viewMap = {
    "/": "Inicio",
    "/cabin-detail": "CabinDetail",
    "/welcome": "WelcomeSection",
    // Agrega más rutas y vistas aquí
  };
  const { translations, setCurrentView } = useContext(LanguageContext);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const viewName = viewMap[location.pathname] || "Inicio"; // Vista por defecto
    setCurrentView(viewName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setCurrentView]);

  useEffect(() => {
    Aos.init({
      duration: 1200, // duración de la animación en milisegundos
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [scrollPosition, setScrollPosition] = useState(0);

  // Control de desplazamiento para detectar el scroll
  window.addEventListener("scroll", () => {
    setScrollPosition(window.scrollY);
  });

  // Función para manejar el desplazamiento suave
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = [
    { src: "/images/cc_04.jpg", alt: "Lago con montañas y cabaña" },
    {
      src: "/images/cc_02.jpg",
      alt: "Persona frente a montaña nevada",
    },
    { src: "/images/cc_01.jpg", alt: "Grupo alrededor de una fogata" },
    {
      src: "/images/cc_03.jpg",
      alt: "Persona con chaqueta amarilla en bosque",
    },
  ];

  const serviceTexts = [
    {
      img: "/icons/wifi_gratis.png",
      title: translations.wifi_gratuito_title, // Traducción dinámica
      description: translations.wifi_gratuito_description, // Traducción dinámica
    },
    {
      img: "/icons/vista_montana.png",
      title: translations.vista_montana_title,
      description: translations.vista_montana_description,
    },
    {
      img: "/icons/estacionamiento.png",
      title: translations.estacionamiento_title,
      description: translations.estacionamiento_description,
    },
    {
      img: "/icons/seguridad_cam.png",
      title: translations.seguridad_24_7_title,
      description: translations.seguridad_24_7_description,
    },
    {
      img: "/icons/tv.png",
      title: translations.television_title,
      description: translations.television_description,
    },
    {
      img: "/icons/piscina.png",
      title: translations.piscina_title,
      description: translations.piscina_description,
    },
    {
      img: "/icons/cocina.png",
      title: translations.cocina_title,
      description: translations.cocina_description,
    },
    {
      img: "/icons/fogata.png",
      title: translations.fogata_title,
      description: translations.fogata_description,
    },
  ];

  const packsTexts = [
    {
      img: "/icons/pareja.png",
      title: "Pareja",
      description: translations.wifi_gratuito_description, // Traducción dinámica
    },
    {
      img: "/icons/familia.png",
      title: "Familiar",
      description: translations.vista_montana_description,
    },
    {
      img: "/icons/completo.png",
      title: "Completo",
      description: translations.estacionamiento_description,
    },
    {
      img: "/icons/casa_campo.png",
      title: "Casa campo",
      description: translations.seguridad_24_7_description,
    },
    {
      img: "/icons/dia_campo.png",
      title: "Día de campo",
      description: translations.television_description,
    },
    {
      img: "/icons/evento.png",
      title: "Eventos",
      description: translations.piscina_description,
    },
  ];

  return (
    <>
      <WelcomeSection />

      <div id="cabins">
        <ColoredSection backgroundColor="#F3F5F4">
          <section className="w-full h-auto flex flex-col items-center justify-center relative py-12 px-4">
            <main className="w-full flex flex-col gap-3 items-center justify-center">
              <h2 className="md:text-4xl text-2xl font-bold capitalize">
                Paquetes disponibles
              </h2>
              <p className="text-sm font-light text-center">
                Selecciona uno de nuestros paquetes para ver las cabañas
                disponibles
              </p>

              <div className="w-full h-auto flex flex-wrap justify-center lg:gap-7 sm:gap-10 gap-7 px-8 sm:px-0 mt-4">
                {packsTexts.map((service, index) => (
                  <CardInicio
                    onClick={() => setOpenModal(true)}
                    data-aos="flip-up"
                    key={index}
                    cardClass="relative group w-40 bg-white flex flex-col items-center justify-center gap-3 px-5 pb-5 pt-8 cursor-pointer transition duration-500 hover:shadow-xl rounded-xl border hover:border-green-600 overflow-hidden"
                    imageWrapperClass="w-20 h-20 relative z-10 object-cover"
                    imageAlt={service.title}
                    imageSrc={service.img}
                    textWrapperClass="w-full flex flex-col items-center gap-2"
                  >
                    <h4 className="text-base rounded font-semibold">
                      {service.title}
                    </h4>

                    <div className="absolute top-2 px-1 py-1 bg-green-700 rounded-full group-hover:px-16 duration-500"></div>
                  </CardInicio>
                ))}
              </div>
              <Modal
                size="4xl"
                show={openModal}
                onClose={() => setOpenModal(false)}
              >
                <Modal.Header>Cabañas Disponibles</Modal.Header>
                <Modal.Body>
                  <div className="space-y-6">
                    <CabinCards />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="red" onClick={() => setOpenModal(false)}>
                    Cancelar
                  </Button>
                </Modal.Footer>
              </Modal>
            </main>
          </section>
        </ColoredSection>
      </div>

      <div className="bg-red-800 pilares">
        <div className="max-w-[1180px] w-full mx-auto">
          <div className="py-12 px-4">
            <div className="flex md:flex-row flex-col justify-between items-center text-white md:gap-36 gap-4">
              <div className="flex gap-4 items-center text-5xl md:text-left text-center">
                <i className="fa-solid fa-magnifying-glass md:block hidden"></i>
                <div className="border py-6 md:block hidden"></div>
                <div className="text-2xl font-bold">
                  {translations.revisa_nuestros_lugares_estadia}
                </div>
              </div>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 flex items-center gap-2 bg-green-600 border hover:bg-white hover:text-red-700 hover:border-red-700 duration-500 rounded-lg text-sm whitespace-nowrap"
              >
                <i className="fa-solid fa-phone"></i>
                <h1 className="m-0">{translations.contactanos}</h1>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ColoredSection>
        <section className="w-full h-auto flex flex-col items-center justify-center relative py-12 px-4">
          <main className="w-full flex flex-col gap-3 items-center justify-center">
            <h2 className="md:text-4xl text-2xl font-bold capitalize">
              {translations.nuestros_servicios}
            </h2>

            <div className="w-full h-auto grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-7 sm:gap-10 gap-7 px-8 sm:px-0 mt-4">
              {serviceTexts.map((service, index) => (
                <CardInicio
                  data-aos="flip-up"
                  key={index}
                  cardClass="relative group w-full flex flex-col items-center justify-center gap-3 p-5 cursor-pointer transition duration-500 hover:shadow-xl rounded-xl border hover:border-red-700 overflow-hidden"
                  imageWrapperClass="w-20 h-20 relative z-10 object-cover"
                  imageAlt={service.title}
                  imageSrc={service.img}
                  textWrapperClass="w-full flex flex-col items-center gap-2"
                >
                  <h4 className="text-base rounded font-semibold">
                    {service.title}
                  </h4>
                  <p className="text-sm  font-light text-center">
                    {service.description}
                  </p>

                  <div className="absolute top-2 px-1 py-1 bg-red-800 rounded-full group-hover:px-16 duration-500"></div>
                </CardInicio>
              ))}
            </div>
          </main>
        </section>
      </ColoredSection>

      <div id="about">
        <ColoredSection backgroundColor="#F3F5F4">
          <div className="grid lg:grid-cols-2 lg:gap-14 gap-4 py-12 px-4 items-center">
            <div className="flex flex-col gap-6">
              <div data-aos="fade-right">
                <div className="text-base text-yellow-500">
                  {translations.nuestra_oferta}
                </div>
                <div className="text-2xl font-extrabold">
                  {translations.explora_casa_campo_arequipa}
                </div>
              </div>

              <p data-aos="fade-left">
                {translations.ubicado_corazon_arequipa}
              </p>

              <div className="flex gap-4" data-aos="fade-right">
                <div className="p-2 text-green-800 bg-green-700/20 rounded-md flex-none h-14 w-14 flex items-center justify-center">
                  <i className="fa-regular fa-face-laugh-beam fa-2xl"></i>
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {translations.experiencia_inolvidable}
                  </div>
                  <div className="text-sm">
                    {translations.ya_busques_refugio}
                  </div>
                </div>
              </div>

              <div className="flex gap-4" data-aos="fade-left">
                <div className="p-2 text-blue-500 bg-blue-400/30 rounded-md flex-none h-14 w-14 flex items-center justify-center">
                  <i className="fa-solid fa-people-group fa-2xl"></i>
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {translations.servicio_personalizado_profesional}
                  </div>
                  <div className="text-sm">
                    {translations.contamos_equipo_profesional}
                  </div>
                </div>
              </div>

              <div className="flex gap-4" data-aos="fade-right">
                <div className="p-2 text-yellow-500 bg-yellow-200/50 rounded-md flex-none h-14 w-14 flex items-center justify-center">
                  <i className="fa-solid fa-hand-holding-dollar fa-2xl"></i>
                </div>
                <div>
                  <div className="text-lg font-bold">
                    {translations.precios_leales}
                  </div>
                  <div className="text-sm">
                    {translations.casa_campo_arequipa_comprometemos}
                  </div>
                </div>
              </div>

              <div data-aos="flip-down" className="w-full hidden">
                <button className="px-3 py-2 w-full rounded-lg text-sm text-white bg-gray-800 hover:bg-red-800 hover:shadow-lg hover:scale-[1.04] hover:shadow-red-800 duration-500">
                  {translations.conoce_mas_sobre_nosotros}
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] aspect-square"
                    data-aos="flip-up"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ColoredSection>
      </div>

      <div id="contact">
        <Contactanos></Contactanos>
      </div>
    </>
  );
}
