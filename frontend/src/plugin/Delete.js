import axios from "axios";

export async function deleteReservation(id){
    try{
        const res = await axios.delete("/api/reservations", {params: {_id: id}});
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}