require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())

const UserModel = require("./models/UserModel")

mongoose.connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log(`Connected to db ${process.env.MONGODB_CONNECTION}`)
  })


app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
})



app.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        // Return user data without password
        const { password, ...userData } = user.toObject();
        res.json({ status: "success", user: userData });
      } else {
        res.status(401).json({ status: "error", message: "Password is incorrect" });
      }
    } else {
      res.status(404).json({ status: "error", message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


app.get("/user-info/:email", async (req, res) => {
  try {
    const user = await UserModel.findOne(
      { email: req.params.email },
      { password: 0 } 
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/withdraw", async (req, res) => {
  const { account, amount } = req.body;
  
  try {
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const parsedAmount = parseFloat(amount);

    var targetUser = await UserModel.findOne(
      {accountNumber: account}
    )
  
    if(!targetUser) {
      return res.status(400).send("Account not found")
    }
  
    if(parsedAmount > targetUser.balance) {
      return res.status(400).send("Insufficient Balance")
    }
  
    const result = await UserModel.updateOne(
      {accountNumber: account}, // query
      {$inc: {balance: -parsedAmount}}  // update kia krna hai
    )
  
    if(result.modifiedCount === 0) {
      return res.status(400).send("Error Withdrawing")
    }
  
    return res.send("Withdrawal Succesful")
  } catch (error) {
    console.error('Server error:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.post("/deposit", async (req, res) => {
  const { account, amount } = req.body;

  try {
    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const parsedAmount = parseFloat(amount);

    // Update account balance
    const result = await UserModel.updateOne(
      { accountNumber: account },  // Condition to match the account
      { $inc: { balance: parsedAmount } }  // Increment balance by the amount
    );

    // If no account was updated, return an error
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Account not found' });
    } else {
      res.status(200).json({ message: 'Deposit successful' });
    }

  } catch (error) {
    console.error('Server error:', error); // Log the error to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {senderAccountNumber, recipientAccountNumber, amount} = req.body;
    
    // Input validation
    if (!senderAccountNumber || !recipientAccountNumber || !amount) {
      throw new Error('Missing required fields');
    }
    
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new Error('Invalid amount');
    }

    // Check if sender and recipient exist
    const sender = await UserModel.findOne({ accountNumber: senderAccountNumber }).session(session);
    const recipient = await UserModel.findOne({ accountNumber: recipientAccountNumber }).session(session);

    if (!sender) throw new Error('Sender account not found');
    if (!recipient) throw new Error('Recipient account not found');
    if (sender.balance < parsedAmount) throw new Error('Insufficient balance');

    // Perform the transfer
    await UserModel.updateOne(
      { accountNumber: senderAccountNumber },
      { $inc: { balance: -parsedAmount } },
      { session }
    );

    await UserModel.updateOne(
      { accountNumber: recipientAccountNumber },
      { $inc: { balance: parsedAmount } },
      { session }
    );

    await session.commitTransaction();
    res.json({ 
      message: 'Transfer successful',
      senderBalance: sender.balance - parsedAmount
    });

  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
});





app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT} 27-dec`);
});
