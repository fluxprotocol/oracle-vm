export default function assert(value: boolean, message?: string) {
    if (value) return;

    throw new Error(message ?? 'The expression evaluated to a false value');
}