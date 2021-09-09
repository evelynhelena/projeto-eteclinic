import express from "express";
import db from "../../service/LoginService.js";
import {generatePasswords} from "../../helpers/userFeatures.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userEmail, password } = req.body;
  try{
      const userFind = await db.login(userEmail, password);
      userFind.length > 0
        ? res.status(200).send({ Message: "Login efetuado com sucesso" })
        : res.status(401).send({ error: "Usuário ou Senha Incorretos" });
  }catch{
      res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/reset", async (req, res) => {
  const { userEmail } = req.body;
  const newPassword = generatePasswords();;
  await db.changePassword(newPassword,userEmail);
  res.end();
 /* try{
      const userFind = await db.login(userEmail, password);
      userFind.length > 0
        ? res.status(200).send({ Message: "Login efetuado com sucesso" })
        : res.status(401).send({ error: "Usuário ou Senha Incorretos" });
  }catch{
      res.status(500).send({ error: "Internal Server Error" });
  }*/
});

export default router;
