-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "photo" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "creator_id" VARCHAR(255),
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "user_id" VARCHAR(255) NOT NULL,
    "category_id" INTEGER,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "parent_comment_id" INTEGER,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_likes" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "blog_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_views" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "view_date" DATE NOT NULL DEFAULT ((CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date),

    CONSTRAINT "blog_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favourites" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blog_id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "categories_creator_id_idx" ON "categories"("creator_id");

-- CreateIndex
CREATE INDEX "blogs_user_id_idx" ON "blogs"("user_id");

-- CreateIndex
CREATE INDEX "blogs_category_id_idx" ON "blogs"("category_id");

-- CreateIndex
CREATE INDEX "blogs_created_at_id_idx" ON "blogs"("created_at", "id");

-- CreateIndex
CREATE INDEX "comments_blog_id_created_at_idx" ON "comments"("blog_id", "created_at");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_parent_comment_id_idx" ON "comments"("parent_comment_id");

-- CreateIndex
CREATE INDEX "comment_likes_user_id_idx" ON "comment_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_likes_comment_id_user_id_key" ON "comment_likes"("comment_id", "user_id");

-- CreateIndex
CREATE INDEX "blog_likes_user_id_idx" ON "blog_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_likes_blog_id_user_id_key" ON "blog_likes"("blog_id", "user_id");

-- CreateIndex
CREATE INDEX "blog_views_blog_id_user_id_view_date_idx" ON "blog_views"("blog_id", "user_id", "view_date");

-- CreateIndex
CREATE INDEX "blog_views_user_id_idx" ON "blog_views"("user_id");

-- CreateIndex
CREATE INDEX "favourites_blog_id_idx" ON "favourites"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "favourites_user_id_blog_id_key" ON "favourites"("user_id", "blog_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_likes" ADD CONSTRAINT "blog_likes_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_likes" ADD CONSTRAINT "blog_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_views" ADD CONSTRAINT "blog_views_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_views" ADD CONSTRAINT "blog_views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favourites" ADD CONSTRAINT "favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
