ALTER TABLE "Event"
  ADD COLUMN "galleryImages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "agenda" TEXT,
  ADD COLUMN "requirements" TEXT,
  ADD COLUMN "contactEmail" TEXT,
  ADD COLUMN "venueUrl" TEXT;
