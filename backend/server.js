const express=require('express');
const app=express();
const stripe=require('stripe')('sk_test_51Mf6UZSBMrqQsHDA3Bl4aOtA9CGivbETjGPww5FrjwYVYCEIpT3AQpeEJICvAS6xTsxqW0DBtg28ueThr5DBWMIC00ocF86Hh9');


app.use(express.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    res.header("Access-Control-Request-Headers","*")

    next()
})

app.get("/secret/:amt",async(req,res)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        currency:'inr',
        amount:req.params.amt*100,
        automatic_payment_methods:{enabled:true}
    })

    const intent=paymentIntent;
    res.status(200).send({client_secret:intent.client_secret})
})

app.listen(8080,()=>{
    console.log("server is running");
})