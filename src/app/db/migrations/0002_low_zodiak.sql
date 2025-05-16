ALTER TABLE "todos" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "done" SET DATA TYPE boolean USING CASE WHEN done = 0 THEN false WHEN done > 0 THEN true ELSE false END;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "done" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "done" SET DEFAULT false;