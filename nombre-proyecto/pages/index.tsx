import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-2xl font-bold">Bienvenido a Nombre Proyecto</h1>
      <p className="mt-4">Esta es la página inicial.</p>
    </motion.div>
  )
}
