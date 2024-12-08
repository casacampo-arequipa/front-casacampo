import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import useFetch from '../../../useFetchAdmin';

// Función para generar tonalidades de rojo dinámicamente
const generateRedShades = (numColors) => {
    const baseColor = '#A91729'; // Rojo base
    const colorStep = 15; // Ajusta la diferencia de tonalidades
    const colors = [];

    for (let i = 0; i < numColors; i++) {
        const shade = `hsl(0, ${70 - i * colorStep}%, 54%)`; // Genera tonalidades de rojo
        colors.push(shade);
    }

    return colors;
};

const Torta = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { data, loading, error } = useFetch("dashboard");

    useEffect(() => {
        // Verificar que los datos están disponibles
        if (data?.masreservaspaquetes) {
            const paquetes = data.masreservaspaquetes;

            // Obtener las etiquetas (nombres de los paquetes) y los valores (cantidad de reservas)
            const labels = Object.keys(paquetes);
            const dataValues = Object.values(paquetes);

            // Generar una lista de colores basados en el rojo
            const colors = generateRedShades(labels.length);

            // Configurar los datos para el gráfico
            const chartData = {
                labels: labels,  // Etiquetas dinámicas basadas en el backend
                datasets: [
                    {
                        data: dataValues,  // Datos dinámicos basados en el backend
                        backgroundColor: colors,  // Colores generados dinámicamente
                        hoverBackgroundColor: colors,  // Misma escala para hover
                    }
                ]
            };

            const chartOptions = {
                cutout: '60%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom', // Mover la leyenda a la parte inferior
                        align: 'center', // Centrar las leyendas
                        labels: {
                            boxWidth: 10, // Ajustar el tamaño del cuadro (color)
                            padding: 30, // Ajustar el espaciado entre los elementos
                            font: {
                                size: 12, // Ajustar el tamaño de la fuente
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            // Personalizamos la etiqueta del tooltip para incluir "reservas"
                            label: function (tooltipItem) {
                                const value = tooltipItem.raw;
                                return `${value} reservas`;  // Modificar el texto para incluir "reservas"
                            },
                        },
                    },
                },
            };

            setChartData(chartData);
            setChartOptions(chartOptions);
        }
    }, [data]);  // Dependencia de 'data', actualizar cuando los datos cambian

    return (
        <>
            <div className="card flex flex-col justify-center border pl-5 pr-10 pb-14 shadow-lg rounded-lg">
                <h1 className='mt-4 font-medium text-xl flex'>Promociones con más Reservas</h1>
                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-72 mt-11" />
            </div>
        </>
    );
}

export default Torta;
