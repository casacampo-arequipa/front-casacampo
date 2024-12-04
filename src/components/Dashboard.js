import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [latestReservations, setLatestReservations] = useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date());

    useEffect(() => {
        // Aquí podrías hacer una llamada a la API para obtener los datos dinámicos.
        setLatestReservations([
            { id: 1, user: 'Usuario 1', date: '2024-12-01', cabin: 'Cabaña 3' },
            { id: 2, user: 'Usuario 2', date: '2024-12-02', cabin: 'Cabaña 5' },
            { id: 3, user: 'Usuario 3', date: '2024-12-03', cabin: 'Cabaña 1' },
            { id: 4, user: 'Usuario 4', date: '2024-12-04', cabin: 'Cabaña 2' },
            { id: 5, user: 'Usuario 5', date: '2024-12-05', cabin: 'Cabaña 4' }
        ]);
    }, []);

    const chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'Usuarios Registrados',
                data: [12, 19, 3, 5, 2, 3, 7, 12, 15, 20, 18, 25],
                borderColor: '#A91729',
                backgroundColor: 'rgba(169, 23, 41, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Reservas',
                data: [8, 15, 12, 9, 11, 13, 16, 19, 21, 22, 24, 30],
                borderColor: '#F3F4F6',
                backgroundColor: 'rgba(243, 244, 246, 0.2)',
                fill: true,
                tension: 0.4,
            }
        ]
    };
    return (
        <>
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

                {/* Section 1: Key Stats */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-[#A91729] text-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Usuarios</h2>
                        <p className="text-2xl">145</p>
                    </div>
                    <div className="bg-[#F3F4F6] text-gray-800 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Reservas</h2>
                        <p className="text-2xl">98</p>
                    </div>
                    <div className="bg-[#A91729] text-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Cabañas</h2>
                        <p className="text-2xl">12</p>
                    </div>
                    <div className="bg-[#F3F4F6] text-gray-800 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Promociones</h2>
                        <p className="text-2xl">5</p>
                    </div>
                    <div className="bg-[#A91729] text-white p-6 rounded-lg">
                        <h2 className="text-lg font-semibold">Paquetes</h2>
                        <p className="text-2xl">8</p>
                    </div>
                </div>

                {/* Section 2: Line Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Usuarios y Reservas</h2>
                    <Line data={chartData} />
                </div>

                {/* Section 3: Latest Reservations */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas 5 Reservas</h2>
                    <ul className="space-y-2">
                        {latestReservations.map((reservation) => (
                            <li key={reservation.id} className="p-4 border-b border-gray-200">
                                <p><strong>Usuario:</strong> {reservation.user}</p>
                                <p><strong>Fecha:</strong> {reservation.date}</p>
                                <p><strong>Cabaña:</strong> {reservation.cabin}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Section 4: Calendar */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendario de Reservas</h2>
                    <Calendar
                        onChange={setCalendarDate}
                        value={calendarDate}
                        tileClassName="bg-gray-200"
                    />
                </div>
            </div>
        </>
    );
}

export default Dashboard;