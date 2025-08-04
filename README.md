
<!-- Projeto baseado no gympass-->
<!-- GYMPASS style app -->

<!-- Requisitos Funcionais -->
<!-- Funcionalidade em sí -->
- [] Deve ser possível se cadastrar
- [] Deve ser possível se autenticar
- [] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o número de checkins realizados pelo usuário logado
- [] Deve ser possível o usuário obter o histórico de checkins
- [] Deve ser possível o usuário buscar academias próximas
- [] Deve ser possível o usuário buscar academias pelo nome
- [] Deve ser possível o usuário realizar checkin em uma academia
- [] Deve ser possível validar o checkin de um usuário (Em algumas academias, o checkin é validado de forma manual, não necessariamente é uma rota separada)
- [] Deve ser possível cadastrar uma academia 

<!-- Regras de Negócio-->
<!-- Condições para cada regra de negócio (ifs) -->
- [] Usuário não deve pode se cadastrar com um e-mail duplicado
- [] Usuário não pode fazer dois checkins no mesmo dia
- [] Usuário não pode fazer checkin se não estiver a pelo menos 100m da academia
- [] O check-in só pode ser validado até 20min após criado
- [] O check-in só pode ser validado por administradores
- [] Academia só pode ser cadastrado por administrado
<!-- Requisitos Não Funcionais -->
<!-- Não partem do clientes, são mais técnicos do que a nível de funcionalidade, qual database,paginação -->
- [] Senha do usuário precisa estar criptografada
- [] Dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [] Todas listas de dados precisam estar listadas com  20 itens por página
- [] Usuário deve ser identificado por um JWT (JSON Web Token)