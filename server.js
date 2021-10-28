const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
//const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
//app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: "1.0.0",
      title: "BOTA Tarot API",
      description: "Info on Builders of the Adytum tarot's major arcana",
      contact: {
        name: "eligna6"
      },
      servers: ["http://localhost:8004"]
    }
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes middlewares
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


