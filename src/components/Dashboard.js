import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { Tag } from 'primereact/tag';
import useFetch from '../useFetchAdmin';
import Barras from './atoms/dashboard/DougChartBarras';
import Torta from './atoms/dashboard/DougChartTorta';
import FiveReservations from './atoms/dashboard/DougChartListR';
import MoreUserReserva from './atoms/dashboard/DougChartUserHori';
import CalendarReservet from './atoms/dashboard/DougChatCalendar';
// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { data, loading, error } = useFetch("dashboard");
    const [selectedYear, setSelectedYear] = useState(null);
    const chartData = () => {
        if (!data || !data.estadistica) {
            console.error("Los datos no están disponibles");
            return {
                labels: [],
                datasets: []
            };
        }

        // Inicialización de los datos
        const usuariosMonthlyData = Array(12).fill(0);  // Inicializamos con 0
        const reservasMonthlyData = Array(12).fill(0); // Inicializamos con 0
        const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const years = new Set();  // Usamos un Set para evitar duplicados
        let earliestMonth = 12;  // Inicializamos con diciembre (12), ya que queremos encontrar el mes más temprano

        // Procesamos los usuarios por mes
        for (const [mes, cantidad] of Object.entries(data.estadistica.tendusuarios)) {
            const [year, month] = mes.split('-');
            years.add(year);  // Añadimos el año al set
            const monthIndex = parseInt(month, 10) - 1;
            usuariosMonthlyData[monthIndex] = cantidad;
            earliestMonth = Math.min(earliestMonth, monthIndex);  // Encontramos el mes más temprano
        }

        // Procesamos las reservas por mes
        data.estadistica.tendreservas.forEach((reserva) => {
            const [year, month] = reserva.mes.split('-');
            years.add(year);  // Añadimos el año al set
            const monthIndex = parseInt(month, 10) - 1;
            reservasMonthlyData[monthIndex] = reserva.total_reservas;
            earliestMonth = Math.min(earliestMonth, monthIndex);  // Encontramos el mes más temprano
        });

        const year = selectedYear || new Date().getFullYear().toString();
        // Filtramos las etiquetas para empezar desde el mes más temprano

        // Filtramos los datos para solo incluir el año seleccionado
        const filteredUsuariosData = Array(12).fill(0);
        const filteredReservasData = Array(12).fill(0);

        // Procesamos los usuarios solo para el año seleccionado
        for (const [mes, cantidad] of Object.entries(data.estadistica.tendusuarios)) {
            const [dataYear, month] = mes.split('-');
            if (dataYear === year) {
                const monthIndex = parseInt(month, 10) - 1;
                filteredUsuariosData[monthIndex] = cantidad;
            }
        }

        // Procesamos las reservas solo para el año seleccionado
        data.estadistica.tendreservas.forEach((reserva) => {
            const [dataYear, month] = reserva.mes.split('-');
            if (dataYear === year) {
                const monthIndex = parseInt(month, 10) - 1;
                filteredReservasData[monthIndex] = reserva.total_reservas;
            }
        });

        // Filtramos las etiquetas para mostrar solo los meses para el año seleccionado
        const filteredLabels = labels.slice(earliestMonth);

        // Ahora que solo tenemos los datos para el año seleccionado, creamos las etiquetas correctamente
        const labelsWithYear = filteredLabels.map((month) => `${month} ${year}`);

        // Actualizamos los datos del gráfico
        const chart = {
            labels: labelsWithYear,
            datasets: [
                {
                    label: `Usuarios Registrados ${year}`,
                    data: filteredUsuariosData.slice(earliestMonth),  // Filtramos los datos a partir del mes más temprano
                    borderColor: '#A91729',
                    backgroundColor: 'rgba(169, 23, 41, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: `Reservas ${year}`,
                    data: filteredReservasData.slice(earliestMonth),  // Filtramos los datos a partir del mes más temprano
                    borderColor: '#1F2937',
                    backgroundColor: 'rgba(31, 41, 55, 0.2)',
                    fill: true,
                    tension: 0.9,
                }
            ]
        };

        return chart;
    };
    const chart = chartData();
    const getSeverity = (product) => {
        switch (product.state) {
            case 'Pagado':
                return 'success';

            case 'Proceso':
                return 'warning';

            case 'No Pagado':
                return 'danger';

            default:
                return null;
        }
    };
    const statusBodyTemplate = (product) => {
        return <Tag value={product.state} severity={getSeverity(product)}></Tag>;
    };
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };



    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

                {/* Section 1: Key Stats */}
                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <div className="bg-[#A91729] text-white  rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-4 ">
                        <div className='mb-2'>
                            <span class="py-1 px-3 inline-flex items-center gap-x-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">
                                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                    <polyline points="16 7 22 7 22 13"></polyline>
                                </svg>
                                12%
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mb-2'>
                                <h2 className="text-lg mb-2">Usuarios</h2>
                                <p className="text-2xl font-bold">{data?.cards?.usuarios}</p>
                            </div>
                            <i className="fas fa-users text-white text-5xl"></i>
                        </div>
                    </div>

                    <div className="bg-[#F3F4F6] text-gray-800 p-6 rounded-lg">
                        <div className='mb-2'>
                            <span class="py-1 px-3 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                                    <polyline points="16 17 22 17 22 11"></polyline>
                                </svg>
                                12%
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mb-2'>
                                <h2 className="text-lg mb-2">Reservas</h2>
                                <p className="text-2xl font-bold">{data?.cards?.reservas}</p>
                            </div>
                            <i className="fas fa-calendar-alt text-5xl"></i>
                        </div>
                    </div>
                    {/* <div className="bg-[#A91729] text-white p-6 rounded-lg">
                        <div className='mb-2'>
                            <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                                Connected
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mb-2'>
                                <h2 className="text-lg mb-2">Cabañas</h2>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                            <i className="fas fa-house-chimney text-white text-5xl"></i>
                        </div>
                    </div> */}
                    <div className="bg-[#A91729] text-gray-800 p-6 rounded-lg">
                        <div className='mb-2'>
                            <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                                Connected
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mb-2 text-white'>
                                <h2 className="text-lg mb-2">Promociones</h2>
                                <p className="text-2xl font-bold">{data?.cards?.promociones}</p>
                            </div>
                            <i className="fas fa-tags text-white text-5xl"></i>
                        </div>
                    </div>
                    {/* <div className="bg-[#A91729] text-white p-6 rounded-lg">
                        <div className='mb-2'>
                            <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                    <path d="m9 12 2 2 4-4"></path>
                                </svg>
                                Connected
                            </span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='mb-2'>
                                <h2 className="text-lg mb-2">Paquetes</h2>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                            <i className="fas fa-cubes text-white text-5xl"></i>
                        </div>
                    </div> */}
                </div>

                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-md border xl:col-span-2 ">
                        <div className='flex justify-between'>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Usuarios y Reservas</h2>
                            <select
                                value={selectedYear || new Date().getFullYear().toString()}  // Si no hay selectedYear, usa el año actual
                                onChange={handleYearChange}
                                className="mb-4 p-2 border rounded-md"
                            >
                                {Array.from(new Set([
                                    ...(data?.estadistica?.tendusuarios ? Object.keys(data.estadistica.tendusuarios).map(key => key.split('-')[0]) : []),
                                    ...(data?.estadistica?.tendreservas ? data.estadistica.tendreservas.map(reserva => reserva.mes.split('-')[0]) : [])
                                ])).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Line data={chart} height={120} />
                    </div>
                    <div className="rounded-xl bg-white text-[#A91729] shadow-md border xl:col-span-1">
                        <div className="pt-6 px-3 pb-0">
                            <Barras />
                        </div>
                    </div>
                </div>


                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <Torta />
                    <div className="border bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas 5 Reservas</h2>
                        <FiveReservations />
                    </div>

                </div>
                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <div className="border bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">5 Primeros Usuarios con más Reservas</h2>
                        <MoreUserReserva />
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border items-center grid">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 ">Calendario de Reservas</h2>
                        <CalendarReservet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;