"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Activity,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsData {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  recentOrders: any[]
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Failed to load analytics data</p>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      color: "blue",
      trend: "+12%",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: ShoppingCart,
      color: "purple",
      trend: "+8%",
    },
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
      trend: "+23%",
    },
    {
      title: "Pending Orders",
      value: data.pendingOrders,
      icon: Activity,
      color: "yellow",
      trend: "-5%",
    },
  ]

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
    green: { bg: "bg-green-500/10", text: "text-green-400" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400" },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const colors = colorClasses[stat.color]
          return (
            <Card key={stat.title} className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"}>
                    {stat.trend}
                  </span>
                  <span className="text-slate-500 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentOrders.length === 0 ? (
              <p className="text-slate-400 text-center py-4">No recent orders</p>
            ) : (
              <div className="space-y-4">
                {data.recentOrders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-white font-medium">{order.title}</p>
                      <p className="text-slate-400 text-sm">{order.user?.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === "DONE" ? "bg-green-500/10 text-green-400" :
                        order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" :
                        "bg-blue-500/10 text-blue-400"
                      }`}>
                        {order.status}
                      </span>
                      <p className="text-slate-400 text-sm mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="/admin/orders" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-white font-medium">View All Orders</p>
                <p className="text-slate-400 text-sm">Manage and update order statuses</p>
              </a>
              <a href="/admin/users" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-white font-medium">Manage Users</p>
                <p className="text-slate-400 text-sm">View and manage user accounts</p>
              </a>
              <a href="/admin/projects" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-white font-medium">Manage Projects</p>
                <p className="text-slate-400 text-sm">Update portfolio projects</p>
              </a>
              <a href="/admin/settings" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <p className="text-white font-medium">System Settings</p>
                <p className="text-slate-400 text-sm">Configure payments, email, and more</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
