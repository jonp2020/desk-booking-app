import axios from "axios";
import { format } from 'date-fns';

export async function retrieveSeats(date, time){
    try{
        const formatted = format(date, 'dd/MM/yyyy')
        const res = await axios.get("/api/reservations", 
        {params: {office: "JEMISON",
        date: formatted, time}}
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export async function makeBooking(username, seat_no, table_no, date, time){
    try{
        const formatted = format(date, 'dd/MM/yyyy');
        const res = await axios.post("/api/reservations", {"office": "JEMISON", "name": username, "seat_no": seat_no, "table_no": table_no, "monitor": "false", "date": formatted, "time": time} );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}