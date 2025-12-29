import config from "./config/index.js";
import app from "./app.js";

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
