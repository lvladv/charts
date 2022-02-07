import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/amcharts";

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
    const req = await axios(`https://api.artydev.ru/api/evergreen/${id}`);
    const newData = req.data.data.map((item) => ({
      date: String(item.parse_dt),
      year_relative_yield: Number(item.year_relative_yield),
      // amt: Number(item.month_operations_count),
    }));
    setData(newData.reverse());
    setAuthor(req.data.author);
  }

  useEffect(() => {
    getChartInfo();
  }, []);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.verticalCenter = "small";
    categoryAxis.renderer.labels.template.horizontalCenter = "right";

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "year_relative_yield";
    series.dataFields.categoryX = "date";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    var bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
      if (target.dataItem.valueY < 0) {
        return am4core.color("#FF0000");
      }
      return fill;
    });
    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    // var scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();
  }, [data]);

  return (
    <div className={css.wrapper}>
      <Button onClick={() => history.push("/")}>К списку</Button>
      <h3>{author}</h3>
      <div className={css.chartWrap}>
        <div id="chartdiv" style={{ width: "90%", height: "500px" }} />

        {/* <LineChart
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
          <YAxis
            dataKey="year_relative_yield"
            type="number"
            label={<LabelY />}
            className={css.yAx}
          />
          <Tooltip label="Ghbdtn" />
          <Line
            type="natural"
            dataKey="year_relative_yield"
            stroke="#82ca9d"
            activeDot={{ r: 6 }}
          />
        </LineChart> */}
      </div>
    </div>
  );
};
