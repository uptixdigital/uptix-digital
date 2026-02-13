import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import crypto from "crypto"

// Binance Pay API Configuration
const BINANCE_PAY_API_KEY = process.env.BINANCE_PAY_API_KEY
const BINANCE_PAY_SECRET_KEY = process.env.BINANCE_PAY_SECRET_KEY
const BINANCE_PAY_BASE_URL = "https://bpay.binanceapi.com"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { orderId, amount, method } = body

    if (!orderId || !amount || !method) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: parseFloat(amount),
        method: method.toUpperCase(),
        status: "PENDING",
      },
    })

    let paymentData

    // Handle different payment methods
    switch (method.toUpperCase()) {
      case "BINANCE_PAY":
        paymentData = await createBinancePayPayment(payment.id, amount)
        break
      case "STRIPE":
        paymentData = await createStripePayment(payment.id, amount)
        break
      case "PAYPAL":
        paymentData = await createPayPalPayment(payment.id, amount)
        break
      default:
        return NextResponse.json(
          { message: "Unsupported payment method" },
          { status: 400 }
        )
    }

    return NextResponse.json({
      payment,
      paymentData,
    })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json(
      { message: "Failed to create payment" },
      { status: 500 }
    )
  }
}

// Binance Pay Integration
async function createBinancePayPayment(paymentId: string, amount: number) {
  if (!BINANCE_PAY_API_KEY || !BINANCE_PAY_SECRET_KEY) {
    throw new Error("Binance Pay credentials not configured")
  }

  const timestamp = Date.now()
  const nonce = crypto.randomUUID()
  
  const body = {
    env: {
      terminalType: "WEB",
    },
    merchantTradeNo: paymentId,
    orderAmount: amount,
    currency: "USDT",
    goods: {
      goodsType: "01",
      goodsCategory: "D000",
      referenceGoodsId: paymentId,
      goodsName: `Uptix Digital Service - ${paymentId}`,
      goodsDetail: "Digital services payment",
    },
  }

  const payload = JSON.stringify(body)
  const signature = generateBinanceSignature(timestamp, nonce, payload)

  try {
    const response = await fetch(`${BINANCE_PAY_BASE_URL}/binancepay/openapi/v3/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp.toString(),
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": BINANCE_PAY_API_KEY,
        "BinancePay-Signature": signature,
      },
      body: payload,
    })

    const data = await response.json()

    if (data.status === "SUCCESS") {
      // Update payment with transaction ID
      await prisma.payment.update({
        where: { id: paymentId },
        data: { txnId: data.data.prepayId },
      })

      return {
        prepayId: data.data.prepayId,
        checkoutUrl: data.data.checkoutUrl,
        expireTime: data.data.expireTime,
      }
    } else {
      throw new Error(data.errorMessage || "Binance Pay error")
    }
  } catch (error) {
    console.error("Binance Pay error:", error)
    throw error
  }
}

function generateBinanceSignature(timestamp: number, nonce: string, payload: string) {
  const dataToSign = `${timestamp}\n${nonce}\n${payload}\n`
  return crypto
    .createHmac("sha512", BINANCE_PAY_SECRET_KEY!)
    .update(dataToSign)
    .digest("hex")
    .toUpperCase()
}

// Stripe Integration (Placeholder)
async function createStripePayment(paymentId: string, amount: number) {
  // This is a placeholder implementation
  // In production, use Stripe Node.js library
  return {
    clientSecret: "pi_placeholder_secret",
    paymentIntentId: `pi_${paymentId}`,
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  }
}

// PayPal Integration (Placeholder)
async function createPayPalPayment(paymentId: string, amount: number) {
  // This is a placeholder implementation
  // In production, use PayPal SDK
  return {
    orderId: `ORDER-${paymentId}`,
    approvalUrl: "https://www.paypal.com/checkout",
  }
}

// Webhook handler for payment status updates
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { paymentId, status, txnId } = body

    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: status.toUpperCase(),
        ...(txnId && { txnId }),
      },
    })

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error updating payment:", error)
    return NextResponse.json(
      { message: "Failed to update payment" },
      { status: 500 }
    )
  }
}
