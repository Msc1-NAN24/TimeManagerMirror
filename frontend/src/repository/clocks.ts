import { IClock } from "@/dto/clock";
import axios from "axios";

const getClock = async () => {
    const { data } = await axios.get<IClock>('/api/clocks', {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
    return data.data;
}

const createClock = async () => {
    const { data } = await axios.post<IClock>('/api/clocks', {}, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
    return data.data;
}

const clockRepository = {
    getClock,
    createClock
}

export default clockRepository;