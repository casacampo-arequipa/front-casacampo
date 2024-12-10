import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import useFetch from '../../../useFetchAdmin';
import Loader from '../../Loader';

const Barras = () => {
    const { data, loading, error } = useFetch("dashboard");
    const [selectedYearGana, setSelectedYearGana] = useState(null);
    const [chartConfigData, setChartConfigData] = useState(null);

    useEffect(() => {
        if (!selectedYearGana) {
            setSelectedYearGana(new Date().getFullYear().toString());
        }
        const fetchChartConfig = async () => {
            const config = await chartConfig();  // Esperar a que la promesa se resuelva
            setChartConfigData(config);  // Establecer la configuración una vez que se resuelva
        };

        if (data?.estadistica?.ganancias && selectedYearGana) {
            fetchChartConfig();  // Ejecutar solo cuando los datos estén disponibles
        }
    }, [data, selectedYearGana]);

    const chartConfig = async () => {
        // Verificar si los datos no están disponibles
        if (!data?.estadistica?.ganancias) {
            return null;
        }
        // Inicializamos un array para las ganancias
        const gananciasData = Array(12).fill(0);
        const months = Object.keys(data?.estadistica?.ganancias || {});

        // Usamos un ciclo for...of para recorrer los meses
        for (let mes of months) {
            const [year, month] = mes.split('-');
            if (year === selectedYearGana) {
                const monthIndex = parseInt(month, 10) - 1;
                gananciasData[monthIndex] = data?.estadistica?.ganancias[mes];
            }
        }

        // Construcción del objeto de configuración del gráfico
        return {
            series: [
                {
                    name: "Ganancias",  // Nombre de la serie de datos
                    data: gananciasData,  // Los datos que queremos graficar
                },
            ],
            chart: {
                type: "bar",  // Especificamos que el tipo de gráfico es de barras
                height: 240,  // Altura del gráfico
                toolbar: {
                    show: false,  // Sin barra de herramientas
                },
            },
            title: {
                show: false,  // No mostrar título
            },
            dataLabels: {
                enabled: false,  // No mostrar etiquetas en las barras
            },
            colors: ["#A91729"],  // Color de las barras
            plotOptions: {
                bar: {
                    columnWidth: "60%",  // Ancho de las barras
                    borderRadius: 5,  // Bordes redondeados para las barras
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,  // Sin ticks en el eje X
                },
                axisBorder: {
                    show: false,  // Sin borde en el eje X
                },
                labels: {
                    style: {
                        colors: "#616161",  // Color de las etiquetas en el eje X
                        fontSize: "12px",  // Tamaño de la fuente
                        fontFamily: "inherit",  // Fuente heredada
                        fontWeight: 400,  // Peso de la fuente
                    },
                },
                categories: [
                    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',  // Meses del año
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",  // Color de las etiquetas en el eje Y
                        fontSize: "12px",  // Tamaño de la fuente
                        fontFamily: "inherit",  // Fuente heredada
                        fontWeight: 400,  // Peso de la fuente
                    },
                },
            },
            grid: {
                show: true,  // Mostrar la cuadrícula
                borderColor: "#dddddd",  // Color del borde de la cuadrícula
                strokeDashArray: 5,  // Estilo de la cuadrícula (líneas discontinuas)
                xaxis: {
                    lines: {
                        show: true,  // Mostrar las líneas del eje X
                    },
                },
                padding: {
                    top: 5,
                    right: 90,  // Espaciado a la derecha
                },
            },
            fill: {
                opacity: 0.8,  // Opacidad de las barras
            },
            tooltip: {
                theme: "dark",  // Tema oscuro para el tooltip
            },
        };
    };
    const handleYearChangeGana = (event) => {
        setSelectedYearGana(event.target.value);
    };

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-xl ml-2 mb-5'>Ganancias por mes</h2>
                <select
                    value={selectedYearGana || new Date().getFullYear().toString()}
                    onChange={handleYearChangeGana}
                    className="mb-4 p-2 border rounded-md text-black"
                >
                    {Array.from(new Set(Object.keys(data?.estadistica?.ganancias || {}).map((key) => key.split('-')[0]))).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            {!chartConfigData ? (
                <Loader />// Mostrar un mensaje de carga mientras se espera la configuración
            ) : (
                <Chart options={chartConfigData} type="bar" series={chartConfigData.series} height={400} width={570} />
            )}
        </>
    );
}
export default Barras;