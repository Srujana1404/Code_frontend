import { useState } from "react";
import Axios from "axios";

export default function App() {
  const [message, setMessage] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await Axios.get<{ message: string }>(`/api/submit`);
      setMessage(response.data.message); // Extract the 'message' field
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Click me
      </button>
      
      {message && (
        <div className="bg-gray-100 border border-gray-300 p-4 rounded shadow-md">
          {message}
        </div>
      )}
    </div>
  );
}
