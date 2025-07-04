CREATE TABLE "short_urls" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"short_url" text NOT NULL,
	"clicks" integer DEFAULT 0,
	"remote_key" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "short_urls_remote_key_unique" UNIQUE("remote_key")
);
