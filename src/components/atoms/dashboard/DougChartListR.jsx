import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import useFetch from '../../../useFetchAdmin';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const FiveReservations = () => {
    const { data, loading, error } = useFetch("dashboard");
    const [latestReservations, setLatestReservations] = useState([]);

    useEffect(() => {
        if (data?.fivereservas) {
            // Extraer las reservas
            const reservations = data.fivereservas.map(reservation => ({
                user_id: reservation.user_id,
                date_reservation: reservation.date_reservation,
                package_id: reservation.package_id,
                state: reservation.state,
            }));
            setLatestReservations(reservations);  // Establecer el estado con las reservas
        }
    }, [data]); // Solo se ejecuta cuando los datos cambian

    const statusBodyTemplate = (product) => {
        return <Tag value={product.state} severity={getSeverity(product.state)}></Tag>;
    };

    const getSeverity = (state) => {
        switch (state) {
            case 1:
                return 'success';  // Pagado
            case 2:
                return 'warning';  // Proceso
            case 0:
                return 'danger';  // No Pagado
            default:
                return null;
        }
    };

    return (
        <>
            <DataTable value={latestReservations} tableStyle={{ minWidth: '10rem' }}>
                <Column field="user_id" header="Usuario" />
                <Column field="date_reservation" header="Fecha" />
                <Column field="package_id" header="Paquete" />
                <Column header="Estado" body={statusBodyTemplate}></Column>
            </DataTable>
        </>
    );
}

export default FiveReservations;
