
import minimist from 'minimist';
import { getConnection } from '../../config/rabbit.js';
import getFiles from '../getFilesWithContents.js';

export default async function createWorker(dir) {
    const jobMap = {};

    const time = () => new Date().toLocaleTimeString('pt-BR', { hour12: false });

    const files = await getFiles(dir);

    for (const [filename, job] of Object.entries(files)) {
        if (typeof job !== 'object' || !job.name || typeof job.handle !== 'function') {
            throw new Error(`Job inválido no arquivo ${filename}`);
        }
        jobMap[job.name] = job.handle;
    }





    async function listen(queue) {
        const channel = await getConnection();

        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            const start = Date.now();


            try {
                const { job, payload } = JSON.parse(msg.content.toString());

                const jobHandle = jobMap[job];
                if (!jobHandle) throw new Error(`Job "${job}" não registrado`);

                console.log(`[${time()}] Executando ${job} da fila "${queue}"`);

                await jobHandle(payload);

                const duration = ((Date.now() - start) / 1000).toFixed(3);

                console.log(`[${time()}] Executado ${job} da fila "${queue}" (Finalizado em ${duration}s)`);

                channel.ack(msg);
            } catch (err) {
                console.error(`[Worker] Erro ao processar job:`, err);
                channel.nack(msg, false, false);
            }
        });

        console.log(`[WORKER] Fila: "${queue}"`);

    }

    return { listen };
}
