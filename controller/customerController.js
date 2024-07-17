// const Customer = require("../models/user");

// const createCustomer = async (req, res) => {
//   try {
//     const { name, email, mobile, duration, startDate, endDate } = req.body;
//     var start = new Date();
//     var newDate = start.toLocaleDateString();
//     console.log("newDate = ", newDate);
//     start.setMonth(start.getMonth() + duration);
//     var newEndDate = start.toLocaleDateString();
//     const customer = await Customer.findOne({ where: { mobile: mobile } });
//     if (customer) {
//       var updateCustomer = await customer.update({
//         startDate: newDate,
//         endDate: newEndDate,
//         duration: duration,
//       });
//     }
//     var newCustomer = await Customer.create({
//       name: name,
//       email: email,
//       mobile: mobile,
//       duration: duration,
//       startDate: newDate,
//       endDate: newEndDate,
//     });
//     res.status(201).json(customer);
//   } catch (error) {
//     console.log("error == ", error);
//     res.status(500).json({ error: "Failed to create or update customer" });
//   }
// };
// module.exports = { createCustomer };

const Customer = require("../models/user");

const createCustomer = async (req, res) => {
  try {
    const { name, email, mobile, duration, startDate } = req.body;

    // // Calculate startDate and endDate
    // const start = new Date();
    // const newDate = start.toISOString().split("T")[0]; // "yyyy-mm-dd"
    // start.setMonth(start.getMonth() + duration);
    // const newEndDate = start.toISOString().split("T")[0]; // "yyyy-mm-dd"

    // const start = new Date();
    // const newDate = start.toLocaleDateString();
    // start.setMonth(start.getMonth() + duration);
    // const newEndDate = start.toLocaleDateString();

    const newDate = new Date(startDate);

    // Check if start is a valid date
    if (isNaN(newDate.getTime())) {
      return res.status(400).json({ error: "Invalid startDate format" });
    }

    // Calculate endDate based on startDate and duration
    const newEndDate = new Date(newDate);
    newEndDate.setMonth(newEndDate.getMonth() + duration);
    //const newEndDate = newDate.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"

    console.log(
      "newDate = ",
      newDate,
      "endDate = ",
      newEndDate,
      "duration == ",
      duration
    );

    // Check if customer already exists
    let customer = await Customer.findOne({ where: { mobile: mobile } });

    if (customer) {
      // Update existing customer
      customer = await customer.update({
        startDate: newDate,
        endDate: newEndDate,
        duration: duration,
      });
    } else {
      // Create new customer
      customer = await Customer.create({
        name: name,
        email: email,
        mobile: mobile,
        startDate: newDate,
        endDate: newEndDate,
        duration: duration,
      });
    }

    // Respond with the created or updated customer object
    res.status(201).json(customer);
  } catch (error) {
    console.log("error == ", error);
    res.status(500).json({ error: "Failed to create or update customer" });
  }
};

module.exports = { createCustomer };
