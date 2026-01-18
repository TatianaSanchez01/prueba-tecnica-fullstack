import React from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'
import { ChartData } from '@/lib/reports/chart-data.interface'

interface ReportChartProps {
  chartData: ChartData[]
}

type GroupedData = {
  month: string
  ingresos: number
  gastos: number
}

function ReportChart({ chartData }: ReportChartProps) {
  // Agrupar las transacciones por mes
  const groupedData = chartData.reduce<GroupedData[]>((acc, item) => {
    // Extraemos el año y el mes de la fecha
    const [day, month, year] = item.date.split('/')
    const monthYear = `${year}-${month}` // Formato 'YYYY-MM'

    // Verificamos si ya existe un grupo para ese mes
    const existing = acc.find((entry) => entry.month === monthYear)

    if (existing) {
      // Si es un ingreso (positivo), lo sumamos a ingresos
      if (item.amount > 0) {
        existing.ingresos = (existing.ingresos || 0) + item.amount
      } else {
        // Si es un gasto (negativo), lo sumamos a gastos (como valor absoluto)
        existing.gastos = (existing.gastos || 0) + Math.abs(item.amount)
      }
    } else {
      // Si no existe un grupo para ese mes, lo creamos
      acc.push({
        month: monthYear, // 'YYYY-MM'
        ingresos: item.amount > 0 ? item.amount : 0,
        gastos: item.amount < 0 ? Math.abs(item.amount) : 0,
      })
    }

    return acc
  }, [])

  // Ordenamos los datos por mes (YYYY-MM)
  groupedData.sort((a, b) => {
    return a.month > b.month ? 1 : -1
  })

  const chartConfig = {
    ingresos: {
      label: 'Ingresos',
      color: '#1e3a8a', // Blue 800
    },
    gastos: {
      label: 'Gastos',
      color: '#e11d48', // Red 600
    },
  } satisfies ChartConfig

  return (
    <ChartContainer className="min-h-[300px] w-full" config={chartConfig}>
      <BarChart data={groupedData} accessibilityLayer>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => {
            const [year, month] = value.split('-')
            return `${month}/${year}`
          }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="ingresos" fill={chartConfig.ingresos.color} radius={10} />
        <Bar dataKey="gastos" fill={chartConfig.gastos.color} radius={10} />
      </BarChart>
    </ChartContainer>
  )
}

export default ReportChart
