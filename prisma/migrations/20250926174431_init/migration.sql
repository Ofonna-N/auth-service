/*
  Warnings:

  - Added the required column `secretHash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "secretHash" BYTEA NOT NULL;
