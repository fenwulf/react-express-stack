import { createDataProvider } from "@toolpad/studio-runtime/server";
import axios from "axios";

export default createDataProvider({
  paginationMode: 'index',
  async getRecords({ paginationModel: { start = 0, pageSize } }) {
    try {
      const response = await axios.get('http://localhost:3000/api/albums', {
        params: { start, pageSize },
      });

      return {
        records: response.data.data,
        totalCount: response.data.totalCount,
      };
    } catch (error) {
      console.error("Error fetching albums:", error);
      return { records: [] };
    }
  },
});