-- CreateTable
CREATE TABLE "seller_profiles" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seller_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "seller_profilesId" TEXT,
    "name" TEXT NOT NULL,
    "descritpion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seller_profiles_store_name_key" ON "seller_profiles"("store_name");

-- AddForeignKey
ALTER TABLE "seller_profiles" ADD CONSTRAINT "seller_profiles_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_seller_profilesId_fkey" FOREIGN KEY ("seller_profilesId") REFERENCES "seller_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
