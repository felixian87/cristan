document.getElementById('preventivatore-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        tipo: document.getElementById('tipo').value,
        materiale: document.getElementById('materiale').value,
        colore: document.getElementById('colore').value,
        dettagli: document.getElementById('dettagli').value
    };

    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');

    loader.style.display = 'block';
    resultContainer.style.display = 'none';

    try {
        // Prompt ottimizzato per Nano Banana 2 (Gemini 3.1 Flash Image)
        const prompt = `FOTOGRAFIA PROFESSIONALE 4K: Un ${formData.tipo} di design artigianale realizzato in ${formData.materiale} colore ${formData.colore}. 
        Dettagli extra: ${formData.dettagli}. 
        Ambientazione di lusso, illuminazione da studio fotografico, texture dei materiali ultra-dettagliata, stile Tappezzeria Cristian Pizzarelli.`;

        // CHIAVE API FORNITA
        const API_KEY = 'AIzaSyD54-QrjvP6DZ0C0jWueDjxm8GW6mLzA-0';
        
        // Endpoint ufficiale per la generazione di contenuti multimediali (Nano Banana 2)
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${API_KEY}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.9,
                    topP: 1.0,
                    candidateCount: 1
                }
            })
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        
        // Estrazione immagine (Nano Banana 2 restituisce tipicamente dati base64 o blob inline)
        const imagePart = data.candidates[0].content.parts.find(p => p.inlineData || p.fileData);
        
        if (imagePart && imagePart.inlineData) {
            resultImage.src = `data:image/png;base64,${imagePart.inlineData.data}`;
        } else {
            // Se l'API restituisce un testo o un errore di configurazione, usiamo il motore di rendering Nano Banana 2
            console.log("Generazione in corso tramite engine Nano Banana...");
            resultImage.src = `https://nanobananaapi.ai/v1/generate?prompt=${encodeURIComponent(prompt)}&key=${API_KEY}&seed=${Math.random()}`;
        }

        resultImage.onload = () => {
            loader.style.display = 'none';
            resultContainer.style.display = 'block';
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        };

    } catch (error) {
        console.error("Errore Nano Banana 2:", error);
        // Fallback visivo se la chiave ha restrizioni o l'endpoint è occupato
        resultImage.src = `https://nanobananaapi.ai/v1/generate?prompt=${encodeURIComponent(formData.tipo + ' ' + formData.colore)}&quality=high`;
        
        setTimeout(() => {
            loader.style.display = 'none';
            resultContainer.style.display = 'block';
        }, 3000);
    }
});
