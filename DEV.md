## Dependências
Sempre que precisar adicionar um novo pacote, instale-o na sua máquina e, para que as mudanças sejam refletidas, execute o container novamente sem a flag `--build`.

## Migrations
Nosso projeto é baseado no prisma, portanto, sempre que atualizarmos o `schema.prisma` é necessário fazer a migration na sua máquina local e no docker, portanto, para isso:

Na seu terminal:

1. `yarn prisma migrate dev --name "<Nome da migration>"` Isso irá rodar a migration localmente
2. `yarn docker:migrate` Isso irá rodar a migration no docker

Caso queira resetar as migrations (e o banco de dados), basta:

1. `yarn prisma migrate reset` Isso irá resetar localmente
2. `yarn docker:reset` Isso irá resetar no docker

E por fim, para acessar um visualizador rápido do banco use:

`yarn docker:studio` Isso irá abrir o prisma studio no container e via porta, irá abrir no seu localhost também