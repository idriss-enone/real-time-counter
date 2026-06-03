const textInput = document.getElementById("text-input");
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.documentElement;


function getPostStats(text, wordsPerMinute=255){
    // 1. Calcul des caractères
    const charCount = text.length;
    // 2. Calcul des mots 
    //La regex /\s+/ détecte un ou plusieurs espaces,tabulation ou retours à la ligne.
    //Cela évite de compter les espaces doubles ou les sauts de page comme des mots.
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;
    // Calcul du temps de lecture
    //INFO : Un adulte lit en moyenne entre 200 et 255 mots par minute.
    // Math.ceil() arrondit à l'entier supérieur pour ne jamais afficher "0 min" dès qu'un mot est écrit.
    const minutes = wordCount > 0 ? Math.ceil(wordCount / wordsPerMinute): 0;


    return {charCount,wordCount,minutes}
}

    
function updateReadingStats(containerSelector,text, wordsPerMinute=255){
    const container = document.querySelector(containerSelector);
    const {charCount,wordCount,minutes} = getPostStats(text,wordsPerMinute);

    container.innerHTML = `
        <p>Caractères: <span id="char-count">${charCount}</span></p>
        <p>Mots: <span id="word-count">${wordCount}</span></p>
        ${wordCount > 0 ? `<p>Temps de lecture: <span id="read-time">${minutes} min</span></p>` : '' } 
    `

}


textInput.addEventListener("input",() =>{
    const text = textInput.value;
    updateReadingStats(".stats",text);
})


function initTheme(){
    const savedTheme = localStorage.getItem('theme');
    // Si user a déjà choisi -> on prend son choix
    if(savedTheme){
        html.setAttribute('data-theme', savedTheme);
        return;
    }
    
    //Sinon on regarde le navigateur/OS
    applyTheme( prefersDark.matches ? "dark" : "light");
}

function applyTheme(theme){
    html.setAttribute("data-theme",theme);
    //Met à jour l'aria-label pour l'a11y
    const label = theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre';
    themeToggle.setAttribute('aria-label',label);
}

themeToggle.addEventListener("click", () => {
   
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme',newTheme);
    
})

// Se déclenche quand l'utilisateur change de thème système 
prefersDark.addEventListener("change", (e) => {

    //On applique SEULEMENT si l'user  n'a pas forcé un theme
    if(!localStorage.getItem("theme")){
        applyTheme(e.matches ? 'dark':'light'); // true si user definie son OS/navigateur en dark
    }

});

document.addEventListener("DOMContentLoaded",() =>{
    initTheme()
    updateReadingStats(".stats","");
})