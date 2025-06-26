require("dotenv").config();
const AfricasTalking = require("africastalking");
const Payment = require("../models/paymentModel");
// if you do have a Request model file, make sure the filename matches exactly, e.g.:
// const Request = require("../models/requestModel");

const at = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey:   process.env.AT_API_KEY,
});

// rename to payHomeowner so it matches your routes.js import
async function payHomeowner(req, res) {
  try {
    const { requestId, homeownerId, amount, phoneNumber, collectorId } = req.body;
    // if you want to enforce collector ownership, re-add your Request find here
    // const request = await Request.findById(requestId);
    // if (!request || request.collectorId.toString() !== collectorId) {
    //   return res.status(403).json({ message: "Unauthorized or invalid request" });
    // }

    const result = await at.AIRTIME.send({
      recipients: [
        {
          phoneNumber,
          currencyCode: "KES",
          amount: amount.toString(),
        },
      ],
    });
    const airtimeResponse = result.responses[0];

    const payment = new Payment({
      requestId,
      collectorId,
      homeownerId,
      amount,
      phoneNumber,
      transactionId: airtimeResponse.requestId,
      status: airtimeResponse.status,
    });
    await payment.save();

    res.status(201).json({
      message: "Payment recorded and airtime sent",
      payment,
      airtime: airtimeResponse,
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
}

module.exports = { payHomeowner };
