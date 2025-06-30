require("dotenv").config();
const AfricasTalking = require("africastalking");
const Payment = require("../models/paymentModel");
// const Request = require("../models/requestModel"); // uncomment to enforce ownership checks

const at = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

// 1️⃣ Process a payment: send airtime & record it
async function payHomeowner(req, res) {
  try {
    const { requestId, homeownerId, amount, phoneNumber } = req.body;
    // Ideally, collectorId comes from auth middleware:
    const collectorId = req.user?.collectorId || req.body.collectorId;

    // Optional: enforce that this collector owns the request
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

    // Persist payment record
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

// 2️⃣ List payments by collector
async function getPaymentsByCollector(req, res) {
  try {
    const { collectorId } = req.params;
    const payments = await Payment.find({ collectorId })
      .sort({ paidAt: -1 })
      .populate('requestId', 'scrapType weight')
      .populate('homeownerId', 'fullName');
    return res.json({ payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch payments", error: error.message });
  }
}

// 3️⃣ List payments received by homeowner
async function getPaymentsByHomeowner(req, res) {
  try {
    const { homeownerId } = req.params;
    const payments = await Payment.find({ homeownerId })
      .sort({ paidAt: -1 })
      .populate('requestId', 'scrapType weight')
      .populate('collectorId', 'fullName');
    return res.json({ payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Could not fetch payments", error: error.message });
  }
}

module.exports = {
  payHomeowner,
  getPaymentsByCollector,
  getPaymentsByHomeowner,
};
