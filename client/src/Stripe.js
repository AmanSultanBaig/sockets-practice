import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function Stripe() {
    const [stuff, setstuff] = useState({
        name: "Aman Sultan Baig",
        price: 100,
    })

    const makePayment = token => {
        const body = { token, stuff }
        axios.post('http://localhost:8000/payment', body).then(result => {
            alert(result.data.message)
        }).catch(e => console.log("error ", e))
    }

    return (
        <div>
            <StripeCheckout
                stripeKey={process.env.REACT_APP_PUBLIC_KEY}
                name="Chat Premium Package"
                token={makePayment}
                amount={stuff.price * 100}>
                <button onClick={() => console.log("something.")} style={{ cursor: 'pointer', background: 'transprant', padding: '1rem', border: 'none' }}>Get Preimum Plan</button>
            </StripeCheckout>
        </div>
    )
}

export default Stripe