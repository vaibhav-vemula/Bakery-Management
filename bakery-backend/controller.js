const db = require("./db");

exports.getProducts = (req, res) => {
  db.task("get-products", (t) => {
    return t
      .any(`SELECT * FROM product`)
      .then((data) => {
        console.info("Get Products task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Could not find Products",
        });
      });
  }).catch((error) => {
    console.error("Get Products task failed with error:", error);
  });
};

exports.getTables = (req, res) => {
  db.task("get-tables", (t) => {
    return t
      .one(
        `SELECT 
          ARRAY_AGG(table_no ORDER BY table_no) AS tables 
          FROM tables WHERE 
          bakery_id = $1 AND reservation = false;`,
        [req.query.bakeryid]
      )
      .then((data) => {
        console.info("Get Tables task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Could not find tables",
        });
      });
  }).catch((error) => {
    console.error("Get tables task failed with error:", error);
  });
};

exports.addOrCheckUser = (req, res) => {
  const { table, bakeryid, name, phone } = req.body;

  db.task("addOrCheckUser", (t) => {
    return t
      .one(
        `WITH custo AS(
            INSERT INTO customer (cname, phno) VALUES ($1, $2) 
            ON CONFLICT (phno) 
            DO UPDATE SET cname = $1 RETURNING "customerID"
          )
          UPDATE tables SET 
            customer_id = (SELECT "customerID" FROM custo), 
            reservation = true
            WHERE table_no = $3 AND bakery_id = $4 RETURNING customer_id;
        `,
        [name, phone, table, bakeryid]
      )
      .then((data) => {
        console.info("addOrCheckUser task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Could not find addOrCheckUser",
        });
      });
  }).catch((error) => {
    console.error("addOrCheckUser task failed with error:", error);
  });
};

// UPDATE tables SET customer_id = null, reservation = false
// WHERE table_no = $1 AND bakery_id = $2;

// INSERT INTO bill(date, time, "customerID", "orderID")
//             VALUES (CURRENT_DATE, CURRENT_TIME, $3, $4)

// WITH sss AS(
//   SELECT SUM(p.price*cp.quantity) FROM customer_products cp, product p
//     WHERE cp."productID" = p."productID" AND cp."orderID"= $5 GROUP BY p."productID", cp.quantity
//     )
//     SELECT SUM(sum) FROM sss

exports.tableUpdate = (req, res) => {
  const { table, bakeryid, customer_id, orderids } = req.body;
  // console.log(req.body)
  console.log(orderids);
  var numberArray = orderids.map(Number);
  console.log(numberArray);

  db.task("tableUpdate", (t) => {
    return t
      .none(
        `
        BEGIN;
        
        UPDATE tables SET customer_id = null, reservation = false
        WHERE table_no = $1 AND bakery_id = $2;

        INSERT INTO bill(date, time, "customerID", "orderID")
        VALUES (CURRENT_DATE, CURRENT_TIME, $3, $4);

        COMMIT;

        `,
        [table, bakeryid, customer_id, numberArray]
      )
      .then((data) => {
        console.info("tableUpdate task completed.");
        data ={
          customer_id:null
        }
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Could not find tableUpdate",
        });
      });
  }).catch((error) => {
    console.error("tableUpdate task failed with error:", error);
  });
};

exports.orderItems = (req, res) => {
  const { table, customer_id, bakeryid, items } = req.body;
  const itemsjson = JSON.stringify(items);

  db.task("orderItems", (t) => {
    return t
      .any(
        `WITH ord AS(
          INSERT INTO orders (date, "customerID", tableno, "bakeryID")
          VALUES (CURRENT_DATE,$1, $2, $3) RETURNING "orderID"
        )
        SELECT insert_customer_products((SELECT "orderID" FROM ord),$4) AS order_id;
        `,
        [customer_id, table, bakeryid, itemsjson]
      )
      .then((data) => {
        console.info("orderItems task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Couldn't orderItems",
        });
      });
  }).catch((error) => {
    console.error("orderItems task failed with error:", error);
  });
};

exports.login = (req, res) => {
  const { emailid, password } = req.body;
  console.log(req.body);
  if(!(!/\D/.test(emailid))){
    res.send('not valid phone number')
  }
  db.task("login", (t) => {
    return t
      .one(
        `SELECT * FROM staff WHERE phno = $1 AND password = $2;
        `,
        [emailid,password]
      )
      .then((data) => {
        console.info("login task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "Invalid credentials",
        });
      });
  }).catch((error) => {
    console.error("login task failed with error:", error);
  });
};

exports.getPendingOrders = (req, res) => {
  // const { emailid, password } = req.body;
  // console.log(req.body);
  
  db.task("getPendingOrders", (t) => {
    return t
      .any(
        `SELECT 
          orderID, 
          status, 
          tableno, 
          customerID, 
          time_received 
          FROM orders WHERE status = 'false';`
      )
      .then((data) => {
        console.info("getPendingOrders task completed.");
        res.status(200).json({
          status: "success",
          api_data: data,
        });
      })
      .catch((err) => {
        res.json({
          message: "getPendingOrders failed",
        });
      });
  }).catch((error) => {
    console.error("getPendingOrders task failed with error:", error);
  });
};





