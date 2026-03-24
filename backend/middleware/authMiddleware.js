const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization") || req.cookies?.token; // Change const to let
  // console.log("Received Token:", token); // Debugging
  console.log("Received Token:", token || "No Token Provided"); // Debugging

  // if (!token) {
  //   token = req.cookies?.token; // ✅ Now reassigning is possible
  // }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    if (token.includes("Bearer ")) {
      token = token.replace(/Bearer\s+/g, "").trim(); // Remove extra Bearer occurrences
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(400).json({ message: "Invalid Token: Missing userId" });
    }

    req.user = { id: decoded.id }; // Attach only userId
    console.log("User Authenticated with userId:", decoded.id); // Debugging
    next();
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};
