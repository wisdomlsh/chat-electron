import { useState } from "react";

export default () => {
  const DEFAULT_APP_STATE: {
    country: string;
  } = {
    country: "",
  };

  const [app, setApp] = useState(DEFAULT_APP_STATE);

  return { app, setApp };
};
