const mongoose = require("mongoose");
const Enquiry = require("../models/Enquiry");

const ALLOWED_TYPES = ["Buyer", "Supplier"];
const ALLOWED_STATUSES = [
  "New",
  "Contacted",
  "Quoted",
  "Negotiating",
  "Converted",
  "Closed",
];

const optionalText = (value) => (typeof value === "string" ? value.trim() : "");

// PUBLIC: Submit a buyer or supplier enquiry.
const createEnquiry = async (req, res) => {
  try {
    const {
      enquiryType,
      productName,
      name,
      companyName,
      email,
      whatsappCountryCode,
      whatsappNumber,
      originCountry,
      destinationCountry,
      requestedQuantity,
      targetTimeline,
      destinationPort,
      requirements,
      whatsappConsent,
    } = req.body;

    if (!ALLOWED_TYPES.includes(enquiryType)) {
      return res.status(400).json({
        success: false,
        message: "Choose whether you are enquiring as a buyer or supplier",
      });
    }

    const requiredStrings = {
      productName,
      name,
      email,
      whatsappCountryCode,
      whatsappNumber,
    };

    for (const [field, value] of Object.entries(requiredStrings)) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters",
      });
    }

    if (productName.trim().length > 150) {
      return res.status(400).json({
        success: false,
        message: "Product name cannot exceed 150 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const normalizedCountryCode = whatsappCountryCode.trim();
    if (!/^\+?[0-9]{1,5}$/.test(normalizedCountryCode)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid WhatsApp country code",
      });
    }

    const normalizedWhatsapp = whatsappNumber.replace(/[\s()-]/g, "");
    if (!/^[0-9]{5,20}$/.test(normalizedWhatsapp)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid WhatsApp number",
      });
    }

    const textFields = {
      companyName: [companyName, 150],
      originCountry: [originCountry, 100],
      destinationCountry: [destinationCountry, 100],
      requestedQuantity: [requestedQuantity, 100],
      targetTimeline: [targetTimeline, 100],
      destinationPort: [destinationPort, 150],
      requirements: [requirements, 3000],
    };

    for (const [field, [value, maxLength]] of Object.entries(textFields)) {
      if (typeof value === "string" && value.trim().length > maxLength) {
        return res.status(400).json({
          success: false,
          message: `${field} cannot exceed ${maxLength} characters`,
        });
      }
    }

    const enquiry = await Enquiry.create({
      submittedBy: req.user.userId,
      enquiryType,
      productName: productName.trim(),
      name: name.trim(),
      companyName: optionalText(companyName),
      email: normalizedEmail,
      whatsappCountryCode: normalizedCountryCode.startsWith("+")
        ? normalizedCountryCode
        : `+${normalizedCountryCode}`,
      whatsappNumber: normalizedWhatsapp,
      originCountry: optionalText(originCountry),
      destinationCountry: optionalText(destinationCountry),
      requestedQuantity: optionalText(requestedQuantity),
      targetTimeline: optionalText(targetTimeline),
      destinationPort: optionalText(destinationPort),
      requirements: optionalText(requirements),
      whatsappConsent: whatsappConsent === true,
    });

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully",
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error("Create enquiry error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry",
    });
  }
};

// ADMIN: List, search and paginate enquiries.
const getEnquiries = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim().slice(0, 100)
        : "";
    const filter = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedSearch, "i");
      filter.$or = [
        { name: regex },
        { companyName: regex },
        { email: regex },
        { productName: regex },
        { originCountry: regex },
        { destinationCountry: regex },
        { whatsappNumber: regex },
      ];
    }

    if (
      typeof req.query.status === "string" &&
      ALLOWED_STATUSES.includes(req.query.status)
    ) {
      filter.status = req.query.status;
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .select("-__v")
        .populate("submittedBy", "name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get enquiries error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries",
    });
  }
};

// ADMIN: Get one enquiry.
const getEnquiryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID",
      });
    }

    const enquiry = await Enquiry.findById(req.params.id)
      .select("-__v")
      .populate("submittedBy", "name email");
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({ success: true, enquiry });
  } catch (error) {
    console.error("Get enquiry error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiry",
    });
  }
};

// ADMIN: Update enquiry status.
const updateEnquiryStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID",
      });
    }

    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .populate("submittedBy", "name email");

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry status error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry",
    });
  }
};

// ADMIN: Delete an enquiry.
const deleteEnquiry = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID",
      });
    }

    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to delete enquiry",
    });
  }
};

// ADMIN: Enquiry dashboard counts.
const getEnquiryStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [total, newCount, recentCount] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        receivedLast7Days: recentCount,
      },
    });
  } catch (error) {
    console.error("Get enquiry stats error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiry statistics",
    });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
};
