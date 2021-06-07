/**
 * Safely parse json without throwing any errors
 *
 * @export
 * @param {string} str
 * @return {(object | null)}
 */
export function safeParseJson(str: string): object | null {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}
