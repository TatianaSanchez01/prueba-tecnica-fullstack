import HomeCard from '@/components/atoms/HomeCard'
// import Private from '@/components/organism/Private'
// import { Enum_RoleName } from '@prisma/client'

const pages = [
  {
    title: 'Sistema de Gestión de Ingresos y Gastos',
    description: 'Panel principal para la gestión de ingresos y egresos.',
    url: '/ingresos-gastos',
    // allowedRoles: [Enum_RoleName.ADMIN, Enum_RoleName.USER],
    icon: 'cash',
  },

  {
    title: 'Gestión de Usuarios',
    description: 'Sección para administrar los usuarios del sistema.',
    url: '/usuarios',
    // allowedRoles: [Enum_RoleName.ADMIN],
    icon: 'users',
  },

  {
    title: 'Reportes',
    description: 'Sección para visualizar reportes y estadísticas.',
    url: '/reportes',
    // allowedRoles: [Enum_RoleName.ADMIN],
    icon: 'chart-bar',
  },
]

export default function Home() {
  return (
    <>
      {pages.map((page) => (
        // <Private allowedRoles={page.allowedRoles} key={page.title}>
          
        // </Private>

        <HomeCard
            title={page.title}
            description={page.description}
            url={page.url}
            icon={page.icon}
          />
      ))}
    </>
  )
}
