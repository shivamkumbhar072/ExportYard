
const User = require("../models/user");
const Enquiry = require("../models/Enquiry");

// GET /api/admin/dashboard
const getDashboard = async (req, res) => {
  try {
    // Users registered in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalUsers,
      recentUsersCount,
      recentUsers,
      totalEnquiries,
      newEnquiriesCount,
      recentEnquiries,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      User.find()
        .select("name email role createdAt")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "New" }),
      Enquiry.find()
        .select("name productName enquiryType status createdAt")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        recentUsersCount,
        recentUsers,
        totalEnquiries,
        newEnquiriesCount,
        recentEnquiries,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard",
    });
  }
};

// GET /api/admin/users?page=1&limit=10&search=
const getUsers = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );
    const search = (req.query.search || "").trim();

    const filter = {};

    if (search) {
      // Escape special regex characters supplied by the user
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { email: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const [users, totalUsers] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      User.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          totalUsers,
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit),
          limit,
        },
      },
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};

module.exports = {
  getDashboard,
  getUsers,
};
