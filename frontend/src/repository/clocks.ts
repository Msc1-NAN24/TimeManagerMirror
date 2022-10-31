import { IClock } from "@/dto/clock";
import axios from "axios";

const getClock = async () => {
    const { data } = await axios.get<IClock>(`${import.meta.env.VITE_URL_API}/clocks`, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
    return data;
}

const createClock = async () => {
    const { data } = await axios.post<IClock>(`${import.meta.env.VITE_URL_API}/clocks`, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
    return data;
}

const clockRepository = {
    getClock,
    createClock
}

export default clockRepository;