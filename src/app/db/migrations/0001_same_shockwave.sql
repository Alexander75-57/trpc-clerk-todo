ALTER TABLE "user_messages" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "user_messages" CASCADE;--> statement-breakpoint
ALTER TABLE "customers" DROP CONSTRAINT "customers_phone_unique";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "address1";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "address2";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "zip";--> statement-breakpoint
ALTER TABLE "customers" DROP COLUMN "notes";