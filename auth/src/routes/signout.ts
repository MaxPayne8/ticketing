import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  return res.send({ message: "signed out" });
});

export { router as signoutRouter };
