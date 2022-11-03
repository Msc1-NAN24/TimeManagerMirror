import {
  ICreateWorkingTime,
  IUpdateWorkingTime,
  IWorkingTime,
} from "@/dto/workingTime";
import axios from "@/utils/Api";

// User Routes

const getAllWorkingTimesByUser = async (userId: number) => {
  const { data } = await axios.get<IWorkingTime[]>(
    `/workingtimes/user/${userId}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const getWorkingTimesByUserByPeriod = async (
  userId: number,
  start?: string,
  end?: string
) => {
  const { data } = await axios.get<IWorkingTime[]>(
    `/workingtimes/user/${userId}${start ? `?start=${start}` : ""}${
      end ? `&end=${end}` : ""
    }`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const getWorkingTimeByUserById = async (
  userId: number,
  workingTimeId: number
) => {
  const { data } = await axios.get<IWorkingTime>(
    `/workingtimes/user/${userId}/${workingTimeId}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const createWorkingTime = async (
  userId: number,
  workingTime: ICreateWorkingTime
) => {
  const { data } = await axios.post<IWorkingTime>(
    `/workingtimes/user/${userId}`,
    workingTime,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

// Manager Routes

const getWorkingTimeById = async (workingTimeId: number) => {
  const { data } = await axios.get<IWorkingTime>(
    `/workingtimes/entry/${workingTimeId}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const updateWorkingTime = async (
  workingTimeId: number,
  workingTime: IUpdateWorkingTime
) => {
  const { data } = await axios.patch<IWorkingTime>(
    `/workingtimes/entry/${workingTimeId}`,
    workingTime,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const deleteWorkingTime = async (workingTimeId: number) => {
  const { data } = await axios.delete<IWorkingTime>(
    `/workingtimes/entry/${workingTimeId}`,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

const workingTimeRepository = {
  getAllWorkingTimesByUser,
  getWorkingTimesByUserByPeriod,
  getWorkingTimeByUserById,
  createWorkingTime,
  getWorkingTimeById,
  updateWorkingTime,
  deleteWorkingTime,
};

export default workingTimeRepository;
