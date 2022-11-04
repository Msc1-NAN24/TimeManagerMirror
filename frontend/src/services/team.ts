import {ICreateTeam, ITeam} from "@/dto/team";
import Api, {authorize} from "@/utils/Api";

export const createTeam = (accessToken: string, body: ICreateTeam, callback: (team?: ITeam, error?: string) => void) => {
  Api.post<ITeam>('/teams/', body, authorize(accessToken)).then((response) => {
    return callback(response.data);
  }).catch((err) => {
    return callback(undefined, "Une erreur est survenue !");
  });
}

export const getTeams = (accessToken: string, callback: (teams: ITeam[], error?: string) => void) => {
  Api.get<ITeam[]>('/teams/', authorize(accessToken)).then((response) => {
    return callback(response.data);
  }).catch((err) => {
    return callback([], "Une erreur est survenue !");
  });
}

export const getTeam = (accessToken: string, teamId: string, callback: (team?: ITeam, error?: string) => void) => {
  Api.get<ITeam>(`/teams/${teamId}`, authorize(accessToken)).then((response) => {
    return callback(response.data);
  }).catch((err) => {
    return callback(undefined, "Une erreur est survenue !");
  });
}