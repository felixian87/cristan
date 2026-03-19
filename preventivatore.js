document.getElementById('preventivatore-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    // 1. Raccolta dati per Nano Banana 2
    const formData = {
        tipo: document.getElementById('tipo').value,
        materiale: document.getElementById('materiale').value,
        colore: document.getElementById('colore').value,
        dettagli: document.getElementById('dettagli').value,
        timestamp: new Date().toISOString()
    };

    // UI Feedback
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');

    loader.style.display = 'block';
    resultContainer.style.display = 'none';

    try {
        // 2. Simulazione invio e attesa elaborazione Nano Banana 2
        await new Promise(resolve => setTimeout(resolve, 2500));

        // 3. Selezione immagine basata sulla scelta
        let themedImageUrl = '';
        if (formData.tipo === 'divano') themedImageUrl = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc';
        else if (formData.tipo === 'interno_auto') themedImageUrl = 'https://images.unsplash.com/photo-1541899481282-d53bffe3c15d';
        else if (formData.tipo === 'testata_letto') themedImageUrl = 'https://images.unsplash.com/photo-1505693357370-58c35c2b6910';
        else themedImageUrl = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38';

        // Mostriamo solo il risultato visivo
        resultImage.src = themedImageUrl + `?auto=format&fit=crop&q=80&w=1200&ts=${Date.now()}`;
        
        loader.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Scroll al risultato
        resultContainer.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        alert("Si è verificato un errore durante la generazione dell'immagine. Riprova.");
        loader.style.display = 'none';
    }
});
