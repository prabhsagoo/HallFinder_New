import express, { json } from "express";
import { getAllCommunities } from "./Firebase/dataGrab.js";
import { userRouter } from "./Routes/user.js";
import path from "path";

const app = express();

const __dirname = path.resolve();
const pathToBuild = path.join(__dirname, "../frontend/dist");
console.log(pathToBuild);
app.use(express.static(pathToBuild));

const PORT = 5150;
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/api", async (request, response) => {
  let a = await getAllCommunities();
  // let a = await (await getAllCommunities()).map((a)=>a.communityAssociationName);
  // console.log(a);
  response.send(a);
});

app.use("*", (req, res) => {
  res.sendFile(path.join(pathToBuild, "index.html"));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
