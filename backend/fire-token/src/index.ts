import * as Express from "express";
import * as Cors from "cors";
import axios from "axios";
import { checkIfAuthenticated } from "./auth.middleware";

const app = Express();
const port = 3000;

app.use(Cors());

app.get("/", (_, response) => {
    return response.send("hello world");
});
app.get(
    "/meals",
    checkIfAuthenticated,
    async (_, response: Express.Response) => {
        const gotVal = await sendRequest();
        return response.json(gotVal.data);
    }
);

const sendRequest = async (): Promise<any> => {
    const meals = axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    return meals;
};
app.listen(port, () => console.log("working on port " + port));
