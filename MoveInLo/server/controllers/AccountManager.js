// Convert id from string to ObjectId for the _id.
// const { ObjectId: accountId } = require("mongodb");
const Account = require("../models/account");

const getAccount = async (req, res) => {
  try {
    console.log("Attempting to find account...");

    const { email, type } = req.query;

    const account = await Account.findOne({ email, type });

    if (!account) {
      return res
        .status(400)
        .json({ success: false, body: "Account does not exists." });
    }

    console.log(`Found account: ${account}`);
    return res.status(200).json({ success: true, body: account });
  } catch (error) {
    return res.status(500).json({ success: false, body: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    console.log("Attempting to create a new account...");

    const { username, email, type, age, number, password } = req.body;

    const account = await Account.findOne({ email });

    if (account) {
      return res
        .status(400)
        .json({ success: false, body: "Account already exists." });
    }

    const newAccount = await Account.create({
      username,
      email,
      type,
      age,
      number,
      password,
    });

    console.log("Successfully added new account.");
    return res.status(200).json({ success: true, body: newAccount });
  } catch (error) {
    return res.status(500).json({ success: false, body: error.message });
  }
};

const loginAccount = async (req, res) => {
  try {
    console.log("Attempting to login..");

    const { username, password, type } = req.body;

    const authenticatedAccount = await Account.findOne({
      username,
      type,
    });

    console.log("Found Account");

    if (authenticatedAccount === null) {
      return res
        .status(400)
        .json({ success: false, body: "Invalid username and/or type." });
    }

    if (authenticatedAccount.password !== password) {
      return res
        .status(400)
        .json({ success: false, body: "Invalid password." });
    }

    console.log("Successfully login.");
    return res.status(200).json({ success: true, body: authenticatedAccount });
  } catch (error) {
    return res.status(500).json({ success: false, body: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    console.log("Attempting to update new password...");

    const { id } = req.params;
    const { newPassword } = req.body;

    const updatedAccount = await Account.updateOne(id, {
      password: newPassword,
    });

    if (!updatedAccount) {
      return res
        .status(400)
        .json({ success: false, body: "Failed to update password." });
    }

    console.log("Successfully updated password.");
    return res.status(200).json({ success: true, body: updatedAccount });
  } catch (error) {
    return res.status(500).json({ success: false, body: error.message });
  }
};

module.exports = { getAccount, createAccount, updatePassword, loginAccount };
