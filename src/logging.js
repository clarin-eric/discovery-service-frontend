export function log_debug(message) {
    if(window.config.debug) {
        console.log("[DEBUG] "+message);
    }
}

export function log_info(message) {
    console.log("[ INFO] "+message);
}

export function log_warn(message) {
    console.log("[ WARN] "+message);
}

export function log_error(message) {
    console.error("[ERROR] "+message);
}