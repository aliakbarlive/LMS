const userPopulate = {
  path: "createdBy",
  select: "_id name role email",
};
const feedbackPopulate = {
  path: "feedback",
  select: "_id comment rating courseId",
};

const allroles = [
  "admin",
  "instructor",
  "manager",
  "corporate",
  "editor",
  "student",
];
const isSuperAdmin = ["super admin", ...allroles];

export { userPopulate, feedbackPopulate, allroles, isSuperAdmin };
