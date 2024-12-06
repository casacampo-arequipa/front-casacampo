import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['PROMO 1', 'PROMO 2', 'PROMO 3'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-700'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--red-300')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--red-700'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--red-300')
                    ]
                }
            ]
        };
        const options = {
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
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <>

            <div className="card flex flex-col justify-center border pl-5 pr-10 pb-14 shadow-lg rounded-lg">
                <h1 className='mt-4 font-medium text-xl flex'>Promociones con más Reservas</h1>
                <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full h-72 mt-11" />
            </div>
        </>
    );
}
