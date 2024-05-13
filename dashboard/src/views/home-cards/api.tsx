import axios, { AxiosResponse } from "axios";

// Define types for response data
interface ApiResponse {
  data: any; // Adjust 'any' to the actual type of your response data
}

// Define type for URL parameter
type ApiUrl = string;

// Define function signature with async and type annotations
const fetchDataFromApi = async (url: ApiUrl): Promise<any> => {
  try {
    const { data }: AxiosResponse<ApiResponse> = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from API.");
  }
};

export default fetchDataFromApi;
