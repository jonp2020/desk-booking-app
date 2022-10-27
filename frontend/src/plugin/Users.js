import axios from "axios";

export async function getUsers(){
    try{
        const res = await axios.get("/api/users", {params: {office: "JEMISON"}});
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}