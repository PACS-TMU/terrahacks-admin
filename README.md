# TerraHacks Admin Dashboard
Manage applicants here!

## Setup
1. Clone the repository.
```bash
git clone https://github.com/pacs-tmu/terrahacks-admin.git
cd terrahacks-admin
ls -la
```
2. Create a `.env` file in the root directory
```bash
touch .env.local
```
Paste the following into the `.env.local` file and fill in the values.
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
3. Install dependencies and start development server.
```bash
npm install
npm run dev
```
