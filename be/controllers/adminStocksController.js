const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {},

  getDataById: (req, res) => {
    let scriptQuery = `SELECT p.idProduct, productName, price, productImage, description, p.idCategory, category, idUser, warehouse, quantity 
    FROM db_warehouse1.adminstocks adm 
    JOIN products p on adm.idProduct = p.idProduct
    JOIN categories c on p.idCategory = c.idCategory
    JOIN warehouses w on adm.idWarehouse = w.idWarehouse
    WHERE w.idUser = ${(db, escape(req.query.idUser))}
    AND p.idProduct = ${db.escape(req.params.idProduct)};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  addData: (req, res) => {
    let scriptQuery = `INSERT INTO db_warehouse1.adminstocks VALUES (${db.escape(
      null
    )}, ${db.escape(req.body.idProduct)}, ${db.escape(
      req.body.idWarehouse
    )}, ${db.escape(req.body.quantity)});`;

    console.log(req.body.idProduct);
    console.log(req.body.idWarehouse);
    console.log(req.body.quantity);

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },

  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    console.log(dataUpdate);

    let scriptQuery = `UPDATE db_warehouse1.adminstocks SET ${dataUpdate} WHERE idProduct = ${req.params.idProduct} AND idWarehouse = ${req.query.idWarehouse}`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal merubah data di database",
          success: false,
          err,
        });
      }
      res.status(200).send(results);
    });
  },

  deleteData: (req, res) => {},
};
