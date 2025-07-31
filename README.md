# Next.js GraphQL Sequelize Jobboard Starter

Formålet med dette projekt, er først og fremmest at lave et hobby projekt. Projektet laves som et jobboard, hvor det er mening at firmaer kan poste jobs der er rettet udelukkende til nyudannede it folk, da det er utroligt svært som nyudannet software udvikler at få sit først job, så dette problem vil jeg gerne hjælpe med at løse så vidt muligt.

Projeket indeholder følge teknologier.

- Next.js + TypeScript
- GraphQL API med Apollo Server Micro
- Sequelize ORM til PostgreSQL (Supabase)
- React frontend med Apollo Client


## Kom i gang

1. Kopier `.env.example` til `.env.local` og tilføj din Supabase/Postgres database URL:
   ```
   DATABASE_URL="postgres://brugernavn:password@host:5432/database"
   ```

2. Installer afhængigheder:
   ```
   npm install
   ```

3. Kør udviklingsserveren:
   ```
   npm run dev
   ```

4. Åbn frontend:
   ```
   http://localhost:3000
   ```

5. Åbn GraphQL playground:
   ```
   http://localhost:3000/api/graphql
   ```

6. Test mutation via playground:
   ```graphql
   mutation {
     createJob(
       title: "Junior Software Developer"
       description: "Spændende entry-level job for nyuddannet udvikler."
       company: "Tech Firma A/S"
       location: "København"
     ) {
       id
       title
       description
       company
       location
       createdAt
     }
   }
   ```

7. Test query via playground:
   ```graphql
   query {
     jobs {
       id
       title
       description
       company
       location
       createdAt
     }
   }
   ```

## Udvikling

- Backend kører i Next.js API routes med Apollo Server
- Database-adgang via Sequelize
- Brug `.env.local` til dine hemmeligheder

---

