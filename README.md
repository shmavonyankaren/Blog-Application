# BlogSpace

Next.js 16 App Router, React 19, Clerk, UploadThing and Resend, with Prisma ORM **7.10.1** and Prisma Postgres. Historical Aiven records are unavailable and are not recreated. `setup-database.sql` is legacy reference material only; `prisma/schema.prisma` and committed migrations define the new database.

## Local setup

Use Node **22.12+ on the 22.x line** (Vercel: Node 22.x) and npm. Prisma CLI, Client and PostgreSQL adapter are pinned together. Do not install unqualified Prisma latest: Prisma 8 uses different tooling.

1. Copy `.env.example` to `.env.local` only if you do not already have that file. Merge missing names manually when it exists. Never commit credentials.
2. Obtain an isolated development database and development Clerk/UploadThing/Resend configuration. Do not point local development or preview deployments at production.
3. Set `DATABASE_URL` to the direct PostgreSQL URL and `DATABASE_URL_POOLED` to the pooled URL. The app deliberately does not silently fall back to the direct URL. On a local PostgreSQL server both variables may use the same local URL.
4. Run the following only after confirming that the configured database is the intended development database:

```sh
npm ci
npm run db:validate
npm run db:deploy
npm run db:seed
npm run dev
```

`npm ci` generates Prisma Client automatically. No install/build script migrates or seeds a database. Prisma configuration and the seed load `.env.local`, then `.env`, without overriding variables already supplied by the environment. Next.js loads its normal environment files.

## Environment variables

| Name | Purpose / format | Environment |
| --- | --- | --- |
| `DATABASE_URL` | Direct `postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require` | Development and explicitly authorized migration/seed jobs |
| `DATABASE_URL_POOLED` | Pooled PostgreSQL URL, normally host `pooled.db.prisma.io` | Every application runtime |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (`pk_test_...` / `pk_live_...`) | Build and runtime; matching Clerk instance |
| `CLERK_SECRET_KEY` | Clerk server secret (`sk_test_...` / `sk_live_...`) | Server runtime |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Endpoint signing secret (`whsec_...`) | Webhook runtime |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | Build/runtime |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` | Build/runtime |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/my-blogs` | Build/runtime |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/my-blogs` | Build/runtime |
| `UPLOADTHING_TOKEN` | UploadThing-issued token | Server runtime |
| `RESEND_EMAIL_API_KEY` | Resend-issued API key | Server runtime |

The current Prisma Vercel integration also supplies `POSTGRES_URL` and `PRISMA_DATABASE_URL` as direct-URL aliases. This application does not read those aliases. Verify URLs in the dashboard: names alone do not prove that an older integration is configured correctly. Existing `MYSQL_*` values are unused and can be removed after verification.

## Schema and deletion policy

Eight models map to the original snake_case tables: User/users, Category/categories, Blog/blogs, Comment/comments, CommentLike/comment_likes, BlogLike/blog_likes, BlogView/blog_views, Favourite/favourites. Each retains its integer primary key. All author and interaction relations reference the unique **users.user_id (Clerk string ID)**, never users.id.

- User deletion cascades authored blogs, authored comments, likes, views and favourites. Deleting one of that user's comments also deletes its descendants, including replies by other authors; this follows the chosen whole-thread deletion policy.
- Blog deletion cascades comments/replies and every associated interaction.
- Comment deletion cascades descendants and comment likes.
- Category deletion clears blogs.category_id; creator deletion clears categories.creator_id and preserves the category.
- Default categories are creatorless and cannot be modified/deleted by ordinary users. Category names retain ordinary case-sensitive PostgreSQL uniqueness; blog text search is case-insensitive.
- Creation/modification fields are nonnull timestamptz. Prisma maintains updated_at for ORM writes. Manual SQL writes must maintain it themselves.
- View dates are UTC calendar dates. A transaction locks the blog row before counting/inserting views, enforcing at most three per signed-in user/blog/day through the action. This intentionally serializes views per blog, trading throughput for a simple reliable free-tier implementation. Each invocation represents one view, up to the cap; no new request-token tracking is introduced.
- Parent comment/blog consistency is checked before replies are inserted. Parent IDs and author IDs cannot be edited through actions.

Only the eight original category names are seeded. Seeding uses duplicate-safe inserts and does not overwrite existing categories or create fictional content.

## Authentication and integrations

Mutations derive identity from Clerk on the server. Ownership is included in update/delete predicates; bulk operations are scoped to the authenticated account. Public profile responses exclude email. Personal favourites/like-status/view-history reads require the matching session.

Existing Clerk users recover missing profiles from the verified Clerk API on their first mutation or own profile/blog listing. Webhook create/update events fetch current Clerk state and upsert the mirror, including email; repeated deletions are safe. Raw request bytes are verified with Svix before processing. There is no custom local-ID metadata dependency. A delayed update for an already deleted Clerk account removes the local mirror rather than recreating it. Webhook/API failures return errors so delivery can retry.

Clerk remains authoritative. Browser-callable profile create/update functions ignore submitted profile fields. Configure `/api/webhooks/clerk` for user.created, user.updated and user.deleted in each environment's Clerk instance. For local webhook testing use your own tunnel URL; do not reuse the historical README tunnel.

UploadThing requires successful authentication and stores external URLs, not file contents. Configure its application for the deployment origin. Existing images remain URLs; deleting a post does not delete external files. Resend contact submission is awaited and remains public. The existing fixed sender/recipient in `lib/utils/sendEmail.ts` is unchanged; verify it for your account before launch.

## Prisma commands and migration workflow

```sh
npm run db:generate       # offline client generation
npm run db:validate       # offline schema validation
npm run db:deploy         # apply committed migrations to configured direct URL
npm run db:seed           # seed categories, explicitly and idempotently
npm run db:studio         # inspect configured database
npm run db:migrate -- --name describe_change
```

Use `db:migrate` only on an isolated development database; migration development may need a shadow database/creation privileges. Commit reviewed migration files. For the initial empty database, `db:deploy` applies the existing initial migration without a shadow database. Never run migrate reset or db push against production. The initial SQL was generated offline using:

```sh
npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script --output prisma/migrations/20261112000000_initial/migration.sql
```

## Vercel setup and release order (manual)

1. In Vercel Storage/Marketplace choose Prisma Postgres, the **Free** plan, and a region near your function region. Confirm current allowances and select the free plan explicitly.
2. Connect a development/preview database to Development and Preview only. Create/connect a separate production database to Production only. Do not accept a shared production database for every environment by accident.
3. Verify direct `DATABASE_URL` and pooled `DATABASE_URL_POOLED` for each scope. Older integrations may require adding the pooled variable manually. Preserve TLS verification.
4. Set Node 22.x; install with `npm ci`; build with `npm run build`. Ensure development dependencies are installed during builds so the pinned Prisma CLI exists.
5. Set matching Clerk, UploadThing and Resend variables. Configure webhook endpoints and signing secrets for each deployment environment.
6. In an authorized shell targeting the isolated preview database, run `npm ci`, `npm run db:deploy`, and `npm run db:seed`. Deploy a preview through Vercel and perform the checklist below.
7. Only after preview verification and explicit production authorization, target the production **direct** URL and run `npm run db:deploy`, then `npm run db:seed`. Deploy the approved application through Vercel. Environment changes require a new deployment.
8. Verify production sign-in/profile recovery, reads and a controlled write. Remove obsolete MySQL environment names after successful cutover.

Do not put migrations/seeding in Vercel's build command: builds and previews must not unexpectedly modify production. Runtime uses a reused server-only Prisma client and a small driver pool (3 connections per process), with acquisition and idle timeouts. Database pages are dynamic; static pages/builds do not require a live database.

## Validation and release checklist

Offline checks:

```sh
npm run db:generate
npm run db:validate
npm test
npm run typecheck
npm run lint
npm run build
```

The tests isolate actual action modules with mocked services and cover identity spoofing, unauthorized access, ownership predicates, profile reconstruction and UTC formatting. They are **not database integration tests**.

Before production, on an explicitly authorized isolated database verify initial migration, repeat seeds, existing/new Clerk accounts and webhook retries, blog/category CRUD, nested replies and same-blog parent checks, repeated likes/favourites, concurrent view requests and UTC rollover, all cascades, search/sorts/page boundaries, empty states, upload authentication, email delivery and database-unavailable error pages. Test simultaneous view calls from multiple connections: no user/blog/date group may exceed three rows. Confirm direct and pooled endpoints actually work and previews cannot access production.

## Troubleshooting and backups

- Missing pooled configuration: set `DATABASE_URL_POOLED`; do not substitute an unverified direct production URL.
- Missing tables: apply the committed migration to the intended database; never run the legacy MySQL SQL.
- Missing generated client: run `npm run db:generate`; do not upgrade the Prisma major version to fix it.
- Foreign-key/profile errors: verify the Clerk instance/secret, profile recovery and webhook delivery. Do not disable constraints.
- Connection exhaustion/timeouts: verify pooled host, TLS and region; review query volume before increasing the local pool.
- Missing uploaded images: allow the actual UploadThing host (utfs.io and *.ufs.sh are configured).
- Empty data is expected after reconstruction. Database outages should produce error states, not fabricated content or false 404s.
- Free-plan daily backup service is not included. Arrange periodic encrypted PostgreSQL exports with `pg_dump` using a direct connection and test restoration to a separate database. Keep backups outside this repository, with restricted access and a retention policy. No backup or restore command runs automatically.

References: [Prisma ORM 7 setup](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7), [Vercel integration](https://www.prisma.io/docs/guides/postgres/vercel), [pricing](https://www.prisma.io/pricing).

## Migration validation record

Offline implementation checks passed: Prisma generation and schema validation, TypeScript, nine isolated action/helper tests, and a Next.js production build with both database URLs overridden to an unavailable localhost endpoint. ESLint reports zero errors and two existing unused-symbol warnings in `CategoryItem.tsx`. No cloud database, migration, seed, deployment or external configuration operation was performed.

`npm audit` reports 29 findings (1 low, 7 moderate, 18 high, 3 critical), including the existing Next.js/Clerk stack. Resolve applicable dependency advisories in a separately reviewed update before production. Unrelated dependencies were not upgraded automatically. `mysql2` is no longer a direct dependency or application import; Prisma CLI 7.10.1 itself retains a transitive development dependency on it.

Status: ready for database provisioning and subsequent isolated preview testing, **not production-approved**. Live database behavior and deployed integrations remain unverified.
