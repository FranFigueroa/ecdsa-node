const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0439ce88cb52f90ea5a6a9a378223a2704c65c21d83aab0bf928df7cc5d23a955342fb0f8f222bdd917d4bc97217dd061fb42cfad59f36bf7ad3ae426fea92bc70": 100,
  "04ed535507693395f01621cae8b58dee8418b8c7bc01e078b592b6177af6bd228580ff86de38a6bab1de1a4760038a4799b3747465f905121a60c8173b1a03b442": 50,
  "04559533a62699e7d19c6ee96261688656b172184510bf22c6602d6f6d587ce811f52007c33ad41fa505b9a956cf87310b0679920ad422f5755dc0edd8c4c5c812": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
