import Header from "@/components/header"
import Hero from "@/components/hero"
import CategoryCards from "@/components/category-cards"
import Footer from "@/components/footer"
import CategoryFilter from "@/components/category-filter"
import DepartamentosGrid from "@/components/departamentos-grid"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoryCards />
      <DepartamentosGrid />
      <CategoryFilter category="Viajeras" />
      <Footer />
    </main>
  )
}
