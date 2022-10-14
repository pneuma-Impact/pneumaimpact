const {
  saveAudit,
  getAuditByUserId,
  getAllAudits,
} = require("../repositories/audit.repo");

exports.store = async (req, res) => {
  const businessPlan = req.body.businessPlan;
  const businessName = req.body.businessName;
  const meansOfIdentification = req.body.meansOfIdentification;

  const audit = await saveAudit({
    businessName,
    businessPlan,
    meansOfIdentification,
    userId: req.user.id,
  });

  return res.json({
    audit,
  });
};

exports.getMyAudit = async (req, res) => {
  try {
    const audit = await getAuditByUserId(req.user.id);
    return res.json({ audit });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "You have no audit." });
  }
};

exports.index = async (req, res) => {
  try {
    const audits = await getAllAudits();
    return res.json({ audits });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
