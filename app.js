
    
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMK_0Wp87yqviKemYiN3KHpc2Nic1yZWs",
  authDomain: "playlist-f836a.firebaseapp.com",
  projectId: "playlist-f836a",
  storageBucket: "playlist-f836a.firebasestorage.app",
  messagingSenderId: "301875991366",
  appId: "1:301875991366:web:ee46defa63138576120b47",
  measurementId: "G-W9SM4SD0P7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementos del DOM
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const toggleLogin = document.getElementById("toggle-login");
const message = document.getElementById("message");
const formTitle = document.getElementById("form-title");

// URL de redirección tras inicio de sesión exitoso
const redirectUrl = "https://litmatchnudes.netlify.app";

// Cambiar entre formularios
toggleLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (registerForm.style.display === "block") {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    formTitle.textContent = "Iniciar Sesión";
    toggleLogin.textContent = "¿No tienes cuenta? Regístrate aquí";
  } else {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    formTitle.textContent = "Registro";
    toggleLogin.textContent = "¿Ya tienes cuenta? Inicia sesión aquí";
  }
});

// Registro de usuarios
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      message.innerText = "Registro exitoso. Ahora inicia sesión.";
      registerForm.style.display = "none";
      loginForm.style.display = "block";
      formTitle.textContent = "Iniciar Sesión";
    })
    .catch((error) => {
      message.innerText = `Error: ${error.message}`;
    });
});

// Inicio de sesión
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      message.innerText = "Inicio de sesión exitoso. Redirigiendo...";
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    })
    .catch((error) => {
      message.innerText = `Error: ${error.message}`;
    });
});