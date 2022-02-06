import axios from "axios";
import { useState, useEffect } from "react";

import { TableComponent } from "./table";
import { AddUser } from "./addUser";

import css from "./styles.module.css";

export const Table = () => {
  const [tableData, setTableData] = useState([]);

  async function getTableData() {
    const req = await axios("https://api.artydev.ru/api/evergreen/");
    setTableData(req.data.data);
  }

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>
          Мониторинг авторов "Пульса" в "Тинькофф Инвестициях"
        </h1>
        <div className={css.addUserBlock}>
        <AddUser />
        </div>
        <TableComponent tableData={tableData} />
      </div>
    </div>
  );
};
