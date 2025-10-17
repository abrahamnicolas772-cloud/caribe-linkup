import jwt from 'jsonwebtoken';
import User from '../models/user/User.js';
import Freelance from '../models/freelance/Freelance.js';

// Générer le token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Inscription utilisateur
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  console.log('🚀 REGISTER - Début de la fonction');
  console.log('📦 Données reçues:', req.body);
  
  try {
    const { email, password, role, firstName, lastName, country } = req.body;

    console.log('🔍 Vérification de l\'existence de l\'utilisateur:', email);
    
    // Vérifier si l'utilisateur existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('❌ Utilisateur existe déjà');
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    console.log('👤 Création de l\'utilisateur...');
    
    // Créer l'utilisateur
    const user = await User.create({
      email,
      password,
      role
    });

    console.log('✅ Utilisateur créé:', user._id);

    // Si c'est un freelance, créer le profil freelance
    if (role === 'freelance') {
      console.log('💼 Création du profil freelance...');
      await Freelance.create({
        user: user._id,
        personalInfo: {
          firstName,
          lastName,
          country
        }
      });
      console.log('✅ Profil freelance créé');
    }

    // Générer le token
    const token = generateToken(user._id);
    console.log('🔐 Token généré');

    console.log('🎉 Inscription réussie pour:', email);
    
    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('💥 ERREUR dans register:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du compte',
      error: error.message
    });
  }
};

// @desc    Connexion utilisateur
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  console.log('🚀 LOGIN - Début de la fonction');
  console.log('📦 Données reçues:', req.body);
  
  try {
    const { email, password } = req.body;

    console.log('🔍 Recherche de l\'utilisateur:', email);
    
    // Vérifier l'email et le mot de passe
    const user = await User.findOne({ email });
    
    if (user && (await user.comparePassword(password))) {
      console.log('✅ Mot de passe correct');
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Connexion réussie',
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          profileCompleted: user.profileCompleted
        }
      });
    } else {
      console.log('❌ Email ou mot de passe incorrect');
      res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }
  } catch (error) {
    console.error('💥 ERREUR dans login:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

// @desc    Obtenir l'utilisateur connecté
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    let profile = null;
    if (user.role === 'freelance') {
      profile = await Freelance.findOne({ user: user._id });
    }

    res.json({
      success: true,
      user: {
        ...user.toObject(),
        profile
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};