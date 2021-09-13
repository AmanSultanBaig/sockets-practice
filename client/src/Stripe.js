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
        axios.get('http:localhost:8000/payment', body).then(result => {
            alert(result.data)
        }).catch(e => alert(e.response.data.message))
    }

    return (
        <div>
            <StripeCheckout
                stripeKey={process.env.REACT_APP_PUBLIC_KEY}
                name={stuff.name}
                token={makePayment}
                amount={stuff.price * 100}>
                <button onClick={() => console.log("something.")} style={{ cursor: 'pointer', background: 'transprant', padding: '1rem', border: 'none' }}>Get Preimum Plan</button>
            </StripeCheckout>
        </div>
    )
}

export default Stripe