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