export function log_debug(message, ...args) {
    if(window.config.debug) {
        console.log("[DEBUG] "+message, ...args);
    }
}

export function log_info(message, ...args) {
    console.log("[ INFO] "+message, ...args);
}

export function log_warn(message, ...args) {
    console.log("[ WARN] "+message, ...args);
}

export function log_error(message, ...args) {
    console.error("[ERROR] "+message, ...args);
}