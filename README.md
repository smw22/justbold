# Project 🧭 🚨

Semester Project - Lineup
[DEPLOYED LØSNING HER](https://lineup-frontend.onrender.com)

# Design 🎨 ⚠️

Design lavet af Multimediedesign studerende, venligt overlevert så vi har noget at udvikle 🎉

Link til: [Figma](https://www.figma.com/design/aX1bEPNGfhzCUKHQFK9nTf/LineUp---WU-E25a-Semesterprojekt--Copy-?node-id=61-17&t=GXVjUke9gB9O5UUA-1)

# Teknologier / Dev Stack 🛠️ ⚠️

Arkitektur: Monorepo med backend og frontend som separate apps. Backend kører NestJS i modulær opbygning (controllers/services/guards), eksponerer REST endpoints og bruger JWT-baseret auth. Frontend kører Vite/React med React Router til klientrouting, og henter data direkte mod API'et via fetch/HTTP-klient. Ingen deployment endnu; lokal udvikling kører separat for klient og server.

- Backend: NestJS (TypeScript) i moduler med controllers/services/DTO'er, REST endpoints og JWT auth.
- Frontend: React + Vite (TypeScript) med React Router til routing og datafetch mod API'et.
- Database: MySQL kører separat instans; vi seeder testdata fra seed-scripts for lokal udvikling/test.
- Infrastruktur/hosting: Ikke endnu (opdateres når deployment er klar).

# Features 💡⚠️

Vi har opdelt arbejdet i store "Milestones" fra vores projektboard, hvor hver milestone repræsenterer en sektion af appen (f.eks. profil, services, samarbejder osv.).
Hver milestone har haft én ansvarlig udvikler, der har arbejdet på den pågældende sektion og haft ansvaret for, at den fungerer korrekt og indeholder de nødvendige funktionaliteter.

Skabelon (udfyld for hver milestone):

- Milestone: services sektion
  - Ansvarlig udvikler: Sergio
  - Primært features:
    - Services-liste (med pagination og søgefunktioner)
    - Services-preview (med anmeldelser)
    - Opret services
  - Kort beskrivelse: I denne milestone er både backend og frontend funktionalitet blevet implementeret for at vise alle services med deres detaljer og for at skabe nye services.
  - Branches:
    - Services-pages-step-0
    - Services-pages-step-1
    - Services-pages-step-2
    - Services-pages-step-3
  - Status/notes: _eventuelle kommentarer_

## Implementeret ✅ 🚨

-

## Manglende ⏳ ⚠️

Features Eventuelle kendte issues eller manglende features (udfyld her)

### Filter muligheder

- Filter på Services er ikke implementeret
- Filter på Collaborations er ikke implemeneteret

### Menu punkter i burger menu

- Punkter med "Coming Soon" badge, er ikke udviklet

### Notifikationer

- Design implementeret
- Intet backend funktionalitet lavet.

### Stories

- Visning på homepage er der, men der er ikke noget backend funktionalitet.

### Profil

- "Artists I Like" er ikke lavet med dynamisk indhold. Det har været uklart, om der er tale om kunstnere på LineUp, eller om tanken har været at hente artister gennem f.eks. Spotify API.
- "Past collaborations" er ikke lavet med dynamisk indhold.
- På "edit profile"-siden er det i skrivende stund ikke muligt at ændre sit profilbillede.

# Beslutninger ud over designet ✏️ 🚨

En liste og kort beskrivelse af eventuelle ekstra features eller innovationer, I har tilføjet ud over kravene

En liste og kort beskrivelse af de områder, hvor I har truffet design-beslutninger der supplerer (eller afviger fra) Figma-designet, og begrundelserne for disse beslutninger

# Projektstyring 📌 ⚠️

Et fungerende link til jeres primære project board (eller et screenshot, hvis ikke det er offentligt tilgængeligt)

Fungerende links til:
https://github.com/orgs/eaaa-dob-wu-e25a/projects/14
<img width="1907" height="862" alt="kanban-justbold" src="https://github.com/user-attachments/assets/13e63d39-884a-4aa3-bb8b-16f27aa9c853" />


# Links 🔗 ⚠️

- Til den deployede løsning (backend og frontend)
  - [Frontend](https://lineup-frontend.onrender.com)
  - [Backend](https://sem-proj-just-bold.onrender.com)
- Et eksempel på et af jeres GitHub issues, der illustrerer analyse og planlægning af en feature eller user story
- Et eksempel på et af jeres pull requests, der viser konstruktiv feedback og forbedringer på en feature

# Database ⚠️
Et diagram over jeres databasestruktur (ER-diagram eller lignende) (samt en kort beskrivelse af jeres datamodellering og relevante overvejelser (og eventuelle fortrydelser)?)
<img width="1303" height="926" alt="Screenshot 2025-12-15 at 13 44 58" src="https://github.com/user-attachments/assets/38af03d0-69aa-4c5a-b5ec-b49a5318105c" />


# Login-informationer 🔐 ⚠️

Til testbrugere (hvis relevant)

- Test: test@user.com // admin

# Post-mortem 📝 🚨

En kort opsummering og refleksion over hvad har fungeret godt i projektet, og hvad I ville gøre anderledes hvis I skulle lave projektet igen — både i forhold til tekniske valg, samarbejde og projektstyring."

# Emoji description: ✅

- 🚨 = ikke kigget på
- ⚠️ = Startet
- ✅ = Umiddelbart udfyldt
