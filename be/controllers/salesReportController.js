const { db, query } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getRevenueYear: (req, res) => {
    let scriptQuery = `SELECT YEAR(transactionDate) AS period, SUM(subtotalPrice) AS revenueOfThePeriod
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    GROUP BY YEAR(transactionDate);`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getRevenueMonth: (req, res) => {
    let scriptQuery = `SELECT MONTH(transactionDate) AS period, SUM(subtotalPrice) AS revenueOfThePeriod
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    AND YEAR(t.transactionDate) = ${db.escape(req.query.year)}
    GROUP BY MONTH(transactionDate);`;
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getRevenueDay: (req, res) => {
    let scriptQuery = `SELECT DAY(transactionDate) AS period, SUM(subtotalPrice) AS revenueOfThePeriod
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    AND MONTH(t.transactionDate) = ${db.escape(req.query.month)}
    AND YEAR(t.transactionDate) = ${db.escape(req.query.year)}
    GROUP BY DAY(transactionDate);`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getTransactionStatus: (req, res) => {
    let scriptQuery = `SELECT s.status, COUNT(*) AS jumlahOrder from db_warehouse1.transactions t
    JOIN status s ON t.idStatus = s.idStatus
    WHERE t.idWarehouse = ${db.escape(req.query.idWarehouse)}
    GROUP BY t.idStatus;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getDemographic: (req, res) => {
    let scriptQuery = `SELECT a.kota, SUM(subtotalPrice) AS revenueKota
    FROM db_warehouse1.transactions t
    JOIN addresses a ON t.idAddress = a.idAddress
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    AND idStatus = 8
    GROUP BY a.kota
    ORDER BY revenueKota DESC
    LIMIT 5;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  getBestSelling: (req, res) => {
    let scriptQuery = `SELECT p.productImage, p.productName, SUM(quantity) AS soldQuantity
    FROM db_warehouse1.transactions t
    JOIN checkouts c ON c.idTransaction = t.idTransaction
    JOIN products p ON c.idProduct = p.idProduct
    WHERE idWarehouse = ${db.escape(req.query.idWarehouse)}
    GROUP BY p.productName, p.productImage
    ORDER BY soldQuantity DESC
    LIMIT 5;`;
    db.query(scriptQuery, (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Error Occurs", success: false, err });
      }

      return res.status(200).send({
        message: "Berahasil Mengambil data Status ",
        results,
        success: true,
      });
    });
  },

  currentRevenue: async (req, res) => {
    const idWarehouse = req.query.idWarehouse
    try {
      const currentRevenue = []
      //AllTime
      const revenueAllTime = await query(`
      SELECT sum(subtotalPrice) AS allRevenue FROM transactions 
      WHERE idStatus = 8 AND idWarehouse = ${idWarehouse} ;
      `)
      currentRevenue.push(revenueAllTime[0].allRevenue)
      //Month
      const revenueThisMonth = await query(`
      SELECT sum(subtotalPrice) AS monthRevenue FROM transactions 
      WHERE idStatus = 8 
      AND idWarehouse = ${idWarehouse}
      AND month(transactionDate)= month(curdate());
      `)
      currentRevenue.push(revenueThisMonth[0].monthRevenue)
      //Week
      const revenueThisWeek = await query(`
      SELECT sum(subtotalPrice) AS weekRevenue FROM transactions 
      WHERE idStatus = 8 
      AND idWarehouse = ${idWarehouse}
      AND week(transactionDate)= week(curdate());
      `)
      currentRevenue.push(revenueThisWeek[0].weekRevenue)
      //Response
      res.status(200).send(currentRevenue)

    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }
  }
};



/*
    montRevenue:(req,res) => {
    let query = `SELECT sum(subtotalPrice) AS revenueMonth FROM transactions
    WHERE idStatus = 8
    AND idWarehouse = ${req.query.idWarehouse}
    AND month(transactionDate)= ${req.query.monthNumber};`

    db.query(query, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)
      }
      res.status(200).send(results[0])
    })
  },
 */
