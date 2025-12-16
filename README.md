# Project 🧭 🚨

Semester Project - Lineup
[DEPLOYED LØSNING HER](https://lineup-frontend.onrender.com)

# Design 🎨 ⚠️

Design lavet af Multimediedesign studerende, venligt overlevert så vi har noget at udvikle 🎉

Link til: [Figma](https://www.figma.com/design/aX1bEPNGfhzCUKHQFK9nTf/LineUp---WU-E25a-Semesterprojekt--Copy-?node-id=61-17&t=GXVjUke9gB9O5UUA-1)

# Teknologier / Dev Stack 🛠️ ⚠️

Vi har valgt at bruge React Router i framework mode, som er valgt mest fordi vi ikke har prøvet så mange andre React frameworks dermed valgt at blive i vores comfort zone. For at prøve lidt noget nyt, uden at gå alt for langt væk fra Express, så kastede vi os ud i at bruge NestJS i backend, hvilket har hjulpet os lidt til at holde en mere fastlåst struktur fordi at Nest er forholdvist opinionated.

Den primære årsag til at vi har valgt en MySQL database i stedet for Supabase er for at undgå de gratis limitations som Supabase har.

- Backend: NestJS (TypeScript)
- Frontend: React Router (Typescript) i Framework SPA mode.
- Database: MySQL (Hosted på Simply)
- Deployment: Render, frontend som static site og backend som node server

# Features 💡⚠️ (Punkt 4 + 5)

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

# Design - Valg / Afvigelser ✏️ 🚨 (Punkt 6 + 7)

En liste og kort beskrivelse af eventuelle ekstra features eller innovationer, I har tilføjet ud over kravene

En liste og kort beskrivelse af de områder, hvor I har truffet design-beslutninger der supplerer (eller afviger fra) Figma-designet, og begrundelserne for disse beslutninger

# Projektstyring 📌 ⚠️

Et fungerende link til jeres primære project board (eller et screenshot, hvis ikke det er offentligt tilgængeligt)

Fungerende links til:
https://github.com/orgs/eaaa-dob-wu-e25a/projects/14
<img width="1907" height="862" alt="kanban-justbold" src="https://github.com/user-attachments/assets/13e63d39-884a-4aa3-bb8b-16f27aa9c853" />

# Links 🔗 ⚠️

- [Frontend](https://lineup-frontend.onrender.com) (https://lineup-frontend.onrender.com)
- [Backend](https://sem-proj-just-bold.onrender.com) (https://sem-proj-just-bold.onrender.com)

- [Issue](https://github.com/orgs/eaaa-dob-wu-e25a/projects/14/views/1?filterQuery=profile&pane=issue&itemId=139948823&issue=eaaa-dob-wu-e25a%7Csem-proj-just-bold%7C16) (Page: Profile)
  - Denne issue er fint indelt i flere sub issues, for at give et umiddelbart godt overblik over de features som opgaven infholder)
  - Det skal dog siges at vi primært har brugt issues til projektstyring, og ikke oprettet branches eller pull requests direkte fra et issue.

- [Pull Request](https://github.com/eaaa-dob-wu-e25a/sem-proj-just-bold/pull/123) (Chat Page Step 1)
  - Her er et eksempel på en af de størrer features som er blevet implementeret. Den er gennemgået i 3 steps. Først har vi sat Copilot på til at lave det første review, herefter er Copilot suggestions blevet gået igennem og rettet og til sidst har vi så gennemgået det med menneskelige øjne.

# Database ⚠️

Vi har prøvet at ramme 3 normalform med vores databasestruktur, det har vi gjort ved at bruge jointables på data hvor som har many to many relationships.

Som test data har vi lavet seeders på det meste af vores data, så vi har haft mulighed for at indsætte en masse test data og dermed haft bedre mulighed for at test større mængder af data.

En udfordring vi har bakset lidt med er at vi har valgt alle sammen at være connected til vores "live" database mens vi har udviklet. Det har betydet, at når én udvikler har ændret databaseskemaet via koden, har ORM'en forventet tilsvarende ændringer hos alle. Hvis ikke alle har haft opdateret kodebase, har det ført til fejl på de individuelle branches.

<img width="1303" height="926" alt="Screenshot 2025-12-15 at 13 44 58" src="https://github.com/user-attachments/assets/38af03d0-69aa-4c5a-b5ec-b49a5318105c" />

# Login-informationer 🔐 ⚠️

Til testbrugere (hvis relevant)

- Awesome
  - User: test@user.com
  - Pass: admin
- Avicii:
  - User: avicii@email.com
  - Pass: 12345678

(Det er også muligt at oprette en bruger igenem [registration flow](https://lineup-frontend.onrender.com/onboarding) som man kan bruge.)

# Post-mortem 📝 🚨

En kort opsummering og refleksion over hvad har fungeret godt i projektet, og hvad I ville gøre anderledes hvis I skulle lave projektet igen — både i forhold til tekniske valg, samarbejde og projektstyring."

# Emoji description: ✅

- 🚨 = ikke kigget på
- ⚠️ = Startet
- ✅ = Umiddelbart udfyldt
