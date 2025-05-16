CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address1" varchar NOT NULL,
	"address2" varchar,
	"city" varchar NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" varchar NOT NULL,
	"notes" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email"),
	CONSTRAINT "customers_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"done" integer,
	"customer_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_messages" (
	"user_id" text PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;