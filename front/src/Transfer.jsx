import { useState } from "react";
import axios from "axios";

function Transfer() {
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    try {
      const response = await axios.post("http://localhost:8000/transfer", {
        senderAccountNumber,
        recipientAccountNumber,
        amount: parseFloat(amount)
      });

      setStatus("success");
      setMessage(`Transfer successful! New balance: $${response.data.senderBalance}`);
      // Reset form
      setSenderAccountNumber("");
      setRecipientAccountNumber("");
      setAmount("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Transfer</h2>
        {message && (
          <p className={`mb-4 ${status === "success" ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Sender Account Number</label>
            <input
              type="text"
              value={senderAccountNumber}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setSenderAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Recipient Account Number</label>
            <input
              type="text"
              value={recipientAccountNumber}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setRecipientAccountNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="0"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Transfer;