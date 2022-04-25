import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, Select } from "mui-rff";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { OnChange } from "react-final-form-listeners";
import { appointmentApi } from "api";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const services = [
  { label: "Service A", value: "SERVICE_A" },
  { label: "Service B", value: "SERVICE_B" },
  { label: "Service C", value: "SERVICE_C" },
  { label: "Service D", value: "SERVICE_D" },
];

export const Home = () => {
  const onDatePickerSubmit = (data: any) => {};
  const navigate = useNavigate();

  const [avaiableHours, setAvaiableHours] = useState<any>();
  const [hours, setHours] = useState<any>();

  const [appointment, setAppointment] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const selectOptions = avaiableHours?.map((hour: string) => ({
      label: hour,
      value: parseInt(hour.split(":")[0]),
    }));

    setHours(selectOptions);
  }, [avaiableHours]);

  const onSubmit = async (data: any) => {
    const { hour, service } = data;
    const { month, day, year } = appointment;
    await appointmentApi
      .setAppointment({
        hour,
        service,
        month,
        day,
        year,
      })
      .then(() => {
        navigate("/appointment-set");
      })
      .catch((error) => setErrorMessage(error.response.data.message));
  };

  return (
    <div>
      <Form
        onSubmit={onDatePickerSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker name="date" />
              <OnChange name="date">
                {async (value, previous) => {
                  const date = new Date(value);
                  const month = date.getUTCMonth() + 1; //months from 1-12
                  const day = date.getUTCDate();
                  const year = date.getUTCFullYear();
                  setAppointment((prev: any) => ({
                    ...prev,
                    month,
                    day,
                    year,
                  }));
                  await appointmentApi
                    .getAvaiableHours({ year, month, day })
                    .then((response) => {
                      setAvaiableHours(response.data);
                    });
                }}
              </OnChange>
            </LocalizationProvider>
          </form>
        )}
      />

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {!!hours && (
              <>
                <Select name="hour" data={hours} label="aviable times" />
                <Select name="service" data={services} label="services" />
              </>
            )}
            <Button type="submit">Submit</Button>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </form>
        )}
      />
    </div>
  );
};
