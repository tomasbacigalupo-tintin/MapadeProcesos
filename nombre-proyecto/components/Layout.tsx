import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-white p-4">
        <nav className="container mx-auto flex space-x-4">
          <Link href="/" className="hover:underline">Inicio</Link>
          <Link href="/about" className="hover:underline">Acerca</Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-secondary text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Nombre Proyecto
      </footer>
    </div>
  )
}
