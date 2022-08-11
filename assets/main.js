

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCCWFJBwCqkckNk9imYHDHnQ&part=snippet%2Cid&order=date&maxResults=9';

// se usa esta estructura para evaluar que sea igual a null o a la siguiente expresion
const content = null || document.querySelector('#content');
// console.log({content});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b04e9c1af9msh417031e177378dcp1cae52jsna04699d00524',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
// esta funcion se llama así misma cuando se inicia la aplicación
(async () => {
    try {
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,4).join('')}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
        // mostrar un mensaje al usuario como RETO
    }
})();