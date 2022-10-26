import axios from "axios";

export async function retrieveSeats(date, time){
    try{
        const res = await axios.post("", {date, time});
        return res.data;
    } catch (error) {
        console.log(error);
    }
}