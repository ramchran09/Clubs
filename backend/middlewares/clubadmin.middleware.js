export const verifyClubEditAccess = (req, res, next) => {
  const { clubId } = req.params;

  if (req.user.role === "superAdmin") {
    return next();
  }

  const membership = req.user.clubs.find(
    c => c.club.toString() === clubId
  );

  if (!membership || !membership.canEdit) {
    return res.status(403).json({ message: "No edit permission" });
  }

  next();
};