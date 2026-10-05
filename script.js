        // INICJALIZACJA EMAILJS
        (function() {
            emailjs.init("Zdb3EviGAr7ZNTaeA");
        })();

        // DEKLARACJA STANU ZMIENNYCH
        const todayDate = new Date();
        let calendarYear = todayDate.getFullYear();
        let calendarMonth = todayDate.getMonth();

        let bookingState = {
            step: 1,
            selectedServiceName: 'Mały Tatuaż / Fineline',
            selectedPrice: 80,
            selectedDate: null,
            selectedTime: null
        };

        let appBookings = JSON.parse(localStorage.getItem('netjes_tattoo_bookings')) || [];

        const servicesData = {
            'small': { name: 'Mały Tatuaż / Fineline', price: 80 },
            'medium': { name: 'Średni Tatuaż / Detal', price: 160 }
        };

        const availableTimeSlots = ['10:00', '12:00', '14:30', '17:00'];

        const monthNames = {
            pl: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            nl: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
        };

        const translations = {
            pl: {
                nav_about: "O mnie", nav_portfolio: "Portfolio", nav_booking: "Rezerwacja Online", nav_faq: "FAQ", nav_contact: "Kontakt", nav_book_btn: "Zarezerwuj Wizytę",
                hero_subtitle: "Studio Tatuażu • Daria Wąs", hero_title_1: "Precyzja, Delikatność i", hero_title_2: "Sztuka", hero_title_3: "na Twojej Skórze",
                hero_desc: "Specjalizuję się w autorskich tatuażach typu Fineline, mikrorealizmie oraz delikatnych kompozycjach roślinnych i geometrycznych.",
                hero_btn_book: "Zarezerwuj Termin", hero_btn_portfolio: "Zobacz Portfolio", about_tag: "O Mnie", about_badge: "Sterylność & Pasja",
                about_text_1: "Cześć! Nazywam się Daria i tworzę tatuaże, które stają się subtelną ozdobą Twojego ciała. W mojej pracy najważniejsza jest precyzja cienkiej linii (fineline) oraz komfort i bezpieczeństwo podczas każdej sesji.",
                about_text_2: "Dbam o kameralną i przyjazną atmosferę w studiu, tak aby każda wizyta była dla Ciebie przyjemnym doświadczeniem.",
                about_feature_1_title: "Cienka Linia", about_feature_1_desc: "Precyzyjne, subtelne detale", about_feature_2_title: "Indywidualność", about_feature_2_desc: "Projekt dopasowany do Ciebie",
                portfolio_tag: "Moje Prace", portfolio_title: "Galeria Portfolio", portfolio_item_2: "Mikrorealizm", portfolio_item_3: "Subtelny Napis",
                booking_tag: "System Rezerwacji", booking_title: "Zarezerwuj Termin Online", step_1_tab: "Usługa", step_2_tab: "Termin", step_3_tab: "Szczegóły", step_4_tab: "Podsumowanie",
                step_1_title: "1. Wybierz Rodzaj Usługi", service_small_title: "Mały Tatuaż / Fineline", service_small_desc: "Rozmiar do ~7 cm. Proste symbole, napisy.", service_medium_title: "Średni Tatuaż / Detal", service_medium_desc: "Rozmiar 8-15 cm. Szczegółowy motyw.", deposit_label: "Zaliczka", btn_next_date: "Dalej: Wybór Daty",
                step_2_title: "2. Wybierz Datę i Godzinę", day_mon: "Pon", day_tue: "Wt", day_wed: "Śr", day_thu: "Czw", day_fri: "Pt", day_sat: "Sob", day_sun: "Niedz", hours_title: "Godziny", click_day_prompt: "Kliknij dzień z kalendarza.", first_select_day: "Najpierw wybierz dzień", btn_back: "Wstecz", btn_next_details: "Dalej: Opis Tatuażu",
                step_3_title: "3. Opis Tatuażu & Twoje Dane", label_placement: "Miejsce na Ciele *", label_size: "Wymiar (cm)", label_desc: "Opis Wzoru *", label_images: "Zdjęcia Inspiracji (Maksymalnie 3)", label_images_hint: "Wybierz do 3 zdjęć ze swojego urządzenia. Kliknij ikonę kosza, aby usunąć wybrane zdjęcie.", btn_add_file: "Dodaj plik", label_fullname: "Imię i Nazwisko *", label_phone: "Telefon *", label_email: "Email *", btn_next_summary: "Dalej: Podsumowanie",
                step_4_title: "4. Podsumowanie Rezerwacji", summary_selected_service: "Wybrana Usługa", summary_datetime: "Data i Godzina:", summary_client: "Klient:", summary_place: "Miejsce:", summary_contact: "Kontakt:", summary_images_count: "Inspiracje:", label_rodo_consent: "Wyrażam zgodę na przetwarzanie moich danych osobowych (RODO) w celu realizacji rezerwacji terminu oraz kontaktu ze mną.", btn_confirm_booking: "Potwierdzam & Rezerwuję",
                faq_tag: "Warto Wiedzieć", faq_title: "Często Zadawane Pytania", faq_desc: "Masz pytania lub wątpliwości przed wizytą? Poniżej znajdziesz odpowiedzi na najczęściej zadawane pytania.",
                faq_q1: "Czy robienie tatuażu boli?", faq_a1: "Spokojnie, to znacznie mniej straszne niż myślisz! Technika Fineline wykorzystuje wyjątkowo cienkie igły, dzięki czemu odczucia przypominają raczej delikatne drapanie. W studiu dbam o kameralną, bezstresową atmosferę – zawsze możemy zrobić przerwę na herbatę, kawę i chwilę oddechu.",
                faq_q2: "Jak przygotować się do sesji?", faq_a2: "Przede wszystkim wyśpij się i zjedz pożywny posiłek przed wizytą. Dzień wcześniej zrezygnuj z alkoholu oraz zadbaj o dobre nawodnienie (pij dużo wody). Załóż wygodne, luźne ubranie, które nie będzie uciskać tatuowanego miejsca. O resztę zadbam ja!",
                faq_q3: "Jak dbać o świeży tatuaż?", faq_a3: "Po sesji zabezpieczę tatuaż specjalną folią (tzw. second skin) i dokładnie wyjaśnię Ci każdy krok pielęgnacji. Otrzymasz jasne wytyczne: przemywanie letnią wodą z delikatnym mydłem, nawilżanie dedykowanym kremem oraz unikanie basenu, sauny i mocnego słońca przez pierwsze 2–3 tygodnie.",
                faq_q4: "Czy projekt tworzysz indywidualnie?", faq_a4: "Tak, każdy tatuaż tworzę na podstawie Twojej wizji, przesłanych inspiracji oraz anatomii Twojego ciała. Wzór wspólnie dopasowujemy na początku sesji – nanosimy kalkę, oceniamy wielkość oraz ułożenie i nanosimy ewentualne poprawki, aż poczujesz pełne zadowolenie.",
                faq_q5: "Ile czasu goi się tatuaż?", faq_a5: "Wstępne gojenie naskórka trwa zazwyczaj około 2–3 tygodni – w tym czasie tatuaż może się delikatnie łuszczyć. Pełna regeneracja głębszych warstw skóry następuje po około miesiącu. Przez cały ten okres możesz śmiało do mnie napisać, jeśli będziesz mieć jakiekolwiek pytania!",
                faq_q6: "Czy w studiu jest bezpiecznie i sterylnie?", faq_a6: "Higiena i bezpieczeństwo to mój bezwzględny priorytet. Używam wyłącznie jednorazowych, sterylnych igieł (kartridży) otwieranych w Twojej obecności, certyfikowanych środków medycznych oraz wegańskich tuszy najwyższej jakości, zgodnych z normami EU REACH.",
                footer_desc: "Autorskie studio tatuażu Darii Wąs. Precyzja, sterylność i wyjątkowa atmosfera.", footer_contact_title: "Kontakt & Lokalizacja", footer_location: "Polska / Holandia", footer_hours_title: "Godziny Otwarcia", footer_hours_week: "Poniedziałek – Sobota: 10:00 – 18:00", footer_hours_sun: "Niedziela: Zamknięte", footer_rights: "© 2026 netjes TATTOO by Daria Wąs. Wszelkie prawa zastrzeżone."
            },
            en: {
                nav_about: "About Me", nav_portfolio: "Portfolio", nav_booking: "Online Booking", nav_faq: "FAQ", nav_contact: "Contact", nav_book_btn: "Book Appointment",
                hero_subtitle: "Tattoo Studio • Daria Wąs", hero_title_1: "Precision, Delicacy and", hero_title_2: "Art", hero_title_3: "on Your Skin",
                hero_desc: "Specializing in fine-line tattoos, micro-realism, and delicate floral or geometric designs.", hero_btn_book: "Book Your Date", hero_btn_portfolio: "View Portfolio", about_tag: "About Me", about_badge: "Sterility & Passion",
                about_text_1: "Hi! My name is Daria and I create subtle tattoo art that enhances your body. My focus is on fine-line precision, comfort, and safety during every session.",
                about_text_2: "I ensure a cozy, friendly atmosphere in the studio so every visit feels special and relaxed.",
                about_feature_1_title: "Fine Line", about_feature_1_desc: "Precise, subtle details", about_feature_2_title: "Custom Designs", about_feature_2_desc: "Tailored to your vision",
                portfolio_tag: "My Works", portfolio_title: "Portfolio Gallery", portfolio_item_2: "Microrealism", portfolio_item_3: "Subtle Script",
                booking_tag: "Booking System", booking_title: "Book Online", step_1_tab: "Service", step_2_tab: "Date", step_3_tab: "Details", step_4_tab: "Summary",
                step_1_title: "1. Choose Service Type", service_small_title: "Small Tattoo / Fineline", service_small_desc: "Up to ~7 cm. Simple symbols, lettering.", service_medium_title: "Medium Tattoo / Detail", service_medium_desc: "8-15 cm. Detailed custom work.", deposit_label: "Deposit", btn_next_date: "Next: Choose Date",
                step_2_title: "2. Select Date & Time", day_mon: "Mon", day_tue: "Tue", day_wed: "Wed", day_thu: "Thu", day_fri: "Fri", day_sat: "Sat", day_sun: "Sun", hours_title: "Time Slots", click_day_prompt: "Select a date from calendar.", first_select_day: "First choose a date", btn_back: "Back", btn_next_details: "Next: Tattoo Details",
                step_3_title: "3. Tattoo Description & Info", label_placement: "Body Placement *", label_size: "Approx Size (cm)", label_desc: "Design Idea *", label_images: "Inspiration Photos (Max 3)", label_images_hint: "Select up to 3 photos from your device. Click the trash icon to remove a chosen photo.", btn_add_file: "Add photo", label_fullname: "Full Name *", label_phone: "Phone Number *", label_email: "Email Address *", btn_next_summary: "Next: Summary",
                step_4_title: "4. Booking Summary", summary_selected_service: "Selected Service", summary_datetime: "Date & Time:", summary_client: "Client:", summary_place: "Placement:", summary_contact: "Contact:", summary_images_count: "Inspirations:", label_rodo_consent: "I consent to the processing of my personal data (GDPR) for the purpose of booking my appointment and contact.", btn_confirm_booking: "Confirm & Reserve",
                faq_tag: "Good to Know", faq_title: "Frequently Asked Questions", faq_desc: "Have questions or concerns before your appointment? Here are answers to the most common questions.",
                faq_q1: "Does getting a tattoo hurt?", faq_a1: "Don't worry, it's much less intimidating than you might think! Fineline technique uses ultra-thin needles, so the sensation feels more like gentle scratching than sharp pain. I ensure a cozy, stress-free atmosphere in the studio – we can always take breaks whenever you need.",
                faq_q2: "How should I prepare for my session?", faq_a2: "Get a good night's sleep and eat a nourishing meal beforehand. Avoid alcohol the day before and stay well-hydrated. Wear comfortable, loose clothing that won't rub against the tattooed area. I'll take care of the rest!",
                faq_q3: "How do I take care of a fresh tattoo?", faq_a3: "After the session, I'll protect your tattoo with a medical breathable film (second skin) and walk you through every aftercare step. You'll receive clear guidance: wash gently with mild soap, apply recommended aftercare cream, and avoid swimming pools, saunas, and direct sun for 2–3 weeks.",
                faq_q4: "Do you design custom tattoos?", faq_a4: "Absolutely! Every tattoo is created based on your personal vision, inspiration references, and body anatomy. We finalize the design together at the start of your appointment – adjusting placement, size, and details until you feel 100% in love with it.",
                faq_q5: "How long does a tattoo take to heal?", faq_a5: "The surface layer typically heals in about 2–3 weeks, during which minor peeling is normal. Complete deep-tissue healing takes about 4–6 weeks. Feel free to message me anytime during your healing journey if you have questions!",
                faq_q6: "Is the studio sterile and safe?", faq_a6: "Hygiene and safety are my absolute priorities. I exclusively use single-use, sterile needle cartridges opened in front of you, hospital-grade disinfectants, and premium vegan inks compliant with EU REACH standards.",
                footer_desc: "Artistic tattoo studio by Daria Wąs. Precision, sterility, and unique atmosphere.", footer_contact_title: "Contact & Location", footer_location: "Poland / Netherlands", footer_hours_title: "Opening Hours", footer_hours_week: "Monday – Saturday: 10:00 – 18:00", footer_hours_sun: "Sunday: Closed", footer_rights: "© 2026 netjes TATTOO by Daria Wąs. All rights reserved."
            },
            nl: {
                nav_about: "Over Mij", nav_portfolio: "Portfolio", nav_booking: "Online Boeken", nav_faq: "FAQ", nav_contact: "Contact", nav_book_btn: "Afspraak Maken",
                hero_subtitle: "Tattoostudio • Daria Wąs", hero_title_1: "Precisie, Subtielheid en", hero_title_2: "Kunst", hero_title_3: "op Jouw Huid",
                hero_desc: "Gespecialiseerd in verfijnde Fineline-tattoos, micro-realisme en elegante botanische of geometrische ontwerpen.", hero_btn_book: "Boek een Datum", hero_btn_portfolio: "Bekijk Portfolio", about_tag: "Over Mij", about_badge: "Steriliteit & Passie",
                about_text_1: "Hoi! Ik ben Daria en ik maak subtiele tatoeages die je lichaam sieren. In mijn werk staan fineline-precisie, comfort en hygiëne voorop.",
                about_text_2: "Ik zorg voor een ontspannen en gastvrije sfeer in de studio, zodat elke afspraak een fijne ervaring is.",
                about_feature_1_title: "Fine Line", about_feature_1_desc: "Nauwkeurige, subtiele details", about_feature_2_title: "Uniek Ontwerp", about_feature_2_desc: "Aangepast aan jouw wensen",
                portfolio_tag: "Mijn Werk", portfolio_title: "Portfolio Galerij", portfolio_item_2: "Micro-realisme", portfolio_item_3: "Subtiele Tekst",
                booking_tag: "Boekingssysteem", booking_title: "Online Afspraak Maken", step_1_tab: "Dienst", step_2_tab: "Datum", step_3_tab: "Details", step_4_tab: "Overzicht",
                step_1_title: "1. Kies Soort Tattoo", service_small_title: "Kleine Tattoo / Fineline", service_small_desc: "Tot ~7 cm. Eenvoudige symbolen, tekst.", service_medium_title: "Middelgrote Tattoo / Detail", service_medium_desc: "8-15 cm. Gedetailleerd ontwerp.", deposit_label: "Aanbetaling", btn_next_date: "Volgende: Datum Kiezen",
                step_2_title: "2. Kies Datum & Tijd", day_mon: "Ma", day_tue: "Di", day_wed: "Wo", day_thu: "Do", day_fri: "Vr", day_sat: "Za", day_sun: "Zo", hours_title: "Tijdsloten", click_day_prompt: "Kies een datum in de kalender.", first_select_day: "Kies eerst een datum", btn_back: "Terug", btn_next_details: "Volgende: Details",
                step_3_title: "3. Beschrijving & Gegevens", label_placement: "Plek op het Lichaam *", label_size: "Afmeting (cm)", label_desc: "Beschrijving Wens *", label_images: "Inspiratie Foto's (Max 3)", label_images_hint: "Kies maximaal 3 foto's van je apparaat. Klik op het prullenbak-icoon om een foto te verwijderen.", btn_add_file: "Foto toevoegen", label_fullname: "Naam & Achternaam *", label_phone: "Telefoonnummer *", label_email: "E-mailadres *", btn_next_summary: "Volgende: Overzicht",
                step_4_title: "4. Overzicht Boeking", summary_selected_service: "Gekozen Dienst", summary_datetime: "Datum & Tijd:", summary_client: "Klant:", summary_place: "Plaatsing:", summary_contact: "Contact:", summary_images_count: "Inspiraties:", label_rodo_consent: "Ik ga akkoord met de verwerking van mijn persoonsgegevens (AVG) voor de reservering van mijn afspraak en contact.", btn_confirm_booking: "Bevestigen & Boeken",
                faq_tag: "Goed om te Weten", faq_title: "Veelgestelde Vragen", faq_desc: "Heb je vragen of twijfels voor je afspraak? Hieronder vind je antwoorden op de meest gestelde vragen.",
                faq_q1: "Doet het zetten van een tattoo pijn?", faq_a1: "Geen zorgen, het valt reuze mee! De Fineline-techniek maakt gebruik van extreem dunne naalden, waardoor het gevoel eerder lijkt op een lichte kriebel of krasje. Ik zorg voor een ontspannen en rustige sfeer in de studio – we kunnen altijd pauzeren voor koffie of thee.",
                faq_q2: "Hoe bereid ik me voor op de sessie?", faq_a2: "Zorg dat je goed uitgerust bent en eet van tevoren een voedzame maaltijd. Vermijd alcohol de dag ervoor en drink voldoende water. Draag comfortabele, losse kleding die niet knelt op de te tatoeëren plek. Ik zorg voor de rest!",
                faq_q3: "Hoe verzorg ik mijn nieuwe tattoo?", faq_a3: "Na de sessie breng ik een speciale beschermende folie (second skin) aan en leg ik je de nazorg stap voor stap uit: voorzichtig wassen met milde zeep, hydrateren met een geschikte zalf en 2–3 weken zwemmen, sauna en direct zonlicht vermijden.",
                faq_q4: "Maak je ook unieke ontwerpen op maat?", faq_a4: "Jazeker! Elke tattoo wordt op maat ontworpen aan de hand van jouw wensen, inspiraties en lichaamsanatomie. Aan het begin van de sessie plaatsen we het sjabloon en passen we de afmeting en positie aan totdat je helemaal tevreden bent.",
                faq_q5: "Hoe lang duurt de genezing?", faq_a5: "De opperhuid geneest meestal binnen 2–3 weken – lichte schilfering is normaal. Volledige diepe genezing duurt ongeveer 4 weken. Je mag me tijdens het herstel altijd een berichtje sturen met vragen!",
                faq_q6: "Is de studio hygiënisch en veilig?", faq_a6: "Hygiëne en veiligheid staan op nummer één. Ik gebruik uitsluitend steriele wegwerpnaalden die in jouw bijzijn worden geopend, medische desinfectiemiddelen en hoogwaardige veganistische inkten die voldoen aan de strenge EU REACH-normen.",
                footer_desc: "Autentieke tattoostudio van Daria Wąs. Precisie, hygiëne en unieke sfeer.", footer_contact_title: "Contact & Locatie", footer_location: "Polen / Nederland", footer_hours_title: "Openingstijden", footer_hours_week: "Maandag – Zaterdag: 10:00 – 18:00", footer_hours_sun: "Zondag: Gesloten", footer_rights: "© 2026 netjes TATTOO door Daria Wąs. Alle rechten voorbehouden."
            }
        };

        let currentLang = localStorage.getItem('netjes_language') || 'pl';

        /* ==========================================================================
           KONFIGURACJA KODÓW KIERUNKOWYCH DLA TELEFONU
           ========================================================================== */
        const countryList = [
            { code: '+48', iso: 'pl', name: 'Polska' },
            { code: '+31', iso: 'nl', name: 'Nederland' },
            { code: '+49', iso: 'de', name: 'Deutschland' },
            { code: '+44', iso: 'gb', name: 'United Kingdom' },
            { code: '+32', iso: 'be', name: 'België' },
            { code: '+33', iso: 'fr', name: 'France' },
            { code: '+380', iso: 'ua', name: 'Україна / Ukraine' },
            { code: '+420', iso: 'cz', name: 'Česko' },
            { code: '+43', iso: 'at', name: 'Österreich' },
            { code: '+41', iso: 'ch', name: 'Schweiz' },
            { code: '+39', iso: 'it', name: 'Italia' },
            { code: '+34', iso: 'es', name: 'España' },
            { code: '+47', iso: 'no', name: 'Norge' },
            { code: '+46', iso: 'se', name: 'Sverige' },
            { code: '+45', iso: 'dk', name: 'Danmark' },
            { code: '+353', iso: 'ie', name: 'Ireland' },
            { code: '+1', iso: 'us', name: 'USA / Canada' }
        ];

        let selectedCountry = countryList[0]; // Domyślnie Polska (+48)

        function renderCountryOptions(filterText = '') {
            const listContainer = document.getElementById('country-options-list');
            if (!listContainer) return;
            listContainer.innerHTML = '';
            
            const q = (filterText || '').toLowerCase().trim();
            const filtered = countryList.filter(c => 
                c.name.toLowerCase().includes(q) || 
                c.code.includes(q) || 
                c.iso.includes(q)
            );

            if (filtered.length === 0) {
                listContainer.innerHTML = '<div class="text-xs text-gray-400 py-3 text-center">Brak wyników</div>';
                return;
            }

            filtered.forEach(c => {
                const btn = document.createElement('button');
                btn.type = "button";
                const isSelected = (c.code === selectedCountry.code && c.iso === selectedCountry.iso);
                btn.className = `w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-surface transition text-left cursor-pointer group ${isSelected ? 'bg-gold/15 text-gold font-semibold' : 'text-gray-200'}`;
                btn.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <span class="fi fi-${c.iso} text-lg rounded-sm shadow-sm"></span>
                        <span class="text-sm group-hover:text-white transition">${c.name}</span>
                    </div>
                    <span class="text-sm font-mono font-medium ${isSelected ? 'text-gold' : 'text-gray-300 group-hover:text-gold'}">${c.code}</span>
                `;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    selectCountryCode(c.code, c.iso);
                };
                listContainer.appendChild(btn);
            });
        }

        function toggleCountryDropdown(e) {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            const menu = document.getElementById('country-dropdown-menu');
            const chevron = document.getElementById('prefix-chevron');
            if (!menu) return;

            const isHidden = menu.classList.contains('hidden');
            if (isHidden) {
                renderCountryOptions();
                menu.classList.remove('hidden');
                if (chevron) chevron.classList.add('rotate-180');
                const searchInput = document.getElementById('country-search-input');
                if (searchInput) {
                    searchInput.value = '';
                    setTimeout(() => searchInput.focus(), 60);
                }
            } else {
                menu.classList.add('hidden');
                if (chevron) chevron.classList.remove('rotate-180');
            }
        }

        function selectCountryCode(code, iso) {
            const found = countryList.find(c => c.code === code && c.iso === iso) || countryList.find(c => c.code === code) || { code, iso, name: '' };
            selectedCountry = found;

            const flagIcon = document.getElementById('selected-flag-icon');
            const prefixText = document.getElementById('selected-prefix-text');
            const menu = document.getElementById('country-dropdown-menu');
            const chevron = document.getElementById('prefix-chevron');

            if (flagIcon) flagIcon.className = `fi fi-${iso} text-base rounded-sm shadow-sm`;
            if (prefixText) prefixText.innerText = code;
            if (menu) menu.classList.add('hidden');
            if (chevron) chevron.classList.remove('rotate-180');

            const phoneInput = document.getElementById('input-client-phone');
            if (phoneInput) phoneInput.focus();
        }

        function filterCountryDropdown(val) {
            renderCountryOptions(val);
        }

        function getFullPhoneNumber() {
            const phoneInput = document.getElementById('input-client-phone');
            if (!phoneInput) return '';
            const raw = phoneInput.value.trim();
            if (!raw) return '';
            if (raw.startsWith('+')) {
                return raw;
            }
            return `${selectedCountry.code} ${raw}`;
        }

        // Zamykanie dropdowna przy kliknięciu poza nim
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('country-dropdown-menu');
            const btn = document.getElementById('phone-prefix-btn');
            const chevron = document.getElementById('prefix-chevron');
            if (menu && !menu.classList.contains('hidden')) {
                if (!menu.contains(e.target) && !btn.contains(e.target)) {
                    menu.classList.add('hidden');
                    if (chevron) chevron.classList.remove('rotate-180');
                }
            }
        });

        function selectLanguageFromModal(lang) {
            setLanguage(lang, true);
            const modal = document.getElementById('language-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        function updateLanguageSwitchThumb(lang = currentLang) {
            const thumb = document.getElementById('switch-thumb');
            const activeBtn = document.querySelector(`button[onclick="setLanguage('${lang}')"]`);
            if (activeBtn && thumb) {
                const targetLeft = activeBtn.offsetLeft + (activeBtn.offsetWidth - thumb.offsetWidth) / 2;
                thumb.style.transform = `translate(${targetLeft}px, -50%)`;
            }
        }

        function setLanguage(lang, saveToStorage = true) {
            if (!translations[lang]) return;
            currentLang = lang;
            if (saveToStorage) {
                localStorage.setItem('netjes_language', lang);
                document.documentElement.classList.add('has-lang');
            }
            const dict = translations[lang];
        
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dict[key]) {
                    el.innerText = dict[key];
                }
            });
        
            const flagPl = document.getElementById('flag-pl');
            const flagEn = document.getElementById('flag-en');
            const flagNl = document.getElementById('flag-nl');
        
            flagPl.classList.remove('opacity-100'); flagPl.classList.add('opacity-40');
            flagEn.classList.remove('opacity-100'); flagEn.classList.add('opacity-40');
            flagNl.classList.remove('opacity-100'); flagNl.classList.add('opacity-40');
        
            updateLanguageSwitchThumb(lang);
        
            if (lang === 'pl') {
                flagPl.classList.remove('opacity-40'); flagPl.classList.add('opacity-100');
            } else if (lang === 'en') {
                flagEn.classList.remove('opacity-40'); flagEn.classList.add('opacity-100');
            } else if (lang === 'nl') {
                flagNl.classList.remove('opacity-40'); flagNl.classList.add('opacity-100');
            }
        
            renderCalendar();
            if (typeof selectedInspirationFiles !== 'undefined' && selectedInspirationFiles.length > 0) {
                renderInspirationPreviews();
            }
        }

        // LENIS SMOOTH SCROLL
        if (typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        // SUPABASE CONFIG
        const SUPABASE_URL = 'https://pykesrbrwvvxbyftbjoz.supabase.co';
        const SUPABASE_ANON_KEY = 'sb_publishable_to5aEQEHPjUjqmjIc33ulA_PgJqsjgD';
        
        let db = null;
        if(typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
            db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        }

        /* ==========================================================================
           STYLOWY SYSTEM MODALI / OKIEN DIALOGOWYCH (ZAMIAST STANDARDOWEGO ALERT / CONFIRM)
           ========================================================================== */
        let activeModalResolver = null;

        function showCustomAlert({ title, message, type = 'info', btnText }) {
            return new Promise((resolve) => {
                const backdrop = document.getElementById('custom-modal-backdrop');
                const card = document.getElementById('custom-modal-card');
                const titleEl = document.getElementById('custom-modal-title');
                const bodyEl = document.getElementById('custom-modal-body');
                const iconContainer = document.getElementById('custom-modal-icon-container');
                const confirmBtn = document.getElementById('custom-modal-confirm-btn');
                const cancelBtn = document.getElementById('custom-modal-cancel-btn');
                const closeBtn = document.getElementById('custom-modal-close-btn');

                if (!backdrop || !card) {
                    alert(typeof message === 'string' ? message.replace(/<[^>]*>?/gm, '') : '');
                    resolve(true);
                    return;
                }

                if (activeModalResolver) {
                    activeModalResolver(false);
                    activeModalResolver = null;
                }

                // Konfiguracja ikony i stylu
                if (type === 'success') {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-gold/15 border border-gold/50 text-gold shadow-[0_0_25px_rgba(197,160,89,0.25)]";
                    iconContainer.innerHTML = '<i class="fa-solid fa-check"></i>';
                } else if (type === 'error') {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-red-500/15 border border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                    iconContainer.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
                } else if (type === 'warning') {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]";
                    iconContainer.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
                } else {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-dark-surface border border-dark-border text-gold shadow-lg";
                    iconContainer.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
                }

                titleEl.innerHTML = title || '';
                bodyEl.innerHTML = message || '';

                const defaultOkText = currentLang === 'pl' ? 'Rozumiem' : (currentLang === 'en' ? 'Got It' : 'Begrepen');
                confirmBtn.innerText = btnText || defaultOkText;
                confirmBtn.className = "gold-gradient-bg text-black font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer shadow-lg w-full sm:w-auto";

                cancelBtn.classList.add('hidden');

                let isClosed = false;
                function closeModal() {
                    if (isClosed) return;
                    isClosed = true;
                    activeModalResolver = null;

                    card.classList.remove('scale-100', 'opacity-100');
                    card.classList.add('scale-95', 'opacity-0');
                    backdrop.classList.remove('opacity-100');
                    backdrop.classList.add('opacity-0');

                    document.removeEventListener('keydown', onKeyDown);
                    backdrop.onclick = null;
                    if (closeBtn) closeBtn.onclick = null;
                    confirmBtn.onclick = null;

                    setTimeout(() => {
                        backdrop.classList.remove('flex');
                        backdrop.classList.add('hidden');
                        resolve(true);
                    }, 260);
                }

                function onKeyDown(e) {
                    if (e.key === 'Escape' || e.key === 'Enter') {
                        closeModal();
                    }
                }

                activeModalResolver = closeModal;
                confirmBtn.onclick = closeModal;
                if (closeBtn) closeBtn.onclick = closeModal;
                backdrop.onclick = (e) => {
                    if (e.target === backdrop) closeModal();
                };
                document.addEventListener('keydown', onKeyDown);

                backdrop.classList.remove('hidden');
                backdrop.classList.add('flex');
                void backdrop.offsetWidth;
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            });
        }

        function showCustomConfirm({ title, message, type = 'warning', confirmText, cancelText, isDestructive = false }) {
            return new Promise((resolve) => {
                const backdrop = document.getElementById('custom-modal-backdrop');
                const card = document.getElementById('custom-modal-card');
                const titleEl = document.getElementById('custom-modal-title');
                const bodyEl = document.getElementById('custom-modal-body');
                const iconContainer = document.getElementById('custom-modal-icon-container');
                const confirmBtn = document.getElementById('custom-modal-confirm-btn');
                const cancelBtn = document.getElementById('custom-modal-cancel-btn');
                const closeBtn = document.getElementById('custom-modal-close-btn');

                if (!backdrop || !card) {
                    resolve(confirm(typeof message === 'string' ? message.replace(/<[^>]*>?/gm, '') : ''));
                    return;
                }

                if (activeModalResolver) {
                    activeModalResolver(false);
                    activeModalResolver = null;
                }

                if (isDestructive) {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-red-500/15 border border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                    iconContainer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                } else {
                    iconContainer.className = "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]";
                    iconContainer.innerHTML = '<i class="fa-solid fa-circle-question"></i>';
                }

                titleEl.innerHTML = title || (currentLang === 'pl' ? 'Potwierdzenie' : (currentLang === 'en' ? 'Confirmation' : 'Bevestiging'));
                bodyEl.innerHTML = message || '';

                const defaultConfirm = currentLang === 'pl' ? 'Potwierdź' : (currentLang === 'en' ? 'Confirm' : 'Bevestigen');
                const defaultCancel = currentLang === 'pl' ? 'Anuluj' : (currentLang === 'en' ? 'Cancel' : 'Annuleren');

                confirmBtn.innerText = confirmText || defaultConfirm;
                if (isDestructive) {
                    confirmBtn.className = "bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer shadow-lg w-full sm:w-auto";
                } else {
                    confirmBtn.className = "gold-gradient-bg text-black font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition cursor-pointer shadow-lg w-full sm:w-auto";
                }

                cancelBtn.innerText = cancelText || defaultCancel;
                cancelBtn.classList.remove('hidden');

                let isClosed = false;
                function closeModal(result) {
                    if (isClosed) return;
                    isClosed = true;
                    activeModalResolver = null;

                    card.classList.remove('scale-100', 'opacity-100');
                    card.classList.add('scale-95', 'opacity-0');
                    backdrop.classList.remove('opacity-100');
                    backdrop.classList.add('opacity-0');

                    document.removeEventListener('keydown', onKeyDown);
                    backdrop.onclick = null;
                    if (closeBtn) closeBtn.onclick = null;
                    confirmBtn.onclick = null;
                    cancelBtn.onclick = null;

                    setTimeout(() => {
                        backdrop.classList.remove('flex');
                        backdrop.classList.add('hidden');
                        resolve(result);
                    }, 260);
                }

                function onKeyDown(e) {
                    if (e.key === 'Escape') closeModal(false);
                    if (e.key === 'Enter') closeModal(true);
                }

                activeModalResolver = () => closeModal(false);
                confirmBtn.onclick = () => closeModal(true);
                cancelBtn.onclick = () => closeModal(false);
                if (closeBtn) closeBtn.onclick = () => closeModal(false);
                backdrop.onclick = (e) => {
                    if (e.target === backdrop) closeModal(false);
                };
                document.addEventListener('keydown', onKeyDown);

                backdrop.classList.remove('hidden');
                backdrop.classList.add('flex');
                void backdrop.offsetWidth;
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            });
        }

        async function showBookingSuccessModal({ name, email, service, date, time, placement, imagesCount, isEmailSuccess = true }) {
            let title = "";
            let bodyHtml = "";
            let btnText = "";

            if (currentLang === 'pl') {
                title = "Rezerwacja Wysłana!";
                bodyHtml = `
                    <p class="text-sm sm:text-base text-gray-200 mb-5 leading-relaxed font-normal">
                        Dziękujemy, <strong class="text-white font-semibold">${name}</strong>! Twoja prośba o rezerwację terminu została pomyślnie przesłana do studia.
                    </p>
                    <div class="bg-dark-base/90 border border-dark-border rounded-2xl p-5 text-left space-y-3 mb-5 shadow-inner">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Wybrana Usługa</span>
                            <span class="text-white font-semibold">${service}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Data i Godzina</span>
                            <span class="text-gold font-bold text-base">${date} @ ${time}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Miejsce na ciele</span>
                            <span class="text-white font-medium">${placement}</span>
                        </div>
                        ${imagesCount > 0 ? `
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Inspiracje</span>
                            <span class="text-emerald-400 font-medium">${imagesCount} ${imagesCount === 1 ? 'załączone zdjęcie' : 'załączone zdjęcia'}</span>
                        </div>` : ''}
                    </div>
                    <p class="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-envelope-circle-check text-gold text-base"></i>
                        Potwierdzenie zostało wysłane na adres <strong class="text-white">${email}</strong>.
                    </p>
                `;
                btnText = "Wspaniale, dziękuję!";
            } else if (currentLang === 'en') {
                title = "Booking Confirmed!";
                bodyHtml = `
                    <p class="text-sm sm:text-base text-gray-200 mb-5 leading-relaxed font-normal">
                        Thank you, <strong class="text-white font-semibold">${name}</strong>! Your appointment request has been successfully sent to the studio.
                    </p>
                    <div class="bg-dark-base/90 border border-dark-border rounded-2xl p-5 text-left space-y-3 mb-5 shadow-inner">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Service</span>
                            <span class="text-white font-semibold">${service}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Date & Time</span>
                            <span class="text-gold font-bold text-base">${date} @ ${time}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Placement</span>
                            <span class="text-white font-medium">${placement}</span>
                        </div>
                        ${imagesCount > 0 ? `
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Inspirations</span>
                            <span class="text-emerald-400 font-medium">${imagesCount} attached</span>
                        </div>` : ''}
                    </div>
                    <p class="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-envelope-circle-check text-gold text-base"></i>
                        A confirmation has been sent to <strong class="text-white">${email}</strong>.
                    </p>
                `;
                btnText = "Wonderful, thanks!";
            } else {
                title = "Boeking Bevestigd!";
                bodyHtml = `
                    <p class="text-sm sm:text-base text-gray-200 mb-5 leading-relaxed font-normal">
                        Bedankt, <strong class="text-white font-semibold">${name}</strong>! Je boekingsaanvraag is succesvol verstuurd naar de studio.
                    </p>
                    <div class="bg-dark-base/90 border border-dark-border rounded-2xl p-5 text-left space-y-3 mb-5 shadow-inner">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Dienst</span>
                            <span class="text-white font-semibold">${service}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Datum & Tijd</span>
                            <span class="text-gold font-bold text-base">${date} @ ${time}</span>
                        </div>
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Plek</span>
                            <span class="text-white font-medium">${placement}</span>
                        </div>
                        ${imagesCount > 0 ? `
                        <div class="flex justify-between items-center text-sm border-t border-dark-border/40 pt-2.5">
                            <span class="text-gray-300 uppercase tracking-wider text-xs font-medium">Foto's</span>
                            <span class="text-emerald-400 font-medium">${imagesCount} bijgevoegd</span>
                        </div>` : ''}
                    </div>
                    <p class="text-xs sm:text-sm text-gray-300 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-envelope-circle-check text-gold text-base"></i>
                        Een bevestiging is verstuurd naar <strong class="text-white">${email}</strong>.
                    </p>
                `;
                btnText = "Geweldig, bedankt!";
            }

            await showCustomAlert({
                title,
                message: bodyHtml,
                type: 'success',
                btnText
            });
        }

        /* NAWIGACJA ZESTAWU KROKÓW */
        async function goToStep(stepNum) {
            if (stepNum > bookingState.step) {
                if (bookingState.step === 2 && (!bookingState.selectedDate || !bookingState.selectedTime)) {
                    await showCustomAlert({
                        title: currentLang === 'pl' ? "Wybór Terminu" : (currentLang === 'en' ? "Select Date & Time" : "Kies een Datum & Tijd"),
                        message: currentLang === 'pl' 
                            ? "Proszę wybrać dzień w kalendarzu <strong>oraz godzinę</strong> przed przejściem do opisu tatuażu." 
                            : (currentLang === 'en' 
                                ? "Please select a date from the calendar <strong>and a time slot</strong> before proceeding to tattoo details." 
                                : "Kies een datum in de kalender <strong>en een tijdstip</strong> om verder te gaan naar de tattoo beschrijving."),
                        type: 'warning'
                    });
                    return;
                }
                if (bookingState.step === 3) {
                    const name = document.getElementById('input-client-name').value.trim();
                    const phone = document.getElementById('input-client-phone').value.trim();
                    const email = document.getElementById('input-client-email').value.trim();
                    const place = document.getElementById('input-body-placement').value.trim();
                    const desc = document.getElementById('input-description').value.trim();

                    const phoneInput = document.getElementById('input-client-phone');
                    const emailInput = document.getElementById('input-client-email');
                    const phoneErrorEl = document.getElementById('phone-error-msg');
                    const emailErrorEl = document.getElementById('email-error-msg');

                    if (phoneErrorEl) phoneErrorEl.classList.add('hidden');
                    if (emailErrorEl) emailErrorEl.classList.add('hidden');
                    if (phoneInput) phoneInput.classList.remove('border-red-500');
                    if (emailInput) emailInput.classList.remove('border-red-500');

                    // 1. Sprawdzenie czy wszystkie pola są wypełnione
                    if (!name || !phone || !email || !place || !desc) {
                        await showCustomAlert({
                            title: currentLang === 'pl' ? "Wymagane Dane" : (currentLang === 'en' ? "Required Fields" : "Verplichte Velden"),
                            message: currentLang === 'pl' 
                                ? "Proszę uzupełnić wszystkie wymagane pola oznaczone gwiazdką (<strong>*</strong>)." 
                                : (currentLang === 'en' 
                                    ? "Please fill in all required fields marked with an asterisk (<strong>*</strong>)." 
                                    : "Vul alle verplichte velden met een sterretje (<strong>*</strong>) in."),
                            type: 'warning'
                        });
                        return;
                    }

                    // 2. Walidacja formatu adresu E-mail
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        if (emailErrorEl) {
                            emailErrorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${currentLang === 'pl' ? "Podaj poprawny adres e-mail (musi zawierać znak @ oraz domenę)" : (currentLang === 'en' ? "Enter a valid email address (must contain @ and domain)" : "Voer een geldig e-mailadres in (moet @ en domein bevatten)")}`;
                            emailErrorEl.classList.remove('hidden');
                        }
                        if (emailInput) {
                            emailInput.classList.add('border-red-500');
                            emailInput.focus();
                        }

                        await showCustomAlert({
                            title: currentLang === 'pl' ? "Niepoprawny E-mail" : (currentLang === 'en' ? "Invalid Email" : "Ongeldig E-mailadres"),
                            message: currentLang === 'pl' 
                                ? "Wpisany adres e-mail (<strong>" + email + "</strong>) ma niepoprawny format. Upewnij się, że zawiera znak <strong>@</strong> oraz właściwą domenę." 
                                : (currentLang === 'en' 
                                    ? "The entered email address (<strong>" + email + "</strong>) is invalid. Make sure it contains an <strong>@</strong> and a valid domain." 
                                    : "Het ingevoerde e-mailadres (<strong>" + email + "</strong>) is ongeldig. Zorg voor een <strong>@</strong> en een geldig domein."),
                            type: 'warning'
                        });
                        return;
                    }

                    // 3. Walidacja formatu Numeru Telefonu (min 9 cyfr)
                    const cleanPhone = phone.replace(/\D/g, '');
                    if (cleanPhone.length < 9) {
                        if (phoneErrorEl) {
                            phoneErrorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${currentLang === 'pl' ? "Numer telefonu powinien zawierać min. 9 cyfr" : (currentLang === 'en' ? "Phone number should have at least 9 digits" : "Telefoonnummer moet minimaal 9 cijfers bevatten")}`;
                            phoneErrorEl.classList.remove('hidden');
                        }
                        if (phoneInput) {
                            phoneInput.classList.add('border-red-500');
                            phoneInput.focus();
                        }

                        await showCustomAlert({
                            title: currentLang === 'pl' ? "Niepoprawny Numer Telefonu" : (currentLang === 'en' ? "Invalid Phone Number" : "Ongeldig Telefoonnummer"),
                            message: currentLang === 'pl' 
                                ? "Wprowadzony numer telefonu jest za krótki. Wpisz co najmniej 9 cyfr swojego numeru." 
                                : (currentLang === 'en' 
                                    ? "The entered phone number is too short. Please provide at least 9 digits." 
                                    : "Het ingevoerde telefoonnummer is te kort. Voer minimaal 9 cijfers in."),
                            type: 'warning'
                        });
                        return;
                    }
                }
            }

            bookingState.step = stepNum;

            document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(`step-content-${stepNum}`).classList.remove('hidden');

            for (let i = 1; i <= 4; i++) {
                const tab = document.getElementById(`step-tab-${i}`);
                const circle = document.getElementById(`step-circle-${i}`);
                const label = document.getElementById(`step-label-${i}`);

                if (i <= stepNum) {
                    tab.classList.remove('opacity-40');
                    tab.classList.add('opacity-100');
                    circle.className = "w-10 h-10 rounded-full gold-gradient-bg text-black font-bold flex items-center justify-center text-sm mb-2";
                    if(label) label.className = "text-xs uppercase tracking-wider font-semibold text-gold hidden sm:block";
                } else {
                    tab.classList.add('opacity-40');
                    tab.classList.remove('opacity-100');
                    circle.className = "w-10 h-10 rounded-full bg-dark-base border border-dark-border text-white font-bold flex items-center justify-center text-sm mb-2";
                    if(label) label.className = "text-xs uppercase tracking-wider font-medium text-gray-400 hidden sm:block";
                }
            }

            if (stepNum === 4) updateSummaryData();
        }

        /* WYBÓR USŁUGI */
        function selectService(key) {
            bookingState.selectedServiceName = servicesData[key].name;
            bookingState.selectedPrice = servicesData[key].price;

            document.querySelectorAll('.service-card').forEach(card => {
                card.className = "service-card p-6 rounded-2xl border border-dark-border bg-dark-base cursor-pointer transition-all flex justify-between items-start select-none";
            });

            document.getElementById(`service-card-${key}`).className = "service-card p-6 rounded-2xl border border-gold bg-gold/10 cursor-pointer transition-all flex justify-between items-start select-none";
        }

        /* PRZEŁĄCZANIE MIESIĘCY (MAX 3 DO PRZODU, 1 W TYŁ) */
        function changeMonth(delta) {
            const currentTotal = calendarYear * 12 + calendarMonth;
            const todayTotal = todayDate.getFullYear() * 12 + todayDate.getMonth();
            const minTotal = todayTotal - 1;
            const maxTotal = todayTotal + 3;

            const newTotal = currentTotal + delta;
            if (newTotal >= minTotal && newTotal <= maxTotal) {
                calendarMonth += delta;
                if (calendarMonth > 11) {
                    calendarMonth = 0;
                    calendarYear++;
                } else if (calendarMonth < 0) {
                    calendarMonth = 11;
                    calendarYear--;
                }
                renderCalendar();
            }
        }

        /* KALENDARZ Z KOLOROWANIEM STOPNIA ZAJĘTOŚCI DNI */
        let calendarRenderCounter = 0;

        async function renderCalendar() {
            const currentRenderId = ++calendarRenderCounter;
            const grid = document.getElementById('calendar-days-grid');
            const monthDisplay = document.getElementById('calendar-month-display');
            if(!grid || !monthDisplay) return;

            const today = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
            const maxAllowedBookingDate = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());

            const currentTotalMonths = calendarYear * 12 + calendarMonth;
            const todayTotalMonths = todayDate.getFullYear() * 12 + todayDate.getMonth();
            
            const prevBtn = document.getElementById('prev-month-btn');
            const nextBtn = document.getElementById('next-month-btn');
            if (prevBtn) prevBtn.disabled = (currentTotalMonths <= todayTotalMonths - 1);
            if (nextBtn) nextBtn.disabled = (currentTotalMonths >= todayTotalMonths + 3);

            const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1);
            let firstDayIndex = firstDayOfMonth.getDay() - 1; 
            if (firstDayIndex === -1) firstDayIndex = 6;

            const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

            // Pobranie aktywnych rezerwacji dla całego widocznego miesiąca z Supabase (pomijamy anulowane)
            let monthBookingsCount = {};
            if (db) {
                const startDateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-01`;
                const endDateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${daysInMonth}`;
                
                try {
                    const { data, error } = await db
                        .from('bookings')
                        .select('date, status')
                        .gte('date', startDateStr)
                        .lte('date', endDateStr)
                        .neq('status', 'anulowana');

                    if (!error && data) {
                        data.forEach(b => {
                            monthBookingsCount[b.date] = (monthBookingsCount[b.date] || 0) + 1;
                        });
                    }
                } catch (e) {
                    console.error("Błąd pobierania rezerwacji do kalendarza:", e);
                }
            }

            // Jeśli w międzyczasie wywołano nowsze renderowanie kalendarza, przerywamy to wywołanie
            if (currentRenderId !== calendarRenderCounter) return;

            monthDisplay.innerText = `${monthNames[currentLang][calendarMonth]} ${calendarYear}`;

            const fragment = document.createDocumentFragment();

            for (let i = 0; i < firstDayIndex; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = "h-12 w-full";
                fragment.appendChild(emptyCell);
            }

            const totalSlotsPerDay = availableTimeSlots.length;

            for (let day = 1; day <= daysInMonth; day++) {
                const dayDate = new Date(calendarYear, calendarMonth, day);
                const dayOfWeek = dayDate.getDay();
                
                const m = String(calendarMonth + 1).padStart(2, '0');
                const d = String(day).padStart(2, '0');
                const dateStr = `${calendarYear}-${m}-${d}`;

                const btn = document.createElement('button');
                btn.type = "button";
                btn.innerText = day;

                const isPast = dayDate < today;
                const isTooFar = dayDate > maxAllowedBookingDate;
                const isSunday = (dayOfWeek === 0);
                const isDisabled = isPast || isTooFar || isSunday;

                if (isDisabled) {
                    btn.className = "calendar-day-btn h-12 w-full rounded-xl border border-dark-border/30 text-xs text-gray-600 line-through bg-dark-base/40 cursor-not-allowed flex items-center justify-center font-medium select-none";
                    btn.disabled = true;
                } else {
                    const bookedCount = monthBookingsCount[dateStr] || 0;
                    
                    let bgBorderClass = "border-emerald-500/40 bg-emerald-950/20 text-emerald-200 hover:border-emerald-400";

                    if (bookedCount >= totalSlotsPerDay) {
                        bgBorderClass = "border-red-500/40 bg-red-950/20 text-red-200 hover:border-red-400";
                    } else if (bookedCount > 0) {
                        bgBorderClass = "border-amber-500/40 bg-amber-950/20 text-amber-200 hover:border-amber-400";
                    }

                    btn.className = `calendar-day-btn h-12 w-full rounded-xl border ${bgBorderClass} text-xs transition flex items-center justify-center font-semibold cursor-pointer shadow-sm`;

                    if (bookingState.selectedDate === dateStr) {
                        btn.classList.add('selected-day');
                    }

                    btn.onclick = async () => {
                        bookingState.selectedDate = dateStr;
                        bookingState.selectedTime = null;
                        document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected-day'));
                        btn.classList.add('selected-day');
                        document.getElementById('selected-date-display').innerText = `Data: ${dateStr}`;
                        await renderTimeSlots();
                    };
                }
                fragment.appendChild(btn);
            }

            grid.innerHTML = '';
            grid.appendChild(fragment);
        }

        /* GODZINY */
        async function renderTimeSlots() {
            const container = document.getElementById('time-slots-container');
            container.innerHTML = '<div class="col-span-2 text-center py-4 text-xs text-gold">Sprawdzanie dostępności...</div>';

            let takenTimes = [];

            if (db && bookingState.selectedDate) {
                const { data, error } = await db
                    .from('bookings')
                    .select('time, status')
                    .eq('date', bookingState.selectedDate)
                    .neq('status', 'anulowana');

                if (!error && data) {
                    takenTimes = data.map(b => b.time);
                }
            }

            container.innerHTML = '';

            availableTimeSlots.forEach(time => {
                const isTaken = takenTimes.includes(time);
                const slotBtn = document.createElement('button');
                slotBtn.type = "button";
                
                if (isTaken) {
                    slotBtn.className = 'py-3 px-4 rounded-xl border border-red-900/40 text-xs text-red-400/50 bg-red-950/20 cursor-not-allowed line-through';
                    slotBtn.innerText = `${time} (Zajęte)`;
                    slotBtn.disabled = true;
                } else {
                    slotBtn.className = 'time-slot-btn py-3 px-4 rounded-xl border border-dark-border text-xs text-white bg-dark-surface hover:border-gold cursor-pointer';
                    if (bookingState.selectedTime === time) {
                        slotBtn.classList.add('selected-slot');
                    }
                    slotBtn.innerText = time;
                    slotBtn.onclick = () => {
                        bookingState.selectedTime = time;
                        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected-slot'));
                        slotBtn.classList.add('selected-slot');
                    };
                }
                
                container.appendChild(slotBtn);
            });
        }

        /* ZARZĄDZANIE ZDJĘCIAMI INSPIRACJI */
        let selectedInspirationFiles = [];

        async function handleInspirationFilesSelected(files) {
            if (!files || files.length === 0) return;

            const remainingSlots = 3 - selectedInspirationFiles.length;
            if (remainingSlots <= 0) {
                await showCustomAlert({
                    title: currentLang === 'pl' ? "Limit Zdjęć" : (currentLang === 'en' ? "Photo Limit" : "Foto Limiet"),
                    message: currentLang === 'pl' 
                        ? "Możesz dodać maksymalnie <strong>3 zdjęcia inspiracji</strong>." 
                        : (currentLang === 'en' 
                            ? "You can upload a maximum of <strong>3 inspiration photos</strong>." 
                            : "Je kunt maximaal <strong>3 inspiratiefoto's</strong> uploaden."),
                    type: 'info'
                });
                const fileInput = document.getElementById('input-inspiration-files');
                if (fileInput) fileInput.value = '';
                return;
            }

            const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            if (validFiles.length === 0) {
                await showCustomAlert({
                    title: currentLang === 'pl' ? "Format Pliku" : (currentLang === 'en' ? "File Format" : "Bestandsformaat"),
                    message: currentLang === 'pl' 
                        ? "Proszę wybrać poprawne pliki graficzne (<strong>JPG, PNG, WebP</strong>)." 
                        : (currentLang === 'en' 
                            ? "Please select valid image files (<strong>JPG, PNG, WebP</strong>)." 
                            : "Kies geldige afbeeldingsbestanden (<strong>JPG, PNG, WebP</strong>)."),
                    type: 'warning'
                });
                const fileInput = document.getElementById('input-inspiration-files');
                if (fileInput) fileInput.value = '';
                return;
            }

            const filesToAdd = validFiles.slice(0, remainingSlots);
            selectedInspirationFiles.push(...filesToAdd);

            if (validFiles.length > remainingSlots) {
                await showCustomAlert({
                    title: currentLang === 'pl' ? "Limit Zdjęć" : (currentLang === 'en' ? "Photo Limit" : "Foto Limiet"),
                    message: currentLang === 'pl' 
                        ? "Możesz dodać łącznie maksymalnie 3 zdjęcia. Dodano dopuszczalną liczbę, a nadmiarowe pliki zostały pominięte." 
                        : (currentLang === 'en' 
                            ? "Maximum 3 photos allowed. Extra files were omitted." 
                            : "Maximaal 3 foto's toegestaan. Extra bestanden zijn weggelaten."),
                    type: 'info'
                });
            }

            renderInspirationPreviews();

            const fileInput = document.getElementById('input-inspiration-files');
            if (fileInput) fileInput.value = '';
        }

        function removeInspirationFile(index) {
            if (index >= 0 && index < selectedInspirationFiles.length) {
                selectedInspirationFiles.splice(index, 1);
                renderInspirationPreviews();
            }
        }

        function renderInspirationPreviews() {
            const container = document.getElementById('inspiration-previews-container');
            const addBtn = document.getElementById('inspiration-add-btn');
            const badge = document.getElementById('inspiration-count-badge');

            if (!container) return;

            // Usuń istniejące kafelki miniatur
            container.querySelectorAll('.inspiration-preview-item').forEach(el => el.remove());

            // Aktualizuj licznik
            if (badge) {
                badge.innerText = `${selectedInspirationFiles.length} / 3`;
            }

            // Pokaż/ukryj przycisk dodawania
            if (addBtn) {
                if (selectedInspirationFiles.length >= 3) {
                    addBtn.classList.add('hidden');
                } else {
                    addBtn.classList.remove('hidden');
                }
            }

            // Generuj kafelki podglądu dla każdego pliku
            selectedInspirationFiles.forEach((file, index) => {
                const card = document.createElement('div');
                card.className = "inspiration-preview-item relative group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-dark-border bg-dark-surface shadow-md flex-shrink-0 animate-fade-in";

                const img = document.createElement('img');
                img.className = "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105";
                img.alt = file.name;
                img.src = URL.createObjectURL(file);

                const deleteBtn = document.createElement('button');
                deleteBtn.type = "button";
                deleteBtn.className = "absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center transition shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 z-10";
                const deleteTitle = currentLang === 'pl' ? "Usuń zdjęcie" : (currentLang === 'en' ? "Remove photo" : "Verwijder foto");
                deleteBtn.title = deleteTitle;
                deleteBtn.setAttribute('aria-label', deleteTitle);
                deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can text-xs"></i>';
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeInspirationFile(index);
                };

                const overlay = document.createElement('div');
                overlay.className = "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-1.5 pt-3 pointer-events-none";
                const nameText = document.createElement('p');
                nameText.className = "text-[11px] text-gray-100 font-medium truncate";
                nameText.innerText = file.name;
                overlay.appendChild(nameText);

                card.appendChild(img);
                card.appendChild(deleteBtn);
                card.appendChild(overlay);

                if (addBtn) {
                    container.insertBefore(card, addBtn);
                } else {
                    container.appendChild(card);
                }
            });
        }

        /* PODSUMOWANIE */
        function updateSummaryData() {
            const filesCount = selectedInspirationFiles.length;

            document.getElementById('summary-service-title').innerText = bookingState.selectedServiceName;
            document.getElementById('summary-service-price').innerText = `€${bookingState.selectedPrice}`;
            document.getElementById('summary-datetime').innerText = `${bookingState.selectedDate} @ ${bookingState.selectedTime}`;
            document.getElementById('summary-client').innerText = document.getElementById('input-client-name').value;
            document.getElementById('summary-placement').innerText = document.getElementById('input-body-placement').value;
            document.getElementById('summary-contact').innerText = `${getFullPhoneNumber()} • ${document.getElementById('input-client-email').value}`;

            let countText = 'Brak załączonych zdjęć';
            if (filesCount > 0) {
                if (currentLang === 'pl') {
                    countText = `${filesCount} ${filesCount === 1 ? 'załączone zdjęcie' : 'załączone zdjęcia'}`;
                } else if (currentLang === 'nl') {
                    countText = `${filesCount} ${filesCount === 1 ? 'bijgevoegde foto' : 'bijgevoegde foto\'s'}`;
                } else {
                    countText = `${filesCount} ${filesCount === 1 ? 'attached photo' : 'attached photos'}`;
                }
            }
            document.getElementById('summary-images-count').innerText = countText;

            const summaryList = document.getElementById('summary-images-preview-list');
            if (summaryList) {
                summaryList.innerHTML = '';
                selectedInspirationFiles.forEach(file => {
                    const thumb = document.createElement('img');
                    thumb.className = "w-12 h-12 rounded-lg object-cover border border-dark-border shadow";
                    thumb.src = URL.createObjectURL(file);
                    thumb.alt = file.name;
                    thumb.title = file.name;
                    summaryList.appendChild(thumb);
                });
            }
        }

        /* FUNKCJA PRZESYŁAJĄCA ZDJĘCIA DO SUPABASE STORAGE */
        async function uploadInspirations(files) {
            if (!db) return [];
            const uploadedUrls = [];
            const filesToUpload = Array.from(files).slice(0, 3);

            for (const file of filesToUpload) {
                const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
                
                const { data, error } = await db.storage
                    .from('tattoo-inspiration')
                    .upload(cleanFileName, file);

                if (!error) {
                    const { data: publicUrlData } = db.storage
                        .from('tattoo-inspiration')
                        .getPublicUrl(cleanFileName);
                    
                    if (publicUrlData && publicUrlData.publicUrl) {
                        uploadedUrls.push(publicUrlData.publicUrl);
                    }
                } else {
                    console.error("Błąd przesyłania pliku do Storage:", error);
                }
            }
            return uploadedUrls;
        }

        /* FINALIZACJA REZERWACJI I WYSYŁKA EMAIL */
        async function submitFinalBooking() {
            const rodoCheckbox = document.getElementById('input-rodo-consent');
            if (rodoCheckbox && !rodoCheckbox.checked) {
                await showCustomAlert({
                    title: currentLang === 'pl' ? "Wymagana Zgoda" : (currentLang === 'en' ? "Consent Required" : "Toestemming Vereist"),
                    message: currentLang === 'pl' 
                        ? "Przed wysłaniem rezerwacji prosimy o zaznaczenie <strong>zgody na przetwarzanie danych osobowych (RODO)</strong>." 
                        : (currentLang === 'en' 
                            ? "Before submitting your booking, please check the <strong>consent to the processing of personal data (GDPR)</strong>." 
                            : "Vink voor het verzenden van de boeking het vakje aan voor <strong>toestemming voor de verwerking van persoonsgegevens (AVG)</strong>."),
                    type: 'warning'
                });
                return;
            }

            const submitBtn = document.getElementById('submit-btn');
            submitBtn.innerText = "Wysyłanie plików i rezerwacja...";
            submitBtn.disabled = true;

            const nameVal = document.getElementById('input-client-name').value.trim();
            const emailVal = document.getElementById('input-client-email').value.trim();
            const phoneVal = getFullPhoneNumber();
            const placeVal = document.getElementById('input-body-placement').value.trim();
            const descVal = document.getElementById('input-description').value.trim();

            // Przesyłanie zdjęć
            let imageUrls = [];
            if (selectedInspirationFiles && selectedInspirationFiles.length > 0) {
                imageUrls = await uploadInspirations(selectedInspirationFiles);
            }

            const imagesString = imageUrls.join(', ');

            const payload = {
                clientname: nameVal,
                clientemail: emailVal,
                clientphone: phoneVal,
                service: bookingState.selectedServiceName,
                date: bookingState.selectedDate,
                time: bookingState.selectedTime,
                placement: placeVal,
                description: descVal,
                images: imagesString,
                status: 'oczekujaca'
            };

            // 1. Zapis do Bazy Supabase
            if (db) {
                const { error } = await db.from('bookings').insert([payload]);
                if (error) console.error("Error Supabase Insert:", error);
            }

            // 2. Wysyłka Powiadomienia na Email
            const templateParams = {
                client_name: nameVal,
                client_email: emailVal,
                client_phone: phoneVal,
                service_name: bookingState.selectedServiceName,
                booking_date: bookingState.selectedDate,
                booking_time: bookingState.selectedTime,
                body_placement: placeVal,
                description: descVal,
                images_links: imageUrls.length > 0 ? imageUrls.join('\n') : 'Brak dołączonych zdjęć'
            };

            let isEmailSuccess = true;
            try {
                await emailjs.send('service_vf32q58', 'template_73a85e8', templateParams);
            } catch (emailErr) {
                console.error("Błąd wysyłania EmailJS:", emailErr);
                isEmailSuccess = false;
            }

            // 3. Zapis w pamięci podręcznej przeglądarki
            const localBooking = {
                created_at: new Date().toISOString(),
                ...payload
            };
            appBookings.unshift(localBooking);
            localStorage.setItem('netjes_tattoo_bookings', JSON.stringify(appBookings));

            const savedClientName = nameVal;
            const savedClientEmail = emailVal;
            const savedServiceName = bookingState.selectedServiceName;
            const savedDate = bookingState.selectedDate;
            const savedTime = bookingState.selectedTime;
            const savedPlace = placeVal;
            const savedImagesCount = imageUrls.length;

            // Reset Formularza
            bookingState.selectedDate = null;
            bookingState.selectedTime = null;
            document.getElementById('input-client-name').value = '';
            document.getElementById('input-client-phone').value = '';
            document.getElementById('input-client-email').value = '';
            document.getElementById('input-body-placement').value = '';
            document.getElementById('input-description').value = '';
            const fileInput = document.getElementById('input-inspiration-files');
            if (fileInput) fileInput.value = '';
            if (rodoCheckbox) rodoCheckbox.checked = false;
            selectedInspirationFiles = [];
            renderInspirationPreviews();

            submitBtn.innerText = translations[currentLang].btn_confirm_booking;
            submitBtn.disabled = false;

            goToStep(1);
            await renderCalendar();

            // Stylowe okno potwierdzenia rezerwacji
            await showBookingSuccessModal({
                name: savedClientName,
                email: savedClientEmail,
                service: savedServiceName,
                date: savedDate,
                time: savedTime,
                placement: savedPlace,
                imagesCount: savedImagesCount,
                isEmailSuccess
            });
        }

        /* LOGIKA PANELU ADMINA SUPABASE AUTH (#admin) */
        async function loginAdmin(e) {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            const errBox = document.getElementById('admin-login-error');
            const btn = document.getElementById('admin-login-btn');

            errBox.classList.add('hidden');
            btn.innerText = "Logowanie...";
            btn.disabled = true;

            if (!db) {
                errBox.innerText = "Brak połączenia z bazy danych Supabase.";
                errBox.classList.remove('hidden');
                btn.innerText = "Zaloguj się";
                btn.disabled = false;
                return;
            }

            const { data, error } = await db.auth.signInWithPassword({ email, password });

            if (error) {
                errBox.innerText = "Niepoprawny e-mail lub hasło!";
                errBox.classList.remove('hidden');
                btn.innerText = "Zaloguj się";
                btn.disabled = false;
            } else {
                btn.innerText = "Zaloguj się";
                btn.disabled = false;
                checkHashRoute();
            }
        }

        async function logoutAdmin() {
            if (db) await db.auth.signOut();
            checkHashRoute();
        }

        async function checkHashRoute() {
            if (window.location.hash === '#admin') {
                document.getElementById('client-view-container').classList.add('hidden');
                document.getElementById('admin-view-container').classList.remove('hidden');

                let session = null;
                if (db) {
                    const { data } = await db.auth.getSession();
                    session = data.session;
                }

                if (session) {
                    document.getElementById('admin-login-box').classList.add('hidden');
                    document.getElementById('admin-dashboard-content').classList.remove('hidden');
                    await fetchAndRenderBookings();
                } else {
                    document.getElementById('admin-login-box').classList.remove('hidden');
                    document.getElementById('admin-dashboard-content').classList.add('hidden');
                }
            } else {
                document.getElementById('admin-view-container').classList.add('hidden');
                document.getElementById('client-view-container').classList.remove('hidden');
            }
        }

        async function fetchAndRenderBookings() {
            if (db) {
                const { data, error } = await db.from('bookings').select('*').order('id', { ascending: false });
                if (!error && data) {
                    appBookings = data;
                }
            }
            renderAdminDashboard();
        }

        function renderAdminDashboard() {
            const activeBody = document.getElementById('admin-active-bookings-body');
            const archiveBody = document.getElementById('admin-archive-bookings-body');
            activeBody.innerHTML = '';
            archiveBody.innerHTML = '';

            const activeBookings = appBookings.filter(b => !b.status || b.status === 'oczekujaca');
            const archiveBookings = appBookings.filter(b => b.status === 'zrealizowana' || b.status === 'anulowana');

            // Renderuj Aktywne Rezerwacje
            if (activeBookings.length === 0) {
                activeBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-gray-400 text-sm">Brak nowych / oczekujących rezerwacji</td></tr>';
            } else {
                activeBookings.forEach((b) => {
                    const createdAt = b.created_at ? new Date(b.created_at).toLocaleString('pl-PL') : '—';
                    const name = b.clientname || 'Brak danych';
                    const email = b.clientemail || '';
                    const phone = b.clientphone || '';
                    const placement = b.placement || '—';
                    const description = b.description || '—';
                    const bookingId = b.id;

                    const imagesHtml = renderImagesHtml(b.images);

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="p-5 text-gray-300 font-mono text-xs sm:text-sm">${createdAt}</td>
                        <td class="p-5 font-bold text-white text-sm sm:text-base">${name}<br><span class="text-xs sm:text-sm text-gray-300 font-normal">${email} • ${phone}</span></td>
                        <td class="p-5 text-gold font-semibold text-sm sm:text-base">${b.service}</td>
                        <td class="p-5 text-gray-200 text-sm sm:text-base">${b.date} (${b.time})</td>
                        <td class="p-5 text-gray-200 text-sm sm:text-base leading-relaxed">${placement} - ${description}</td>
                        <td class="p-5">${imagesHtml}</td>
                        <td class="p-5 text-right space-x-2">
                            <button onclick="updateBookingStatus(${bookingId}, 'zrealizowana')" title="Oznacz jako zrealizowaną" class="bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer">
                                <i class="fa-solid fa-check mr-1"></i> Zrealizowana
                            </button>
                            <button onclick="updateBookingStatus(${bookingId}, 'anulowana')" title="Oznacz jako anulowaną" class="bg-amber-950/60 border border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-black font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer">
                                <i class="fa-solid fa-xmark mr-1"></i> Anulowana
                            </button>
                        </td>
                    `;
                    activeBody.appendChild(row);
                });
            }

            // Renderuj Archiwum Rezerwacji
            if (archiveBookings.length === 0) {
                archiveBody.innerHTML = '<tr><td colspan="8" class="p-6 text-center text-gray-400 text-sm">Brak zrealizowanych lub anulowanych rezerwacji w archiwum</td></tr>';
            } else {
                archiveBookings.forEach((b) => {
                    const createdAt = b.created_at ? new Date(b.created_at).toLocaleString('pl-PL') : '—';
                    const name = b.clientname || 'Brak danych';
                    const email = b.clientemail || '';
                    const phone = b.clientphone || '';
                    const placement = b.placement || '—';
                    const description = b.description || '—';
                    const bookingId = b.id;

                    const imagesHtml = renderImagesHtml(b.images);

                    // Kolorowanie w zależności od statusu
                    let statusBadge = '';
                    let deleteButtonHtml = '';

                    if (b.status === 'zrealizowana') {
                        statusBadge = '<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"><i class="fa-solid fa-circle-check mr-1.5"></i> Zrealizowana</span>';
                        deleteButtonHtml = '<span class="text-gray-400 text-xs italic">Brak akcji</span>';
                    } else if (b.status === 'anulowana') {
                        statusBadge = '<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-500/40"><i class="fa-solid fa-ban mr-1.5"></i> Anulowana</span>';
                        deleteButtonHtml = `
                            <button onclick="deleteBooking(${bookingId})" title="Usuń trwale z bazy" class="bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-600 hover:text-white font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm transition cursor-pointer">
                                <i class="fa-solid fa-trash mr-1"></i> Usuń
                            </button>
                        `;
                    }

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="p-5">${statusBadge}</td>
                        <td class="p-5 text-gray-300 font-mono text-xs sm:text-sm">${createdAt}</td>
                        <td class="p-5 font-bold text-white text-sm sm:text-base">${name}<br><span class="text-xs sm:text-sm text-gray-300 font-normal">${email} • ${phone}</span></td>
                        <td class="p-5 text-gold font-semibold text-sm sm:text-base">${b.service}</td>
                        <td class="p-5 text-gray-200 text-sm sm:text-base">${b.date} (${b.time})</td>
                        <td class="p-5 text-gray-200 text-sm sm:text-base leading-relaxed">${placement} - ${description}</td>
                        <td class="p-5">${imagesHtml}</td>
                        <td class="p-5 text-right">${deleteButtonHtml}</td>
                    `;
                    archiveBody.appendChild(row);
                });
            }
        }

        function renderImagesHtml(imagesStr) {
            if (!imagesStr || imagesStr.trim() === '') {
                return '<span class="text-gray-600 italic">Brak</span>';
            }
            const links = imagesStr.split(',').map(url => url.trim());
            let html = '<div class="flex items-center gap-2 flex-wrap">';
            links.forEach((link, i) => {
                html += `
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="block w-10 h-10 rounded-lg overflow-hidden border border-gold/40 hover:border-gold transition">
                        <img src="${link}" class="w-full h-full object-cover" title="Inspiracja ${i+1}">
                    </a>
                `;
            });
            html += '</div>';
            return html;
        }

        async function updateBookingStatus(id, newStatus) {
            if (db && typeof id === 'number') {
                const { error } = await db.from('bookings').update({ status: newStatus }).eq('id', id);
                if (error) {
                    await showCustomAlert({
                        title: "Błąd Bazy Danych",
                        message: "Wystąpił błąd podczas aktualizacji statusu rezerwacji w bazie Supabase.",
                        type: 'error'
                    });
                    console.error("Error updating status:", error);
                    return;
                }
            }

            const target = appBookings.find(b => b.id === id);
            if (target) target.status = newStatus;

            localStorage.setItem('netjes_tattoo_bookings', JSON.stringify(appBookings));
            await fetchAndRenderBookings();
            await renderCalendar();
        }

        async function deleteBooking(id) {
            const confirmed = await showCustomConfirm({
                title: "Usunięcie Rezerwacji",
                message: "Czy na pewno chcesz <strong>trwale usunąć</strong> tę anulowaną rezerwację z bazy danych? Tej operacji nie można cofnąć.",
                confirmText: "Usuń Trwale",
                cancelText: "Anuluj",
                isDestructive: true
            });
            if (!confirmed) return;

            if (db && typeof id === 'number') {
                await db.from('bookings').delete().eq('id', id);
            }

            appBookings = appBookings.filter(b => b.id !== id);
            localStorage.setItem('netjes_tattoo_bookings', JSON.stringify(appBookings));
            await fetchAndRenderBookings();
            await renderCalendar();
        }

        /* ==========================================================================
           ANIMACJA PŁYWAJĄCYCH ZŁOTYCH ORBÓW W TLE (CANVAS BACKGROUND)
           ========================================================================== */
        function initAmbientOrbs() {
            const canvas = document.getElementById('ambient-canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let width = 0;
            let height = 0;

            // Paleta subtelnych, eleganckich złotych i ciepłych odcieni
            const orbColors = [
                { r: 197, g: 160, b: 89, a: 0.18 },   // Gold DEFAULT (#C5A059)
                { r: 230, g: 200, b: 148, a: 0.14 },  // Gold Light (#E6C894)
                { r: 154, g: 123, b: 62, a: 0.16 },   // Gold Dark (#9A7B3E)
                { r: 212, g: 175, b: 55, a: 0.15 },   // Warm Gold Glow
                { r: 180, g: 140, b: 70, a: 0.13 },   // Champagne Gold
                { r: 220, g: 180, b: 100, a: 0.12 }   // Soft Aura
            ];

            let orbs = [];
            const mouse = {
                x: -1000,
                y: -1000,
                targetX: -1000,
                targetY: -1000,
                active: false,
                lastMove: 0
            };

            function getBaseRadius() {
                return Math.max(180, Math.min(width, height) * 0.35);
            }

            function createOrbs() {
                orbs = [];
                const baseRadius = getBaseRadius();
                const orbCount = width < 768 ? 4 : 6;

                for (let i = 0; i < orbCount; i++) {
                    const color = orbColors[i % orbColors.length];
                    const sizeScale = 0.8 + Math.random() * 0.6;
                    
                    orbs.push({
                        anchorX: Math.random() * width,
                        anchorY: Math.random() * height,
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: 0,
                        vy: 0,
                        sizeScale: sizeScale,
                        radius: baseRadius * sizeScale,
                        color: color,
                        phaseX: Math.random() * Math.PI * 2,
                        phaseY: Math.random() * Math.PI * 2,
                        speedX: 0.00025 + Math.random() * 0.00035,
                        speedY: 0.00025 + Math.random() * 0.00035,
                        ampX: 80 + Math.random() * 120,
                        ampY: 70 + Math.random() * 100,
                        driftX: (Math.random() - 0.5) * 0.25,
                        driftY: (Math.random() - 0.5) * 0.25
                    });
                }
            }

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;

                if (orbs.length === 0) {
                    createOrbs();
                } else {
                    const baseRadius = getBaseRadius();
                    orbs.forEach(orb => {
                        orb.radius = baseRadius * orb.sizeScale;
                    });
                }
            }

            // Obsługa ruchu myszy / dotyku
            window.addEventListener('mousemove', (e) => {
                mouse.targetX = e.clientX;
                mouse.targetY = e.clientY;
                mouse.active = true;
                mouse.lastMove = Date.now();
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    mouse.targetX = e.touches[0].clientX;
                    mouse.targetY = e.touches[0].clientY;
                    mouse.active = true;
                    mouse.lastMove = Date.now();
                }
            }, { passive: true });

            window.addEventListener('mouseleave', () => {
                mouse.active = false;
            });

            let lastTime = performance.now();

            function animate(time) {
                const dt = Math.min(50, time - lastTime);
                lastTime = time;

                if (mouse.active) {
                    mouse.x += (mouse.targetX - mouse.x) * 0.15;
                    mouse.y += (mouse.targetY - mouse.y) * 0.15;

                    if (Date.now() - mouse.lastMove > 2500) {
                        mouse.active = false;
                    }
                }

                ctx.clearRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'screen';

                for (let i = 0; i < orbs.length; i++) {
                    const orb = orbs[i];

                    // Płynny dryf kotwicy po ekranie
                    orb.anchorX += orb.driftX * (dt * 0.06);
                    orb.anchorY += orb.driftY * (dt * 0.06);

                    const margin = orb.radius * 0.8;
                    if (orb.anchorX < -margin) orb.anchorX = width + margin;
                    if (orb.anchorX > width + margin) orb.anchorX = -margin;
                    if (orb.anchorY < -margin) orb.anchorY = height + margin;
                    if (orb.anchorY > height + margin) orb.anchorY = -margin;

                    // Docelowa pozycja harmoniczna (delikatne pływanie)
                    const targetX = orb.anchorX + Math.sin(time * orb.speedX + orb.phaseX) * orb.ampX;
                    const targetY = orb.anchorY + Math.cos(time * orb.speedY + orb.phaseY) * orb.ampY;

                    // Odpychanie i rozpraszanie przez kursor
                    if (mouse.active) {
                        const dx = orb.x - mouse.x;
                        const dy = orb.y - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const repelRadius = orb.radius * 0.85 + 130;

                        if (dist < repelRadius && dist > 1) {
                            const force = Math.pow(1 - (dist / repelRadius), 1.8) * 4.5;
                            const angle = Math.atan2(dy, dx);
                            orb.vx += Math.cos(angle) * force;
                            orb.vy += Math.sin(angle) * force;
                        }
                    }

                    orb.vx *= 0.93;
                    orb.vy *= 0.93;

                    orb.x += (targetX - orb.x) * 0.035 + orb.vx;
                    orb.y += (targetY - orb.y) * 0.035 + orb.vy;

                    // Rysowanie miękkiego rozmytego gradientu
                    const gradient = ctx.createRadialGradient(
                        orb.x, orb.y, 0,
                        orb.x, orb.y, orb.radius
                    );

                    const c = orb.color;
                    gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 1.0})`);
                    gradient.addColorStop(0.35, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.65})`);
                    gradient.addColorStop(0.7, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.25})`);
                    gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                    ctx.fill();
                }

                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', resize);
            resize();
            requestAnimationFrame(animate);
        }

        window.addEventListener('hashchange', checkHashRoute);
        window.addEventListener('DOMContentLoaded', () => {
            initAmbientOrbs();
            checkHashRoute();
            const savedLang = localStorage.getItem('netjes_language');
            if (savedLang && translations[savedLang]) {
                const modal = document.getElementById('language-modal');
                if (modal) modal.style.display = 'none';
                document.documentElement.classList.add('has-lang');
                setLanguage(savedLang, true);
            } else {
                // Nowy użytkownik - modal pozostaje widoczny, nie zapisujemy wyboru
                document.documentElement.classList.remove('has-lang');
                const modal = document.getElementById('language-modal');
                if (modal) modal.style.display = 'flex';
                setLanguage('pl', false);
            }

            // Automatyczne czyszczenie błędów walidacji podczas wpisywania
            const emailInput = document.getElementById('input-client-email');
            const phoneInput = document.getElementById('input-client-phone');
            const emailErrorEl = document.getElementById('email-error-msg');
            const phoneErrorEl = document.getElementById('phone-error-msg');

            if (emailInput) {
                emailInput.addEventListener('input', () => {
                    emailInput.classList.remove('border-red-500');
                    if (emailErrorEl) emailErrorEl.classList.add('hidden');
                });
            }

            if (phoneInput) {
                phoneInput.addEventListener('input', () => {
                    phoneInput.classList.remove('border-red-500');
                    if (phoneErrorEl) phoneErrorEl.classList.add('hidden');
                });
            }
        });
        window.addEventListener('load', () => {
            updateLanguageSwitchThumb(currentLang);
        });
        window.addEventListener('resize', () => {
            updateLanguageSwitchThumb(currentLang);
        });
