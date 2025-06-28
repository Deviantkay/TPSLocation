// File: public/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENT REFERENCES ---
    const locationInput = document.getElementById('location');
    const categorySelect = document.getElementById('category');
    const updateMapBtn = document.getElementById('updateMapBtn');
    const useLocationBtn = document.getElementById('useLocationBtn');
    const mapLoader = document.getElementById('map-loader');
    const mapIframe = document.getElementById('mapIframe');
    const mapPlaceholder = document.getElementById('mapPlaceholder'); // Referensi baru
    const resultsList = document.getElementById('results-list');
    const resultsLoader = document.querySelector('#results-loader');
    const resultsMessage = document.getElementById('results-message');
    const statsNumber = document.getElementById('stats-number');
    const locationForm = document.getElementById('locationForm');
    
    let currentUserPosition = null;

    // --- CORE FUNCTIONS ---

    function setLoadingState(isLoading, isGeoLoading = false) {
        // ... (tidak ada perubahan)
        [updateMapBtn, useLocationBtn].forEach(btn => btn.disabled = isLoading);
        resultsLoader.style.display = isLoading ? 'flex' : 'none';
        mapLoader.style.display = 'flex';

        if (isLoading) {
            resultsList.innerHTML = '';
            statsNumber.textContent = '...';
            resultsMessage.textContent = 'Contacting server...';
            const btn = isGeoLoading ? useLocationBtn : updateMapBtn;
            btn.innerHTML = '<div class="btn-spinner"></div>';
        } else {
            updateMapBtn.innerHTML = `<ion-icon name="search-sharp"></ion-icon> <span>Search</span>`;
            useLocationBtn.innerHTML = `<ion-icon name="location-sharp"></ion-icon> <span>My Location</span>`;
        }
    }

    async function performSearch(isGeoLoading = false, lat = null, lon = null) {
        setLoadingState(true, isGeoLoading);
        
        const query = `${categorySelect.value} in ${locationInput.value}`;
        
        // PERUBAHAN: Panggil updateMap untuk memulai proses loading peta
        updateMap(query);

        let apiUrl = `/api/search?q=${encodeURIComponent(query)}`;
        if (lat && lon) {
            apiUrl += `&ll=@${lat},${lon},12z`;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error((await response.json()).error || 'Server error');
            const data = await response.json();
            
            if (data && data.local_results) {
                displayResults(data.local_results);
            } else {
                resultsMessage.textContent = "No locations listed from Google.";
                statsNumber.textContent = '0';
            }
        } catch (error) {
            console.error("Error fetching from our server:", error);
            resultsMessage.textContent = `Error: ${error.message}`;
        } finally {
            setLoadingState(false, isGeoLoading);
            resultsLoader.style.display = 'none';
        }
    }
    
    // PERUBAHAN: Fungsi baru untuk mengelola pemuatan iframe
    function updateMap(query, lat, lon) {
        // Tampilkan spinner dan sembunyikan iframe (jika sudah terlihat)
        mapLoader.style.display = 'flex';
        mapIframe.style.opacity = '0';

        let url;
        // Gunakan URL yang lebih sederhana untuk embed
        if (lat && lon) {
            url = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;
        } else {
            url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
        }

        // Set 'src' iframe untuk memulai pemuatan di latar belakang
        mapIframe.src = url;
    }

    function displayResults(places) {
        // ... (tidak ada perubahan di sini)
        resultsList.innerHTML = '';
        resultsMessage.textContent = '';
        
        const selectedCategory = categorySelect.value.toLowerCase();
        let filterKeywords = [];
        if (selectedCategory.includes('tps') || selectedCategory.includes('tempat pembuangan sampah')) { filterKeywords = ['tps', 'tempat pembuangan sementara']; }
        else if (selectedCategory.includes('bank sampah')) { filterKeywords = ['bank sampah']; }
        else if (selectedCategory.includes('tpa') || selectedCategory.includes('tempat pembuangan akhir')) { filterKeywords = ['tpa', 'tempat pembuangan akhir']; }

        const filteredPlaces = places.filter(place => {
            const placeTitle = place.title.toLowerCase();
            return filterKeywords.some(keyword => placeTitle.includes(keyword));
        });

        statsNumber.textContent = filteredPlaces.length;
        if (filteredPlaces.length === 0) {
            resultsMessage.textContent = `No specific '${categorySelect.value}' found. Map may show broader results.`;
            return;
        }

        filteredPlaces.forEach(place => {
            const lat = place.gps_coordinates?.latitude;
            const lon = place.gps_coordinates?.longitude;
            if (!lat || !lon) return;

            const li = document.createElement('li');
            li.className = 'p-3 bg-white/50 rounded-lg border border-transparent cursor-pointer';
            li.innerHTML = `...`; // konten li sama
            li.innerHTML = `
                <div class="font-semibold text-blue-800">${place.title}</div>
                <div class="text-xs text-gray-600 mt-1">${place.address || 'No address provided'}</div>
                <button class="get-directions-btn mt-2 text-sm bg-green-500 text-white font-bold py-1 px-3 rounded-md hover:bg-green-600 transition-colors flex items-center gap-1.5">
                    <ion-icon name="navigate-outline"></ion-icon> Get Directions
                </button>
            `;
            resultsList.appendChild(li);

            li.addEventListener('click', (e) => {
                if (!e.target.closest('.get-directions-btn')) {
                    // Panggil fungsi updateMap yang baru
                    updateMap(place.title, lat, lon);
                    highlightListItem(li);
                }
            });
            
            li.querySelector('.get-directions-btn').addEventListener('click', () => {
                const origin = currentUserPosition ? `${currentUserPosition.lat},${currentUserPosition.lng}` : 'My+Location';
                const destination = encodeURIComponent(place.address || `${lat},${lon}`);
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank');
            });
        });
    }

    function highlightListItem(selectedLi) {
        // ... (tidak ada perubahan)
        document.querySelectorAll('#results-list li').forEach(item => item.classList.remove('!bg-blue-200', '!border-blue-400'));
        selectedLi.classList.add('!bg-blue-200', '!border-blue-400');
        if (window.innerWidth >= 1024) {
             selectedLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function handleUseLocation() {
        // ... (tidak ada perubahan)
        if (!navigator.geolocation) return alert("Geolocation not supported.");
        setLoadingState(true, true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentUserPosition = { lat: position.coords.latitude, lng: position.coords.longitude };
                locationInput.value = "Current Location";
                performSearch(true, currentUserPosition.lat, currentUserPosition.lng);
            },
            () => {
                alert("Unable to retrieve location.");
                setLoadingState(false, true);
            }
        );
    }

    // --- INITIALIZATION & EVENT LISTENERS ---

    navigator.geolocation.getCurrentPosition(
        (position) => { currentUserPosition = { lat: position.coords.latitude, lng: position.coords.longitude }; }
    );
    
    locationInput.value = "Pekanbaru";
    performSearch();
    
    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        performSearch(false);
    });

    useLocationBtn.addEventListener('click', handleUseLocation);
    
    // PERUBAHAN: Event listener untuk iframe
    mapIframe.addEventListener('load', () => {
        // Saat iframe selesai dimuat, sembunyikan spinner dan tampilkan iframe
        mapLoader.style.display = 'none';
        mapPlaceholder.style.display = 'none'; // Sembunyikan placeholder juga
        mapIframe.style.opacity = '1';
    });
});