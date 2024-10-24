import { createDataProvider } from "@toolpad/studio-runtime/server";
import axios from "axios";

export default createDataProvider({
  paginationMode: 'index',
  async getRecords({ paginationModel: { start = 0, pageSize } }) {
    try {
      const response = await axios.get('http://localhost:3000/api/songs', {
        params: { start, pageSize },
      });

      const records = response.data.data;
      const totalCount = response.data.totalCount;

      return {
        records,
        totalCount,
      };
    } catch (error) {
      console.error("Error fetching records:", error);
      return { records: [], totalCount: 0 };
    }
  },
});