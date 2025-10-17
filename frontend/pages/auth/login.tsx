"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("Haiti");
  const [rememberMe, setRememberMe] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"freelance" | "client">("freelance");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🔄 Début de la soumission - Mode:', mode);
    
    try {
      const userData = mode === "login" 
        ? { email, password }
        : { 
            email, 
            password, 
            role, 
            firstName, 
            lastName, 
            country 
          };

      console.log('📤 Données envoyées:', userData);
      console.log('🔗 URL:', `http://localhost:5000/api/auth/${mode}`);

      const response = await fetch(`http://localhost:5000/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📥 Statut HTTP:', response.status);
      
      // Vérifier si la réponse est OK avant de parser le JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Réponse non-OK:', errorText);
        throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 Données reçues:', data);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        console.log('🔐 Token sauvegardé:', data.token);
        alert(`✅ ${mode === "login" ? "Connexion" : "Inscription"} réussie !`);
        router.push('/dashboard');
      } else {
        console.log('❌ Erreur métier:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('💥 Erreur complète:', error);
      alert('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`🔐 Connexion avec ${provider} en tant que ${role}`);
  };

  return (
    <div className="min-h-screen bg-caribe-gradient flex items-center justify-center p-5">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-96`}>
        
        {/* Left Side - Form */}
        <div className={`flex-1 p-8 ${isMobile ? 'order-2' : 'order-1'} flex flex-col justify-center`}>
          
          {/* Logo */}
          <div className={`flex items-center gap-3 mb-6 text-2xl font-bold text-gray-800 ${isMobile ? 'justify-center' : 'justify-start'}`}>
            <div className="w-10 h-10 bg-caribe-gradient rounded-xl flex items-center justify-center text-white text-lg">
              🌴
            </div>
            Caribe LinkUp
          </div>

          {/* Title */}
          <h1 className={`text-2xl font-bold text-gray-900 mb-2 ${isMobile ? 'text-center' : 'text-left'}`}>
            {mode === "login" ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </h1>

          <p className={`text-gray-600 mb-6 ${isMobile ? 'text-center' : 'text-left'}`}>
            {mode === "login" 
              ? "Accédez à votre espace de travail" 
              : "Rejoignez notre communauté caribéenne"
            }
          </p>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setRole("freelance")}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                role === "freelance" 
                  ? "bg-caribe-gradient text-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              💻 Freelance
            </button>
            <button
              onClick={() => setRole("client")}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                role === "client" 
                  ? "bg-caribe-gradient text-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              👔 Client
            </button>
          </div>

          {/* Social Login */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 mb-6`}>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="flex-1 flex items-center justify-center gap-3 py-3 px-6 border-2 border-gray-200 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              📘 Facebook
            </button>
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex-1 flex items-center justify-center gap-3 py-3 px-6 border-2 border-gray-200 rounded-xl bg-white text-red-600 font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
            >
              🔍 Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6 text-gray-500">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-caribe-green outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom"
                    required
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-caribe-green outline-none transition-colors"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-caribe-green outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                required
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-caribe-green outline-none transition-colors"
              />
            </div>

            {mode === "login" && (
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between items-center text-sm`}>
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-caribe-green"
                  />
                  Se souvenir de moi
                </label>
                <a href="#" className="text-caribe-green font-semibold hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-caribe-gradient text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Chargement...' : mode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          {/* Switch Mode - CORRIGÉ */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              {mode === "login" ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}{" "}
              <a
                href={mode === "login" ? "/auth/register" : "/auth/login"}
                onClick={(e) => {
                  e.preventDefault();
                  setMode(mode === "login" ? "register" : "login");
                  // Reset form when switching modes
                  if (mode === "register") {
                    setFirstName("");
                    setLastName("");
                  }
                }}
                className="text-caribe-green font-semibold hover:underline"
              >
                {mode === "login" ? "Créer un compte" : "Se connecter"}
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Illustration (Hidden on Mobile) */}
        {!isMobile && (
          <div className="flex-1 bg-caribe-gradient text-white p-8 flex flex-col justify-center relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-5">
                {mode === "login" 
                  ? "Bienvenue sur Caribe LinkUp" 
                  : "Rejoignez l'écosystème caribéen"
                }
              </h2>
              
              <p className="text-lg mb-6 opacity-90">
                {mode === "login"
                  ? "Connectez-vous pour découvrir des opportunités uniques et collaborer avec les meilleurs talents de la Caraïbe."
                  : "Inscrivez-vous pour accéder à un réseau de professionnels caribéens et développer votre activité."
                }
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Réseau de professionnels caribéens",
                  "Opportunités locales et internationales", 
                  "Collaboration sans frontières",
                  "Croissance professionnelle garantie"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-6 border-t border-white border-opacity-20">
                {[
                  { number: "500+", label: "Talents" },
                  { number: "200+", label: "Projets" },
                  { number: "95%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}