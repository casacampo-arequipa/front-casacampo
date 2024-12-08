import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import useFetch from '../../../useFetchAdmin';

const MoreUserReserva = () => {
    const { data, loading, error } = useFetch("dashboard");
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [userWithMostReservations, setUserWithMostReservations] = useState(null);

    useEffect(() => {
        if (data?.morereseruser) {
            const userReservations = data.morereseruser;

            // Ordenar los usuarios por el número de reservas (de mayor a menor)
            const sortedUsers = Object.entries(userReservations)
                .sort(([, a], [, b]) => b - a) // Ordenar de mayor a menor por las reservas
                .map(([user, reservations]) => ({ user, reservations }));

            // El usuario con más reservas será el primero
            setUserWithMostReservations(sortedUsers[0]);

            // Configurar los datos para el gráfico (solo si lo necesitas)
            const labels = sortedUsers.map(item => item.user);
            const dataValues = sortedUsers.map(item => item.reservations);

            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            const dataForChart = {
                labels: labels,
                datasets: [
                    {
                        label: 'Reservas de Usuarios',
                        backgroundColor: documentStyle.getPropertyValue('--red-700'),
                        borderColor: documentStyle.getPropertyValue('--red-700'),
                        data: dataValues
                    }
                ]
            };

            const options = {
                indexAxis: 'y',
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 100
                            }
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            setChartData(dataForChart);
            setChartOptions(options);
        }
    }, [data]); // Solo se ejecuta cuando los datos cambian

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}

export default MoreUserReserva;
