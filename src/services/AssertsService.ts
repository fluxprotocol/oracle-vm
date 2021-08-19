export function assert(bool: boolean, message = "ASSERT_FAILED"): void {
    if (!bool) {
        throw new Error(message);
    }
}

export function assertNotEqual(bool: boolean, message = "ASSERT_FAILED") {
    if (bool) {
        throw new Error(message);
    }
}