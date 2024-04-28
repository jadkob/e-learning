-- AlterSequence
ALTER SEQUENCE "Course_id_seq" MAXVALUE 9223372036854775807;

-- CreateTable
CREATE TABLE "Review" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "authorId" INT4 NOT NULL,
    "titlle" STRING NOT NULL,
    "text" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courseId" INT4 NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
