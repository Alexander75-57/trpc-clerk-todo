ALTER TABLE "customers" ADD COLUMN "clerk_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_clerk_id_unique" UNIQUE("clerk_id");