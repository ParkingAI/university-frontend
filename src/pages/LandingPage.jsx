import React from 'react'

const LandingPage = () => {
  return (
   <div className="font-sans text-slate-900 overflow-hidden">

      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-500 px-6">

        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Pametno parkiranje u stvarnom vremenu
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10">
            Razvijamo sustav koji pomoću kamera prepoznaje slobodna
            parkirna mjesta i prikazuje ih vozačima u realnom vremenu.
          </p>

          <button className="bg-white text-blue-600 font-semibold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition">
            Pogledaj situaciju u gradu
          </button>
        </div>
      </section>

      <section className="py-28 px-6 bg-sky-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O projektu
          </h2>

          <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto text-lg">
            Radimo na inteligentnom sustavu za nadzor parkirališta koji
            koristi računalni vid i kamere za analizu zauzetosti u stvarnom
            vremenu. Naš cilj je smanjiti prometne gužve i stres prilikom
            parkiranja u gradovima.
          </p>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Kako funkcionira sustav?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
              <h3 className="font-semibold text-xl mb-4">📷 Kamere</h3>
              <p className="text-slate-600">
                Visokorezolucijske kamere prate parkirna mjesta
                i šalju video podatke u sustav.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
              <h3 className="font-semibold text-xl mb-4">🧠 AI analiza</h3>
              <p className="text-slate-600">
                Algoritmi računalnog vida obrađuju snimke
                i prepoznaju slobodna mjesta.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition">
              <h3 className="font-semibold text-xl mb-4">📱 Prikaz korisnicima</h3>
              <p className="text-slate-600">
                Rezultati se prikazuju u aplikaciji ili web platformi
                u realnom vremenu.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Zašto koristiti naš sustav?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            <div className="bg-white/15 backdrop-blur-md p-8 rounded-3xl">
              <h3 className="font-semibold text-xl mb-3">⚡ Brže parkiranje</h3>
              <p className="text-white/90">
                Pronađite slobodno mjesto bez nepotrebnog kruženja.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-8 rounded-3xl">
              <h3 className="font-semibold text-xl mb-3">🌍 Ekološki učinak</h3>
              <p className="text-white/90">
                Manje ispušnih plinova i zagušenja u centru grada.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-8 rounded-3xl">
              <h3 className="font-semibold text-xl mb-3">🏙 Pametni gradovi</h3>
              <p className="text-white/90">
                Infrastruktura prilagođena modernom urbanom životu.
              </p>
            </div>

          </div>
        </div>
      </section>

    <footer className="py-12 bg-slate-950 text-white/70">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

    <span>
      © {new Date().getFullYear()} Smart Parking Vision — sva prava pridržana.
    </span>

    <a
      href="/login"
      className="text-sky-400 hover:text-white transition text-sm font-medium"
    >
      Login za operatere
    </a>

  </div>
</footer>
    </div>
  )
}

export default LandingPage