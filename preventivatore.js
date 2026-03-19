// Configurazione API Hugging Face (Aggiornata per Stable Diffusion XL)
const API_TOKEN = "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";
const MODEL_URL = "https://router.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

// Riferimenti agli elementi del form esistenti
const form = document.getElementById('preventivatore-form');
const loader = document.getElementById('loader');
const resultContainer = document.getElementById('result-container');
const resultImage = document.getElementById('result-image');

// Funzione principale che comunica con l'IA
async function query(data) {
    const response = await fetch(MODEL_URL, {
        headers: { 
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
    });

    // Gestione dell'avvio del server (errore 503)
    if (response.status === 503) {
        throw new Error("Il server IA si sta avviando... riprova tra circa 20 secondi.");
    }

    if (!response.ok) {
        throw new Error("Si è verificato un errore nella generazione dell'immagine (Stato: " + response.status + ")");
    }

    const result = await response.blob();
    return result;
}

// Gestione dell'invio del form
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Raccogliamo i dati dal form per costruire un prompt dettagliato
    const tipo = document.getElementById('tipo').value;
    const materiale = document.getElementById('materiale').value;
    const colore = document.getElementById('colore').value;
    const dettagli = document.getElementById('dettagli').value;

    // Prompt ottimizzato per la fotografia di interni artigianale
    const textPrompt = `Professional photography, high-end ${tipo} made of ${materiale} in ${colore} color, ${dettagli}, luxury interior setting, studio lighting, highly detailed texture, 4k, cinematic quality.`;

    // Stato di caricamento UI
    const submitBtn = form.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerText = "Generazione in corso...";
    loader.style.display = "block";
    resultContainer.style.display = "none";

    try {
        // Chiamata all'IA tramite Hugging Face
        const blob = await query({ "inputs": textPrompt });
        
        // Converte il blob in un URL per l'immagine
        const imgUrl = URL.createObjectURL(blob);
        
        // Visualizza il risultato
        resultImage.src = imgUrl;
        
        resultImage.onload = () => {
            loader.style.display = "none";
            resultContainer.style.display = "block";
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        };
        
    } catch (error) {
        alert("Errore Hugging Face: " + error.message);
    } finally {
        // Ripristina il pulsante
        submitBtn.disabled = false;
        submitBtn.innerText = "Genera Anteprima Progetto";
        loader.style.display = "none";
    }
});
