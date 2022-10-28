import { IClock, ICreateClock } from "@/dto/clock";
import axios from "axios";

const getClockByUserId = async (userId: string) => {
    const { data } = await axios.get<IClock>(`${import.meta.env.VITE_URL_API}/clocks/user/${userId}`);
    return data;
}

const createClockByUserId = async (userId: string, clock: ICreateClock) => {
    const { data } = await axios.post<IClock>(`${import.meta.env.VITE_URL_API}/clocks/user/${userId}`, clock);
    return data;
}

const clockRepository = {
    getClockByUserId,
    createClockByUserId
}

export default clockRepository;