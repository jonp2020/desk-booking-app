import axios from "axios";

export async function deleteReservation(id) {
	try {
		const res = await axios.delete("/api/reservations", { _id: id });
		console.log(res.data);
		alert(res.data.message);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
