import PageHeader from '../components/PageHeader'

export default function NotFoundPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Página no encontrada" />
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">La ruta solicitada no existe. Usa el menú lateral para navegar entre páginas.</p>
      </div>
    </section>
  )
}
