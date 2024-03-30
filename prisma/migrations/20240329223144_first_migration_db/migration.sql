-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "login" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "id_usuario" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "gifUrl" VARCHAR,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "data_exclusao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_ficha" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_usuario" TEXT,
    "data_exclusao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria_Exercicio" (
    "id_categoria" TEXT NOT NULL,
    "id_exercicio" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,

    CONSTRAINT "Categoria_Exercicio_pkey" PRIMARY KEY ("id_categoria","id_exercicio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_login_key" ON "Aluno"("login");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_id_ficha_fkey" FOREIGN KEY ("id_ficha") REFERENCES "Ficha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Exercicio" ADD CONSTRAINT "Categoria_Exercicio_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Exercicio" ADD CONSTRAINT "Categoria_Exercicio_id_exercicio_fkey" FOREIGN KEY ("id_exercicio") REFERENCES "Exercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
