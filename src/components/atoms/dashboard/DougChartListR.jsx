import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import useFetch from '../../../useFetchAdmin';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const FiveReservations = () => {
    const { data, loading, error } = useFetch("dashboard");
    const [latestReservations, setLatestReservations] = useState([]);
    console.log(data)
    useEffect(() => {
        if (data?.fivereservas) {
            // Extraer las reservas
            const reservations = data.fivereservas.map(reservation => ({
                user: reservation?.user?.name + " " +reservation?.user?.lastname ,
                date_reservation: reservation.date_reservation,
                package: reservation?.package?.name,
                state: reservation.payment_status,
            }));
            setLatestReservations(reservations);  // Establecer el estado con las reservas
        }
    }, [data]); // Solo se ejecuta cuando los datos cambian

    const statusBodyTemplate = (product) => {
        return <Tag value={product.state} severity={getSeverity(product.state)}></Tag>;
    };

    const getSeverity = (state) => {
        switch (state) {
            case "Pagado":
                return 'success';  // Pagado
            case "Estado desconocido ":
                return 'warning';  // Proceso
            case "Falta pagar":
                return 'danger';  // No Pagado
            default:
                return null;
        }
    };

    return (
        <>
            <DataTable value={latestReservations} tableStyle={{ minWidth: '10rem' }}>
                <Column field="user" header="Usuario" />
                <Column field="date_reservation" header="Fecha" />
                <Column field="package" header="Paquete" />
                <Column header="Estado" body={statusBodyTemplate}></Column>
            </DataTable>
        </>
    );
}

export default FiveReservations;
