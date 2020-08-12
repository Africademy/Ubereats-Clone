ALTER TABLE "public"."foods" ADD COLUMN "restaurant_uuid" uuid;
ALTER TABLE "public"."foods" ALTER COLUMN "restaurant_uuid" DROP NOT NULL;
ALTER TABLE "public"."foods" ADD CONSTRAINT foods_restaurant_uuid_fkey FOREIGN KEY (restaurant_uuid) REFERENCES "public"."restaurants" (uuid) ON DELETE restrict ON UPDATE restrict;
ALTER TABLE "public"."foods" ALTER COLUMN "restaurant_uuid" SET DEFAULT gen_random_uuid();
