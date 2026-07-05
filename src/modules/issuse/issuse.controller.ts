import { Request, Response } from "express";
import { issueService } from "./issuse.service";


const createIssue = async (req: Request, res: Response) => {
  try {
    const reporterId = req.user!.id;

    const result = await issueService.createIssue(req.body, reporterId);

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};


const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssues(req.query);

    res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};


const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getSingleIssue(Number(req.params.id));

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.updateIssue(
      Number(req.params.id),
      req.body,
      req.user!,
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};


const deleteIssue = async (req: Request, res: Response) => {
  try {
    await issueService.deleteIssue(Number(req.params.id));

    return res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: (error as Error).message,
    });
  }
};



export const issueController = {
  createIssue,
  getAllIssues,
  updateIssue,
  deleteIssue,
  getSingleIssue
};


