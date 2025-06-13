import Table from 'cli-table3';
import ListRoutes from '../../Core/ListRoutes.js';

export default {
    name: 'listar-rotas',
    description: 'Lista todas as rotas do Express com middlewares',

    async handle() {
        console.log('\n🔍 Obtendo rotas do Express com middlewares...\n');

        const table = new Table({
            head: ['Método', 'Path'],
            colWidths: [10, 60]
        });

        const routeList = ListRoutes();

        if (routeList.length === 0) {
            console.log('⚠️ Nenhuma rota registrada.');
        } else {
            routeList.forEach((route) =>
                table.push([route.method, route.path])
            );
            console.log(table.toString());
        }
    }
};
