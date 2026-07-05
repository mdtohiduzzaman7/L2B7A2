import { pool } from "../../database/db";

const createIssue = async (
  payload: {
    title: string;
    description: string;
    type: string;
  },
  reporterId: number,
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, description, type, reporterId],
  );

  return result.rows[0];
};




const getAllIssues = async (query: any) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const values: any[] = [];
  const conditions: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql +=
    sort === "oldest"
      ? " ORDER BY created_at ASC"
      : " ORDER BY created_at DESC";

  // First Query
  const issuesResult = await pool.query(sql, values);

  const issues = issuesResult.rows;

  if (issues.length === 0) {
    return [];
  }

  // Get all reporter ids
  const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

  // Second Query
  const usersResult = await pool.query(
    `SELECT id,name,role FROM users WHERE id = ANY($1)`,
    [reporterIds],
  );

  const reporters = usersResult.rows;

  const reporterMap = new Map();

  reporters.forEach((user) => {
    reporterMap.set(user.id, user);
  });

  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterMap.get(issue.reporter_id),
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));
};

const getSingleIssue = async (id: number) => {
  // First query: get issue
  const issueResult = await pool.query("SELECT * FROM issues WHERE id = $1", [
    id,
  ]);

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // Second query: get reporter
  const userResult = await pool.query(
    "SELECT id, name, role FROM users WHERE id = $1",
    [issue.reporter_id],
  );

  const reporter = userResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};



const updateIssue = async (
  issueId: number,
  payload: {
    title: string;
    description: string;
    type: string;
  },
  user: {
    id: number;
    role: string;
  },
) => {
  // Find Issue
  const issueResult = await pool.query("SELECT * FROM issues WHERE id = $1", [
    issueId,
  ]);

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // Contributor Permission
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("You can only update your own issues");
    }

    if (issue.status !== "open") {
      throw new Error("Only open issues can be updated");
    }
  }

  // Update
  const result = await pool.query(
    `UPDATE issues
     SET title=$1,
         description=$2,
         type=$3,
         updated_at=CURRENT_TIMESTAMP
     WHERE id=$4
     RETURNING *`,
    [payload.title, payload.description, payload.type, issueId],
  );

  return result.rows[0];
};


const deleteIssue = async (id: number) => {
  // Check issue exists
  const issue = await pool.query("SELECT id FROM issues WHERE id = $1", [id]);

  if (issue.rows.length === 0) {
    throw new Error("Issue not found");
  }

  // Delete issue
  await pool.query("DELETE FROM issues WHERE id = $1", [id]);
};




export const issueService = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};

