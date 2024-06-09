import { fetchGeoLocation } from "@/services/geolocation";

export const acquiringCountry = async () => {
  let district;
  const successCallback = async (position: {
    coords: { latitude: any; longitude: any };
  }) => {
    const { latitude, longitude } = position.coords;
    const { regeocode } = await fetchGeoLocation({
      location: `${longitude},${latitude}`,
    });
    district = regeocode.addressComponent.country;
    return district;
  };

  const errorCallback = (error: { code: any; message: any }) => {
    console.error(`Error Code = ${error.code} - ${error.message}`);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};
