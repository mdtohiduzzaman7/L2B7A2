import { Router } from "express";
import { issueController } from "./issuse.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth("contributor", "maintainer"),
  issueController.createIssue,
);

router.get("/", issueController.getAllIssues);

// single
router.get("/:id", issueController.getSingleIssue);

router.patch(
  "/:id",
  auth("contributor", "maintainer"),
  issueController.updateIssue,
);

router.delete("/:id", auth("maintainer"), issueController.deleteIssue);

export const issueRouter = router;
