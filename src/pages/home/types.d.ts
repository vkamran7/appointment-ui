export interface IGetAvaiableHoursRequest {
  year: number;
  month: number;
  day: number;
}

export interface IAppointment {
  year: number;
  month: number;
  day: number;
  hour: number;
  service: string;
}

export interface ITableInfo {
  page: number;
  size: number;
}
