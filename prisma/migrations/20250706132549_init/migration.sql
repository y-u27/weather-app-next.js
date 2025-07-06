-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
