const { dataOffset } = require("../commons/utils");
const { Audit } = require("../models");

exports.saveAudit = async (data) => {
  try {
    let audit;
    audit = await Audit.findOne({ userId: data.userId });
    if (!audit) {
      audit = new Audit();
    }
    audit.userId = data.userId;
    audit.businessName = data.businessName;
    audit.businessPlan = data.businessPlan;
    audit.meansOfIdentification = data.meansOfIdentification;
    // Make sure that for every time it is editted by user, The user has to wait for approval
    audit.approved = false;

    await audit.save();
    return audit;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getAuditByUserId = async (userId) => {
  try {
    const audit = await Audit.findOne({ userId }).exec();
    if (!audit) {
      return Promise.reject("Audit not found");
    }
    return audit;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getAuditById = async (id) => {
  try {
    const audit = await Audit.findById(id).exec();
    if (!audit) {
      return Promise.reject("Audit not found");
    }
    return audit;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getAllAudits = async (page = 1, perPage = 20) => {
  try {
    const audits = await Audit.find({})
      .skip(dataOffset(page, perPage))
      .limit(perPage)
      .sort({ createdAt: "desc" })
      .exec();
    return audits;
  } catch (error) {
    return Promise.reject(error);
  }
};
