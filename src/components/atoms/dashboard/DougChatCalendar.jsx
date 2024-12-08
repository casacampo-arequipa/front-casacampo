import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import useFetch from "../../../useFetchAdmin";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';

export default function DateTemplateDemo() {
    const { data, loading, error } = useFetch("dashboard");
    const [reservedDates, setReservedDates] = useState([]);
    locale('es');
    useEffect(() => {
        if (data?.datereservs) {
            // Convertir las fechas de la respuesta a objetos Date
            const dates = data.datereservs.map((reservation) => {
                return {
                    start: new Date(reservation.date_start), // Aquí es donde se ajusta el mes
                    end: new Date(reservation.date_end) // Aquí también
                };
            });
            setReservedDates(dates);
        }
    }, [data]);

    // Función para comprobar si una fecha está en los rangos reservados
    const isDateReserved = (date) => {
        return reservedDates.some((reserved) => {
            const currentDate = new Date(date.year, date.month, date.day); // Restar 1 al mes
            return currentDate >= reserved.start && currentDate <= reserved.end;
        });
    };

    const dateTemplate = (date) => {
        if (isDateReserved(date)) {
            return (
                <strong
                    style={{
                        backgroundColor: '#d3d3d3', padding: '40px'
                    }}
                >
                    {date.day}
                </strong>
            );
        }

        return <span>{date.day}</span>;
    };

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Jábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
    });

    return (
        <Calendar dateTemplate={dateTemplate} inline showWeek  />
    );
}
