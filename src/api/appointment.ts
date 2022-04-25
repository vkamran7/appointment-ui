import { defaultRequest } from "helpers";
import {
  IAppointment,
  IGetAvaiableHoursRequest,
  ITableInfo,
} from "pages/home/types";

const getAvaiableHours = async (dateData: IGetAvaiableHoursRequest) =>
  await defaultRequest.post("/auth/availableHours", dateData);

const setAppointment = async (data: IAppointment) =>
  await defaultRequest.post("/appointments", data);

const getAppointments = async (data: ITableInfo) =>
  await defaultRequest.get(
    `/appointments/getAppointments?page=${data.page}&size=${data.size}`
  );

export const appointmentApi = {
  getAvaiableHours,
  setAppointment,
  getAppointments,
};
