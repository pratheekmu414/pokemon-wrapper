import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./logger";
import { container } from "./src/ioc.config";
import { InversifyExpressServer } from "inversify-express-utils";
const bodyParser = require("body-parser");


const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // For legacy browser support
};

dotenv.config();

const port = process.env.PORT;
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
});

let app = server.build();


app.listen(port, () => {
  logger.info(`[server]: Server is running at port:${port}`);
});
