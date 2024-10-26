export const getHeader = (pathname) => {
  switch (pathname) {
    case "/dashboard/usuarios":
      return "Usuarios";
    case "/dashboard/cabanas":
      return "Cabañas";
    case "/dashboard/promociones":
      return "Promociones";
    case "/dashboard/descuentos":
      return "Descuentos";
    case "/dashboard/reservas":
      return "Reservas";
    default:
      return "Dashboard";
  }
};

export const getSection = (pathname) => {
  switch (pathname) {
    case "/dashboard/usuarios":
      return "Gestión de usuarios";
    case "/dashboard/cabanas":
      return "Gestión de cabañas";
    case "/dashboard/promociones":
      return "Gestión de promociones";
    case "/dashboard/descuentos":
      return "Gestión de descuentos";
    case "/dashboard/reservas":
      return "Gestión de reservas";
    default:
      return "Bienvenido al panel";
  }
};
