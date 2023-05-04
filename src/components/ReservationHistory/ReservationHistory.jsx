import { getDateTimeDay } from "../../utils/utils";
import "./ReservationHistory.css"
import { DataGrid } from '@mui/x-data-grid';

const ReservationHistory = ({reservationData}) => 
{
  const columns = [
    { field: "eventName", headerName: "Настан", width: "150"},
    { field: "dateReservation", headerName: "Дата на резервација", width: "170"},
    { field: "reservedFor", headerName: "Резервирано на име", width: "170"},
    { 
      field: "reservationStatus", 
      headerName: "Статус", 
      width: "150", 
      renderCell: (params) => (
        <div style={{ color: params.value === 'Одобрена' ? 'green' : 'red' }}>
        {params.value}
      </div>)},
  ]

  const rows = reservationData?.map(reservation => ({
    id: reservation.onlineReservationId,
    eventName: reservation.eventName,
    dateReservation: getDateTimeDay(reservation.createdAt).date,
    reservedFor: `${reservation.firstName} ${reservation.lastName}`,
    reservationStatus: (reservation.isActive === true ? "Одобрена" : "Во исчекување")
  }))
    return (
      <div style={{ height: "100%", width: '100%' }}>
        <h1 className='profileDetails-contentDescription'>Преглед на резервации</h1>
        <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        />
      </div>
       
      );
}

export default ReservationHistory;

