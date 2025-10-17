export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-caribe-gradient rounded-lg flex items-center justify-center text-white">
                🌴
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
              }}
              className="bg-caribe-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🎉 Bienvenue sur Caribe LinkUp !</h2>
          <p className="text-gray-600">Votre tableau de bord est en cours de développement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-2">📊 Statistiques</h3>
            <p className="text-gray-600">Bientôt disponible</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-2">💼 Missions</h3>
            <p className="text-gray-600">Bientôt disponible</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-2">👤 Profil</h3>
            <p className="text-gray-600">Bientôt disponible</p>
          </div>
        </div>
      </main>
    </div>
  );
}