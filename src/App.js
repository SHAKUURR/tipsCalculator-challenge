import "./styles.css";
import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState();
  const [service, setService] = useState("dissatified");
  const [friendService, setFriendService] = useState("dissatified");

  function handleServiceInput(e) {
    setService(e.target.value);
  }

  function handleFriend(e) {
    setFriendService(e.target.value);
  }

  function handleBillInput(e) {
    setAmount(Number(e.target.value));
  }
  return (
    <div className="App">
      <BillInput amount={amount} onBillInput={handleBillInput} />
      <TipInput service={service} onServiceInput={handleServiceInput}>
        How do you like the service?
      </TipInput>
      <TipInput friendService={friendService} onfriend={handleFriend}>
        How did your friend like the service
      </TipInput>
      <Amount amount={amount} service={service} friendService={friendService} />
    </div>
  );
}

function BillInput({ amount, onBillInput }) {
  return (
    <div>
      <p>How much was the bill?</p>
      <input type="number" value={amount} onChange={onBillInput} />
    </div>
  );
}

function TipInput({
  children,
  service,
  onServiceInput,
  friendService,
  onfriend
}) {
  return (
    <div>
      <p>{children}</p>
      <select
        value={service || friendService}
        onChange={onServiceInput || onfriend}
      >
        <option value="dissatified">Dissatified (0%)</option>
        <option value="okay">It was Okay (5%)</option>
        <option value="good">It was good (10%)</option>
        <option value="amazing">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function Amount({ amount, service, friendService }) {
  const tipPercentages = {
    dissatified: 0,
    okay: 5,
    good: 10,
    amazing: 20
  };
  const tips =
    Math.round(tipPercentages[service] + tipPercentages[friendService]) / 2;
  if (!amount) return;
  return (
    <div>
      <p>
        You pay ${amount + tips} (${amount} + ${tips})
      </p>
    </div>
  );
}
