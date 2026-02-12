import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get total counts
    const totalUsers = await prisma.user.count()
    const totalOrders = await prisma.order.count()
    const pendingOrders = await prisma.order.count({
      where: {
        status: "PENDING"
      }
    })
    
    // Get total revenue from completed payments
    const payments = await prisma.payment.findMany({
      where: {
        status: "COMPLETED"
      }
    })
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0)

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json(
      { message: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
