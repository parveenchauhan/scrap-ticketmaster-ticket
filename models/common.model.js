var db = require("../models");

module.exports = {
  replaceTextRowfromObj(rowData) {
    let jsonString = JSON.stringify(rowData);
    jsonString = jsonString.replace("TextRow ", "");
    return JSON.parse(jsonString);
  },
  async add(table, postData) {
    try {
      var qry = `insert into ${table} set `;
      for (const [key, value] of Object.entries(postData)) {
        qry += `${key} = '${value}',`;
      }
      qry = qry.slice(0, -1);
      let [queryRes] = await db.dbObj.query(qry);
      return queryRes;
    } catch (err) {
      throw new Error(err);
    }
  },
  async update(table, postData, where) {
    try {
      var qry = `update ${table} set `;
      for (const [key, value] of Object.entries(postData)) {
        qry += `${key} = '${value}',`;
      }
      qry = qry.slice(0, -1);

      qry += `where 1=1 `;

      for (const [k, v] of Object.entries(where)) {
        qry += `and ${k} = '${v}' `;
      }
      let [queryRes] = await db.dbObj.query(qry);
      return queryRes;
    } catch (err) {
      throw new Error(err);
    }
  },

  async isRecordExist(table, where) {
    try {
      var qry = `SELECT * from ${table} `;
      qry += `where 1=1 `;

      for (const [k, v] of Object.entries(where)) {
        qry += `and ${k} = '${v}' `;
      }
      let [queryRes] = await db.dbObj.query(qry, {
        type: db.dbObj.QueryTypes.SELECT,
      });
      if (queryRes) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  async getEventLists(source = "TM") {
    try {
      var [resultObj] = await db.dbObj.query(
        `SELECT 
            *
        FROM
        event_urls
        WHERE
        source = '${source}'`
      );
      if (resultObj) {
        return this.replaceTextRowfromObj(resultObj);
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(err);
    }
  },
};
