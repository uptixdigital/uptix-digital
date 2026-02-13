import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendEmail, generateOrderConfirmationEmail, generateNewOrderNotificationEmail } from "@/lib/email"
import { NextResponse } from "next/server"

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
    const { serviceType, title, description, budget, timeline } = body

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        serviceType,
        title,
        description,
        budget: budget ? parseFloat(budget) : null,
        timeline,
        status: "PENDING",
        files: [],
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    // Send confirmation email to client
    if (order.user.email) {
      await sendEmail({
        to: order.user.email,
        subject: `Order Confirmation - ${order.title}`,
        html: generateOrderConfirmationEmail({
          orderId: order.id,
          title: order.title,
          amount: order.budget || 0,
          clientName: order.user.name || "Valued Client",
        }),
      })
    }

    // Send notification to admin
    await sendEmail({
      to: "admin@uptixdigital.com",
      subject: `New Order: ${order.title}`,
      html: generateNewOrderNotificationEmail({
        orderId: order.id,
        title: order.title,
        clientName: order.user.name || "Anonymous",
        clientEmail: order.user.email || "",
        amount: order.budget || undefined,
      }),
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    )
  }
}
