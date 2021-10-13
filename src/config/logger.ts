const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const debug = (namespace: string, message: string, object?: any) => {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] [${message}]`);
    if (object) {
        console.debug(object);
    }
};

export default {
    debug
};
