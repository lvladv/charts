import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import Button from "@mui/material/Button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import css from "./styles.module.css";

export const UserInfo = () => {
  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [author, setAuthor] = useState("");

  async function getChartInfo() {
    const req = await axios(`http://151.248.112.110:3000/api/evergreen/${id}`);
    const newData = req.data.data.map((item) => ({
      name: String(item.parse_dt),
      year_relative_yield: Number(item.year_relative_yield),
      amt: Number(item.month_operations_count),
    }));
    setData(newData.reverse());
    setAuthor(req.data.author);
  }

  useEffect(() => {
    getChartInfo();
  }, []);

  console.log(data);

  return (
    <div className={css.wrapper}>
      <Button onClick={() => history.push("/")}>К списку</Button>
      <h3>{author}</h3>
      <div className={css.chartWrap}>
        <LineChart
          width={900}
          height={500}
          syncId="anyId"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="year_relative_yield" />
          <Tooltip label='Ghbdtn'  />
          {/* <Legend /> */}
          <Line
            type="natural"
            dataKey="year_relative_yield"
            stroke="#01579b"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};
