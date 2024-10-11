'use client'

import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./page.module.css";
import Transaction from "./types/Transaction";

const apiTransactions: Transaction[] = [
  {
    transactionID: 1,
    createdAt: new Date(),
    description: "First one",
    amount: 1.00
  },
  {
    transactionID: 2,
    createdAt: new Date(),
    description: "Second one",
    amount: 1237232772.00
  },
  {
    transactionID: 1,
    createdAt: new Date(),
    description: "Third one",
    amount: 2397823.00
  }
]

const apiCall = async function apiCall(fail: boolean) {
  if (fail) throw new Error("Unexpected error!")
  return apiTransactions;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState<string | null>(null)

  const intervalHandler = () => {
    fetch("").then(() => {
      return apiCall(!!error)
    }).then(data => {
      setTransactions(data)
      setError(null)
    }).catch(data => {
      setError(data.toString())
    })
  }

  useLayoutEffect(() => {
    setInterval(intervalHandler, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.page}>
      {error ? (
        <h4>{error}</h4>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">Created at</th>
              <th scope="col">Description</th>
              <th scope="col">Amount (in USD)</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(tnx => {
              return <tr key={tnx.transactionID}>
                <td>{tnx.transactionID}</td>
                <td>{tnx.createdAt.toISOString()}</td>
                <td>{tnx.description}</td>
                <td>{tnx.amount}</td>
              </tr>
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
