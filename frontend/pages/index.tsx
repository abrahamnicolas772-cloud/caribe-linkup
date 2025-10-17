export default function Home() {
  return (
    <div className="min-h-screen bg-caribe-gradient flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">🌴 Caribe LinkUp</h1>
        <p className="text-xl mb-8">Plateforme des talents numériques caribéens</p>
        <div className="space-x-4">
          <a href="/auth/login" className="bg-white text-caribe-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Se connecter
          </a>
          <a href="/auth/register" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-caribe-green transition">
            S'inscrire
          </a>
        </div>
      </div>
    </div>
  )
}