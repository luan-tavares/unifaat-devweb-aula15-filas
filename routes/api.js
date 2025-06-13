import { Router } from 'express';

import colaboradoresApi from './api/colaboradoresApi.js';
import todosApi from './api/todosApi.js';
import colaboradoresProjetosApi from './api/colaboradoresProjetosApi.js';
import projetosApi from './api/projetosApi.js';
import usersApi from './api/usersApi.js';

export default (function () {

    const router = Router();

    // Colaborador api routes
    router.use('/', colaboradoresApi);

    // Todos api routes
    router.use('/', todosApi);

    // Projetos api routes
    router.use('/', projetosApi);

    // Colaborador-Projeto api routes
    router.use('/', colaboradoresProjetosApi);

    //Users
    router.use("/", usersApi);

    return router;

})();
