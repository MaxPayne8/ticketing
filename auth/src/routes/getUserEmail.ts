import express, { Request, Response } from "express";
import { validateRequest, BadRequestError } from "@zpticketing/common";
import { User } from "../models/Users"; // Adjust the path as needed

const router = express.Router();

router.post("/api/users/getuser", async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    throw new BadRequestError("User ID is required");
  }

  try {
    const user = await User.findById(userId); // Assuming User.findById method exists
    if (!user) {
      return res.status(404).send({ errors: [{ message: "User not found" }] });
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Internal Server Error" }] });
  }
});

export { router as getUserRouter };
