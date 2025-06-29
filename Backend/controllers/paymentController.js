require("dotenv").config();
const AfricasTalking = require("africastalking");
const Payment = require("../models/paymentModel");
// const Request = require("../models/requestModel"); // uncomment if you enforce ownership

const at = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

async function payHomeowner(req, res) {
  try {
    const { requestId, homeownerId, amount, phoneNumber } = req.body;
    // Better: get collectorId from auth middleware (e.g. req.user.collectorId)
    const collectorId = req.user?.collectorId || req.body.collectorId;

    // Optional ownership check:
    // const request = await Request.findById(requestId);
    // if (!request || request.collectorId.toString() !== collectorId) {
    //   return res.status(403).json({ message: "Unauthorized or invalid request" });
    // }

    // Send airtime via Africa's Talking
    const result = await at.AIRTIME.send({
      recipients: [{
        phoneNumber,
        currencyCode: "KES",
        amount: amount.toString(),
      }],
    });
    const airtimeResponse = result.responses[0];

    // Save record
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

    return res.status(201).json({
      message: "Payment recorded and airtime sent",
      payment,
      airtime: airtimeResponse,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ message: "Payment failed", error: error.message });
  }
}

module.exports = { payHomeowner };
