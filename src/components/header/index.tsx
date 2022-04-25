import { Button } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { IUser } from "types";

export const Header = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // setUser(jwtDecode(token));
  }, []);

  return (
    <header>
      <h1>header</h1>
      <Button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        sign out
      </Button>
    </header>
  );
};
