import express, { json } from "express";
import { getAllCommunities } from "./Firebase/dataGrab.js";
import { userRouter } from "./Routes/user.js";


const app = express();
const PORT = 5150;
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/api", async (request, response) => {
    let a =  (await getAllCommunities());
    // let a = await (await getAllCommunities()).map((a)=>a.communityAssociationName);
    // console.log(a);
    response.send(a);
  });

  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });

