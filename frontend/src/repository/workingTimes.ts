import { ICreateWorkingTime, IUpdateWorkingTime, IWorkingTime } from "@/dto/workingTime";
import axios from "axios";

// User Routes

const getAllWorkingTimesByUser = async (userId: number) => {
    const { data } = await axios.get<IWorkingTime[]>(`/api/workingtimes/user/${userId}`);
    return data;
}

const getWorkingTimesByUserByPeriod = async (userId: number, start: string, end: string) => {
    const { data } = await axios.get<IWorkingTime[]>(`/api/workingtimes/user/${userId}?start=${start}&end=${end}`);
    return data;
}

const getWorkingTimeByUserById = async (userId: number, workingTimeId: number) => {
    const { data } = await axios.get<IWorkingTime>(`/api/workingtimes/user/${userId}/${workingTimeId}`);
    return data;
}

const createWorkingTime = async (userId: number, workingTime: ICreateWorkingTime) => {
    const { data } = await axios.post<IWorkingTime>(`/api/workingtimes/user/${userId}`, workingTime);
    return data;
}

// Manager Routes

const getWorkingTimeById = async (workingTimeId: number) => {
    const { data } = await axios.get<IWorkingTime>(`/api/workingtimes/entry/${workingTimeId}`);
    return data;
}

const updateWorkingTime = async (workingTimeId: number, workingTime: IUpdateWorkingTime) => {
    const { data } = await axios.patch<IWorkingTime>(`/api/workingtimes/entry/${workingTimeId}`, workingTime);
    return data;
}

const deleteWorkingTime = async (workingTimeId: number) => {
    const { data } = await axios.delete<IWorkingTime>(`/api/workingtimes/entry/${workingTimeId}`);
    return data;
}

const workingTimeRepository = {
    getAllWorkingTimesByUser,
    getWorkingTimesByUserByPeriod,
    getWorkingTimeByUserById,
    createWorkingTime,
    getWorkingTimeById,
    updateWorkingTime,
    deleteWorkingTime
}

export default workingTimeRepository;