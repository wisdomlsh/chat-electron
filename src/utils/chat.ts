export function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    // Accept: "application/json",
    Authorization: "",
  };

  return headers;
}

export function getQuerySearch(param: string) {
  const urlParams = new URLSearchParams(param);
  const id = urlParams.get("id");
  return id;
}
