export default function Register() {
  return (
    <div className="min-h-screen bg-caribe-gradient flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6 text-2xl font-bold text-gray-800">
          <div className="w-10 h-10 bg-caribe-gradient rounded-xl flex items-center justify-center text-white">
            🌴
          </div>
          Caribe LinkUp
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h1>
        <p className="text-gray-600 mb-6">Rejoignez notre communauté caribéenne</p>

        {/* Sélecteur de rôle */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 rounded-xl p-1">
          <button className="bg-caribe-gradient text-white py-3 rounded-lg font-semibold">
            💻 Freelance
          </button>
          <button className="text-gray-500 py-3 rounded-lg font-semibold hover:bg-gray-100">
            👔 Client
          </button>
        </div>
        
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Nom complet" 
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button className="w-full bg-caribe-gradient text-white py-3 rounded-lg font-semibold">
            Créer mon compte
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Déjà un compte ? <a href="/auth/login" className="text-caribe-green font-semibold">Se connecter</a>
        </p>
      </div>
    </div>
  );
}