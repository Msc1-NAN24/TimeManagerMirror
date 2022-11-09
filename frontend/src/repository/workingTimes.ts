import {
  ICreateWorkingTime,
  IUpdateWorkingTime,
  IWorkingTime,
} from "@/dto/workingTime";
import Api, { authorize } from "@/utils/Api";
import workingTimes from "@/services/workingTimes";
import { ca } from "vuetify/locale";

// User Routes

const getAllWorkingTimesByUser = async (userId: number) => {
  const { data } = await Api.get<IWorkingTime[]>(
    `/workingtimes/user/${userId}`,
    authorize(localStorage.getItem("access_token"))
  );
  return data;
};

const getWorkingTimesByUserByPeriod = async (
  userId: number,
  start: string,
  end: string
) => {
  const { data } = await Api.get<IWorkingTime[]>(
    `/workingtimes/user/${userId}?start=${start}&end=${end}`,
    authorize(localStorage.getItem("access_token"))
  );
  return data;
};

const getWorkingTimeByUserById = async (
  userId: number,
  workingTimeId: number
) => {
  const { data } = await Api.get<IWorkingTime>(
    `/workingtimes/user/${userId}/${workingTimeId}`,
    authorize(localStorage.getItem("access_token"))
  );
  return data;
};

const createWorkingTime = async (
  userId: number,
  workingTime: ICreateWorkingTime
) => {
  const { data } = await Api.post<IWorkingTime>(
    `/workingtimes/user/${userId}`,
    workingTime,
    authorize(localStorage.getItem("access_token"))
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

const getTeamWorkingTime = async (
  teamId: string,
  callback: (workingTimes: IWorkingTime[]) => void
) => {
  Api.get<IWorkingTime[]>(
    `/workingtimes/team/${teamId}`,
    authorize(localStorage.getItem("access_token"))
  )
    .then((value) => {
      return callback(value.data);
    })
    .catch((err) => {
      return callback([]);
    });
};

const getTeamWorkingTimeByPeriod = async (
  teamId: string,
  start: string,
  end: string,
  callback: (workingTimes: IWorkingTime[]) => void
) => {
  Api.get<IWorkingTime[]>(
    `/workingtimes/team/${teamId}?start=${start}&end=${end}`,
    authorize(localStorage.getItem("access_token"))
  )
    .then((value) => {
      return callback(value.data);
    })
    .catch((err) => {
      return callback([]);
    });
};

const workingTimeRepository = {
  getAllWorkingTimesByUser,
  getTeamWorkingTime,
  getTeamWorkingTimeByPeriod,
  getWorkingTimesByUserByPeriod,
  getWorkingTimeByUserById,
  createWorkingTime,
  getWorkingTimeById,
  updateWorkingTime,
  deleteWorkingTime,
};

export default workingTimeRepository;
