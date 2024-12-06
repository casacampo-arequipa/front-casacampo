import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Calendar } from 'primereact/calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import DoughnutChartDemo from './atoms/dashboard/DoughnutChartDemo';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [latestReservations, setLatestReservations] = useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date());

    useEffect(() => {
        // Aquí podrías hacer una llamada a la API para obtener los datos dinámicos.
        setLatestReservations([
            { id: 1, user: 'Usuario 1', date: '2024-12-01', cabin: 'Cabaña 3', state: "Pagado" },
            { id: 2, user: 'Usuario 2', date: '2024-12-02', cabin: 'Cabaña 5', state: "Pagado" },
            { id: 3, user: 'Usuario 3', date: '2024-12-03', cabin: 'Cabaña 1', state: "No Pagado" },
            { id: 4, user: 'Usuario 4', date: '2024-12-04', cabin: 'Cabaña 2', state: "Pagado" },
            { id: 5, user: 'Usuario 5', date: '2024-12-05', cabin: 'Cabaña 4', state: "No Pagado" }
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
    const chartConfig = {
        series: [
            {
                name: "Sales",
                data: [50, 40, 300, 320, 500, 350, 200, 230, 200],
            },
        ],
        chart: {
            type: "bar",
            height: 240,
            toolbar: {
                show: false,
            },
        },
        title: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#A91729"],
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 2,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 90,
            },
        },
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    };
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
        console.log(product)
        return <Tag value={product.state} severity={getSeverity(product)}></Tag>;
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
                                <p className="text-2xl font-bold">145</p>
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
                                <p className="text-2xl font-bold">98</p>
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
                                <p className="text-2xl font-bold">5</p>
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tendencia de Usuarios y Reservas</h2>
                        <Line data={chartData} height={120} />
                    </div>
                    <div className="rounded-xl bg-white text-[#A91729] shadow-md border xl:col-span-1">
                        <div className="pt-6 px-3 pb-0">
                            <h2 className='font-semibold text-xl ml-2 mb-5'>Ganacias por mes</h2>
                            <Chart options={chartConfig} series={chartConfig.series} type="bar" height={400} width={570} />
                        </div>
                    </div>
                </div>


                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <DoughnutChartDemo />
                    <div className="border bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas 5 Reservas</h2>
                        <DataTable value={latestReservations} tableStyle={{ minWidth: '10rem' }}>
                            <Column field="user" header="Usuario" />
                            <Column field="date" header="Fecha" />
                            <Column field="cabin" header="Cabaña" />
                            <Column header="Estado" body={statusBodyTemplate}></Column>
                        </DataTable>
                    </div>

                </div>
                <div className="grid xl:grid-cols-3 xl:gap-6 gap-x-10 gap-y-4">
                    <div className="border bg-white p-6 rounded-lg shadow-md xl:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Usuarios con más Reservas</h2>
                        <DataTable value={latestReservations} tableStyle={{ minWidth: '10rem' }}>
                            <Column field="user" header="Usuario" />
                            <Column field="date" header="Fecha" />
                            <Column field="cabin" header="Cabaña" />
                            <Column header="Estado" body={statusBodyTemplate}></Column>
                        </DataTable>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border items-center grid">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 ">Calendario de Reservas</h2>
                        <Calendar
                            onChange={setCalendarDate}
                            value={calendarDate}
                            tileClassName="bg-gray-200"
                            style={{ height: '400px' }}
                            inline showWeek
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;