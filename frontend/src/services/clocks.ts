import { ICreateClock } from "@/dto/clock";
import clockRepository from "@/repository/clocks";

const getClockByUserId = async (userId: string) => {
    const clock = await clockRepository.getClockByUserId(userId);
    return clock;
}

const createClockByUserId = async (userId: string, clock: ICreateClock) => {
    const createdClock = await clockRepository.createClockByUserId(userId, clock);
    return createdClock;
}

