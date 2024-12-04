export const getHeader = (pathname) => {
  switch (pathname) {
    case "/dashboarda/usuarios":
      return "Usuarios";
    case "/dashboarda/cabanas":
      return "Cabañas";
    case "/dashboarda/promociones":
      return "Promociones";
    case "/dashboarda/descuentos":
      return "Descuentos";
    case "/dashboarda/reservas":
      return "Reservas";
    default:
      return "Dashboard";
  }
};

export const getSection = (pathname) => {
  switch (pathname) {
    case "/dashboarda/usuarios":
      return "Gestión de usuarios";
    case "/dashboarda/cabanas":
      return "Gestión de cabañas";
    case "/dashboarda/promociones":
      return "Gestión de promociones";
    case "/dashboarda/descuentos":
      return "Gestión de descuentos";
    case "/dashboarda/reservas":
      return "Gestión de reservas";
    default:
      return "Bienvenido al panel";
  }
};
