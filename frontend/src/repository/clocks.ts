import { IClock, ICreateClock } from "@/dto/clock";
import axios from "axios";

const getClockByUserId = async (userId: string) => {
    const { data } = await axios.get<IClock>(`${process.env.URL_API}/clocks/user/${userId}`);
    return data;
}

const createClockByUserId = async (userId: string, clock: ICreateClock) => {
    const { data } = await axios.post<IClock>(`${process.env.URL_API}/clocks/user/${userId}`, clock);
    return data;
}

const clockRepository = {
    getClockByUserId,
    createClockByUserId
}

export default clockRepository;