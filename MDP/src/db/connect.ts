import mongoose, { ConnectOptions } from "mongoose";
import log from "../logger";

function connect() {
  const dbUri = "mongodb+srv://g27:lapr5_DDHR@mdp-cluster.tmwjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  return mongoose
    .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;