const mongoose = require("mongoose");
const mongoURI = `${process.env.MONGO_URI}`;

mongoose.connect(mongoURI, { connectTimeoutMS: 40000 })
    .then(() => { console.log("Connected to MongoDB"); })
    .catch((error) => { console.error("Error connecting to MongoDB:", error.message); });

const db = mongoose.connection;
const connection = mongoose.connection;
const createFromHexString = mongoose.Types.ObjectId.createFromHexString;

db.on("error", (error) => console.error("MongoDB connection error:", error.message));
db.on("disconnected", () => console.log("Disconnected from MongoDB"));
process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongoose connection is disconnected due to application termination");
        process.exit(0);
    });
});

const User = require("./User");
const Admin = require("./Admin");
const UserOTP = require("./UserOTP");
const GeneralSetting = require("./GeneralSetting");
const DiscountCoupon = require("./DiscountCoupon");
const ContactUs = require("./ContactUs")
const Retreat = require("./Retreat")
const Booking = require('./Booking')
const OnlineProgramPrice = require('./OnlineProgramPrice')
const SushmaElementaEnquiry = require('./SushmaElementaEnquiry')
const SushmaGroupEnquiry = require('./SushmaGroupEnquiry')
const MedallionEnquiry = require('./MedallionEnquiry')
const MedallionAurumEnquiry = require('./MedallionAurumEnquiry')
const SushmaBellezaEnquiry = require('./SushmaBellezaEnquiry')
const PinnacleEnquiry = require('./PinnacleEnquiry')



module.exports = {PinnacleEnquiry, SushmaBellezaEnquiry, MedallionAurumEnquiry, MedallionEnquiry, SushmaGroupEnquiry, SushmaElementaEnquiry, User, Admin, UserOTP, GeneralSetting, ContactUs, DiscountCoupon, Retreat, Booking, OnlineProgramPrice, mongoose, connection, createFromHexString, db };