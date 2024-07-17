const cron = require("node-cron");
const { Op } = require("sequelize");
const Customer = require("./models/user");
const twilio = require("twilio");

const accountSid = "";
const authToken = "";
const client = new twilio(accountSid, authToken);

// Define your cron job
const cronJob = () => {
  // Schedule a job to run every day at midnight
  cron.schedule("* * * * *", async () => {
    console.log("Running daily job to check past dates");

    try {
      const today = new Date().toISOString().split("T")[0];

      // Find customers with endDate less than today
      const customers = await Customer.findAll({
        where: {
          endDate: {
            [Op.lt]: today,
          },
        },
      });

      if (customers.length > 0) {
        customers.forEach((customer) => {
          const message = `Dear ${customer.name}, your subscription ended on ${customer.endDate}. Please renew it.`;

          // Send SMS using Twilio
          client.messages
            .create({
              body: message,
              from: "",
              to: customer.mobile,
            })
            .then((message) =>
              console.log(`SMS sent to ${customer.mobile}: ${message.sid}`)
            )
            .catch((error) => console.error("Error sending SMS:", error));
        });
      } else {
        console.log("No customers with past end dates found");
      }
    } catch (error) {
      console.error("Error running daily job:", error);
    }
  });
};

module.exports = cronJob;
