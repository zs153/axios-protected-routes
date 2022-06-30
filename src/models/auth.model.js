import oracledb from "oracledb";
import { simpleExecute } from "../services/database.js";

const baseQuery = `SELECT 
    uu.userid,
    uu.pwdusu
  FROM usuarios uu
`;

export const find = async (context) => {
  let query = baseQuery;
  let binds = {};

  if (context.idusua) {
    binds.idusua = context.idusua;
    query += "WHERE idusua = :idusua";
  }
  if (context.userid) {
    binds.userid = context.userid;
    query += "WHERE userid = :userid";
  }
  if (context.emausu) {
    binds.emausu = context.emausu;
    query += "WHERE emausu = :emausu";
  }

  const result = await simpleExecute(query, binds);
  return result.rows;
};
