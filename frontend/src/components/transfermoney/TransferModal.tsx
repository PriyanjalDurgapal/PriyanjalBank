// import { useEffect, useState } from "react";


// const submitPayment = async () => {
// const res = await fetch("/api/transfer/bank", {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({ fromAccount, toAccount, amount, pin })
// });


// if (res.ok) setStep(4);
// else alert("Transaction Failed");
// };


// return (
// <Modal onClose={onClose}>
// {step === 1 && (
// <>
// <h2 className="modal-title">Bank Transfer</h2>
// <select className="input" onChange={e => setFromAccount(e.target.value)}>
// <option>Select Account</option>
// {accounts.map(a => (
// <option key={a.accountNumber} value={a.accountNumber}>
// {a.accountNumber} - ₹{a.balance}
// </option>
// ))}
// </select>
// <input className="input" placeholder="Receiver Account" onChange={e => setToAccount(e.target.value)} />
// <input className="input" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
// <button className="btn-primary" onClick={verifyReceiver}>Verify</button>
// </>
// )}


// {step === 2 && (
// <>
// <p>Receiver: <b>{receiver.name}</b></p>
// <p>Account: {receiver.accountNumber}</p>
// <button className="btn-primary" onClick={() => setStep(3)}>Proceed</button>
// </>
// )}


// {step === 3 && (
// <>
// <input type="password" className="input" placeholder="Enter PIN" onChange={e => setPin(e.target.value)} />
// <button className="btn-primary" onClick={submitPayment}>Pay</button>
// </>
// )}


// {step === 4 && (
// <div className="text-center">
// <h2 className="text-green-400 text-xl">Transaction Successful 🎉</h2>
// <button className="btn-primary mt-4" onClick={onClose}>Close</button>
// </div>
// )}
// </Modal>
// );
// }