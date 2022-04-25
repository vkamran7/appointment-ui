import { appointmentApi } from "api";
import { ITableInfo } from "pages/home/types";
import { useEffect, useState } from "react";

export const Appointments = () => {
  const [paginationData, setPaginationData] = useState<ITableInfo>({
    page: 1,
    size: 10,
  });
  const [appointments, setAppointmets] = useState<any>();

  const getAppointments = async (paginationData: ITableInfo) => {
    await appointmentApi
      .getAppointments(paginationData)
      .then((response) => setAppointmets(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAppointments(paginationData);
  }, [paginationData]);

  console.log(appointments);
  return appointments?.map((appointment: any, index: number) => (
    <div key={index}>{JSON.stringify(appointment)}</div>
  ));
};
