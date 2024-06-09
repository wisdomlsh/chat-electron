import { request } from "@umijs/max";

//获取当前的地理位置
export async function fetchGeoLocation(options: { location: string }) {
  return request<any>(
    `https://restapi.amap.com/v3/geocode/regeo?key=${process.env.UMI_APP_GEOLOCATION_KEY}&location=${options.location}`,
    {
      method: "GET",
    }
  );
}
