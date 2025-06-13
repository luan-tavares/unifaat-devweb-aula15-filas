import { quickConnect } from '../../config/rabbit.js';

export default function createJob(job) {
    if (typeof job !== 'object' && typeof job.name !== "string" || typeof job.handle !== "function") {
        throw new Error('Você precisa passar uma função válida');
    }

    const dispatch = async (payload, queue = "default") => {
        const { channel, connection } = await quickConnect();

        const jobName = job.name;

        const message = {
            job: jobName,
            payload,
        };

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

        console.log(`[Job] Enviado para fila "${queue}": ${jobName}`);
        await channel.close();
        await connection.close();
    };

    return {
        dispatch: dispatch,
        ...job
    };
}
