import "dotenv/config";
import app from "./app";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT} ✅`);
});
