import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const orderId = searchParams.get("orderId")
    const isGeneral = searchParams.get("isGeneral")

    let messages

    if (orderId) {
      messages = await prisma.message.findMany({
        where: { orderId },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: "asc" },
      })
    } else if (isGeneral === "true") {
      messages = await prisma.message.findMany({
        where: { isGeneral: true },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: "asc" },
        take: 100,
      })
    } else {
      const userOrders = await prisma.order.findMany({
        where: { userId: session.user.id as string },
        select: { id: true },
      })

      const orderIds = userOrders.map((order) => order.id)

      messages = await prisma.message.findMany({
        where: {
          OR: [
            { orderId: { in: orderIds } },
            { isGeneral: true },
          ],
        },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    }

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { message: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { content, orderId, isGeneral } = body

    if (!content) {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      )
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId: session.user.id as string,
        orderId: orderId || null,
        isGeneral: isGeneral || false,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json(
      { message: "Failed to create message" },
      { status: 500 }
    )
  }
}
