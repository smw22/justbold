# Project

Semester Project - Lineup
[DEPLOYED LØSNING HER](https://lineup-frontend.onrender.com)

# Design

Design lavet af Multimediedesign studerende, venligt overleveret så vi har noget at udvikle 🎉

Link til: [Figma](https://www.figma.com/design/aX1bEPNGfhzCUKHQFK9nTf/LineUp---WU-E25a-Semesterprojekt--Copy-?node-id=61-17&t=GXVjUke9gB9O5UUA-1)

# Teknologier / Dev Stack 🛠️

Vi har valgt at bruge React Router i framework mode. Vi har ikke prøvet så mange andre React frameworks, så vi har valgt at blive i vores comfort zone. For alligevel at prøve noget lidt nyt, der ikke er for langt fra Express, har vi kastet os ud i at bruge NestJS i backend. Det har hjulpet os til at holde en mere fastlåst struktur fordi at Nest er forholdvist opinionated.

Den primære årsag til, at vi har valgt en MySQL database i stedet for Supabase, er for at undgå de limitations som en gratis Supabase-løsning har.

- Backend: NestJS (TypeScript).
- Frontend: React Router (TypeScript) i Framework SPA mode.
- Database: MySQL (Hosted på Simply).
- Deployment: Render, frontend som static site og backend som node server.

# Features 💡

Generelt har opgaverne været struktureret sådan, at den primære udvikler har været ansvarlig for at lave både de nødvendige API endpoints samt frontend dertil.

## Implementeret

Navnet i parantes, er den udvikler, som har haft primært ansvar for opgaven.

**Posts (Benjamin)**

- Feed på Home og Profile, samt enkelt visning a post.

**Collaborations (Benjamin)**

- Slider/Feed på home, Generelt collaborations feed og visning af en collaboration.

**Services (Sergio)**

- Services-liste (med pagination og søgefunktioner).
- Services-preview (med anmeldelser).
- Opret services.

**Chat (Sergio)**

- Threads-liste, både til 1:1 samt grupper.
- Chat Preview (1:1 og grupper).
- Skrive beskeder.
- Opret chats direkte fra collaborations, services og profile.

**Profile (Jacob)**

- Profile view.
- Differentiering på om man ser current user eller en anden bruger.
- Redigering af profil.
- Opret og besvare spørgsmål til en bruger.
- Embedded Spotify-player & YouTube-video.

**Onboarding / Login (Dennis)**

- Onboarding flow til registrering af ny bruger.
- Login.

**Connections (Dennis)**

- Ansøge en user om at connecte.
- Acceptere en connection request.
- Visning af connection requests i notifications.
- Tilføj en user, man er connected til, på posts og collaborations.
- Vise flere connected users på posts og collaborations.

**Likes (Jacob + Benjamin)**

- Mulighed for at like posts.
- Mulighed for at like comments.

**Comments (Jacob + Benjamin)**

- Kommenter på et post.
- Svar på en kommentar (Nested comments).

**Search (Dennis)**

- Søg på alt.
- Søg på People.
- Søg på Collaborations.
- Søg på Services.
- Søg på Tags (Søger i collaborations og posts).

## Manglende

**Stories**

- Vises lige nu som statisk data i frontend. Der er intet oprettet til stories.

**Saved / Favorites**

- Ikke implementeret.
- Gælder posts, collaborations og services.

**Chat**

- Man kan ikke selv oprette en gruppe chat.
- Man kan ikke søge efter en chat.
- Man kan ikke redigere chattens navn.
- Man kan ikke se en liste og hvilke users, der er connected til chatten.

**Notifications**

- Design implementeret.
- Menupunktet viser ikke, at der er en ny notifikation.
- Det meste backend funktionalitet mangler.
- Connections er dynamisk og kan bruges at acceptere connection requests.

**Filtrering**

- Filter på Services er ikke implementeret.
- Filter på Collaborations er ikke implemeneteret.

**Tags, Genre og Skills**

- Mangler mulighed for at man kan tilføje sine egne / oprette nye. API Endpoints eksisterer, men frontend eksisterer ikke.

**Reviews**

- Backend eksisterer til Reviews på Services og Profile
- Reviews bliver vist i frontend, men man kan ikke lave et review i frontenden.

**Profile**

- "Artists I Like" er ikke lavet med dynamisk indhold. Det har været uklart, om der er tale om kunstnere på LineUp, eller om tanken har været at hente artister gennem f.eks. Spotify API.
- "Past collaborations" er ikke lavet med dynamisk indhold.
- På profile edit er det ikke muligt at ændre sit profilbillede.
- På profile edit er der ingen mulighed for at tilføje eller fjerne blokke (Læs mere ved afvigelser).

**Menupunkter i burger menu**

- Punkter med "Coming Soon" badge er ikke udviklet.

# Design - Valg / Afvigelser

**Generelt styling**

- I designet har det ikke været helt streamlined ift. hvilke afstande, der er brugt rundt omkring. Dette har vi streamlined, samt lavet nogle 1-2px afvigelser, for at passe det ind i Tailwind CSS.
- Der var nogle få steder (f.eks. på knapper) hvor der var bred enighed om, at padding var lige lille nok til en mobil-knap. Så her har vi øget padding en lille smule.
- Når flere users er connected til eksempelvis et post, så har vi streamlined designet (tilføjet en lille hvid ring) så det matcher designet som er på profile.
  
**Menu**
- Pga. af uklarheder omkring tab baren (nogle steder i Figma er venstre tab "Home", andre steder er det "Collabs") har vi valgt at flytte "Chats" op i toppen af menuen, for at gøre plads til en "Collabs"-tab.

**Notes → Renamed til Posts**

- Vi synes at notes var lidt forvirrende ift. hvad der var tænkt med dem. De ligner utrolig meget det, der i andre apps ville blive kaldt posts. Derfor har vi valgt at kalde det posts for at øge genkendeligheden for nye users.

**Profile**

- Der var ikke lavet design til visning af "See more" på "Artists i like" og "Past collaborators". Det har vi løst ved at lave et drawer component, der (hvis vi havde implementeret dynamisk content) ville indeholde de fulde lister.
- Når man redigerer sin profilside, har vi valgt at lave det som én stor Form i stedet for at gøre som i Figma-designet, hvor man tilgår redigeringen af hver sektion gennem en ”edit”-knap – en proces, som der ikke er taget højde for, i det overleverede design.

**Posts**

- Når man klikker ind på en post, hvor man kan se alle kommentarerne, har vi lavet en lille afvigelse fra designet. Man kan nemlig se i designet, at det er tænkt at kommentarer skal indenteres mere og mere jo dybere nestet et kommentar-svar er. Men vi har gjort sådan, at kommentarerne højest indenteres én gang (parent comments indenteres ikke – alle andre indenteres ét nyk), for at undgå åbenlyse design- og læsbarhedskomplikationer ved infinite indentation.

**Oprettelsesforms (Create siden):**

- Der var ikke mulighed for at oprette en ny service på "Create"-siden. Så det var vi tilføjet som en mulighed.
- Vi havde designet inputfelter til Profile og Onboarding først. Men på Create-siden ser inputfelter i designet anderledes ud. Så vi valgte at streamline med det, vi allerede havde implementeret.

**Chats**

- Gruppesektionen var ikke tilføjet i designet, så derfor er det blevet lavet på bedste vis, ud fra de designelementer, som var lavet til 1:1 chats.

**Search**

- Konsekvente search overskrifter, f.eks. ‘Recently created users’ og ‘Users’ (alt efter, om der er search query eller ej).

**Reviews**

- Visning af Reviews har vi valgt at vise i en såkaldt "drawer", der slider op fra bunden, for at give det en mere app-like følelse.

**Connections**

- Der var ikke lavet noget pending state på connections i designet. Men det har vi implementeret.

# Projektstyring 📌

Vi har brugt Github Projects.

Link til project board:
https://github.com/orgs/eaaa-dob-wu-e25a/projects/14

Eksempel på hvordan project board har set ud i processen.
<img width="1907" height="862" alt="kanban-justbold" src="https://github.com/user-attachments/assets/13e63d39-884a-4aa3-bb8b-16f27aa9c853" />

# Links

- [Frontend](https://lineup-frontend.onrender.com) (https://lineup-frontend.onrender.com)
- [Backend](https://sem-proj-just-bold.onrender.com) (https://sem-proj-just-bold.onrender.com) (Kan tage et minuts tid om at starte op ved første request)

- [Issue](https://github.com/orgs/eaaa-dob-wu-e25a/projects/14/views/1?filterQuery=profile&pane=issue&itemId=139948823&issue=eaaa-dob-wu-e25a%7Csem-proj-just-bold%7C16) (Page: Profile)
  - Dette issue er fint indelt i flere sub issues, for at give et umiddelbart godt overblik over de features som opgaven indeholder.
  - Det skal dog siges, at vi primært har brugt issues til projektstyring, og ikke oprettet branches eller pull requests direkte fra et issue.

- [Pull Request](https://github.com/eaaa-dob-wu-e25a/sem-proj-just-bold/pull/123) (Chat Page Step 1)
  - Her er et eksempel på en af de større features, der er blevet implementeret. Den er gennemgået i 3 steps. Først har vi sat Copilot på, til at lave det første review. Herefter er Copilot's suggestions blevet gennemgået og rettet. Til sidst har vi gennemgået det med menneskelige øjne 👀.

# Database

Vi har prøvet at opfylde 3. normalform med vores databasestruktur. Det har vi gjort ved at bruge jointables på data, der har relationships.

Som test data har vi lavet seeders på det meste af vores data. På den måde, har vi haft mulighed for at indsætte en masse test data og derved kunne teste større mængder af data i appen.

En udfordring vi har bakset lidt med er, at vi har valgt allesammen at være connected til vores "live"-database, mens vi har udviklet. Det har betydet, at når én udvikler har ændret databaseskemaet via koden, har ORM'en forventet tilsvarende ændringer hos alle. Så hvis ikke alles kodebase har været ajour, har det ført til fejl på de individuelle branches.

<img width="1303" height="926" alt="Screenshot 2025-12-15 at 13 44 58" src="https://github.com/user-attachments/assets/38af03d0-69aa-4c5a-b5ec-b49a5318105c" />

# Login-informationer

- Awesome User:
  - User: test@user.com
  - Pass: admin
- Avicii:
  - User: avicii@email.com
  - Pass: 12345678

(Det er også muligt at oprette en bruger igenem [registration flow](https://lineup-frontend.onrender.com/onboarding) som man kan bruge.)

# Post-mortem

## Opsummering og refleksion

Set i bakspejlet, har der været flere ting, der fungerede godt i projektet – men også områder, hvor vi kunne have grebet det anderledes an.

**Projektstyring:**
Vi kunne have opnået en bedre sammenhæng mellem project board og kode, hvis vi havde brugt issues til direkte at oprette branches og pull requests. Det ville have gjort det lettere at følge opgavernes status og flytte dem mellem de forskellige faser (Ready, In Progress osv.).

**Design og komponentstruktur:**
Hvis vi skulle starte forfra, ville vi bruge mere tid på at analysere designet og identificere de nødvendige komponenter til appen. Selvom vi implementerede alle de komponenter, som blev defineret i Figma-designet, blev vi undervejs opmærksomme på, at vi kunne have lavet flere genanvendelige komponenter (f.eks. AvatarHeader). En mere omhyggelig forberedelse ville have hjulpet os med at skabe en mere ensartet og effektiv frontend.

**Tekniske valg:**
Vi er generelt tilfredse med vores valg af tech stack, især beslutningen om at bruge NestJS til backend. NestJS har en struktureret tilgang til filstruktur, hvilket gjorde det nemmere at holde en fælles struktur i backend-koden. Det gav også mening at blive i Node-miljøet, da Nest bygger oven på Express, hvilket gjorde overgangen lettere.

**Databasestruktur:**
I modsætning til frontend-komponenterne gik vi grundigt til værks med databasestrukturen fra start. Det har givet os et godt overblik og gjort det lettere at planlægge og implementere de nødvendige funktioner, selvom der naturligvis har været justeringer undervejs.

**Testdata og seeders:**
Brugen af seeders til at generere testdata har været en stor fordel. Det har gjort det nemt at teste appen med realistiske datamængder, og selvom det krævede ekstra arbejde, har det været tiden værd.

**Samarbejde:**
Vi har primært arbejdet fysisk sammen, hvilket har gjort det nemt at kommunikere og træffe hurtige beslutninger. Det har fungeret rigtig godt for os, men det har også betydet, at vores pull requests har været mindre detaljerede, da vi i stedet har sparret direkte med hinanden undervejs.

**Hvis vi skulle gøre noget anderledes:**

- Bruge issues mere aktivt til branches og pull requests for bedre sporbarhed.
- Investere mere tid i at planlægge komponentstruktur i frontend.
- Fastholde den grundige tilgang til databasestruktur.
- Overveje at dokumentere beslutninger og processer mere løbende, så det er lettere at følge med for alle.

Samlet set har vi lært meget om både tekniske valg, samarbejde og projektstyring, og vi ville kunne optimere flere processer, hvis vi skulle lave et lignende projekt igen.
