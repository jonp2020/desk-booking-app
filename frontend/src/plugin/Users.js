import axios from "axios";

export async function getUsers(){
    try{
        const res = await axios.get("/api/users");
        return res.data;
    } catch (error) {
        console.log(error);
    }
}