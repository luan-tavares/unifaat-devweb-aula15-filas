import minimist from "minimist";

export default () => {
    const [, , ...rawArgs] = process.argv;
    const args = minimist(rawArgs);
    delete args["_"];

    return (args["queue"]) ? (args["queue"]) : (process.env.RABBITMQ_QUEUE || "default");
}