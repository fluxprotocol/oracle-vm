import assert from "./assertUtils";

describe('assertUtils', () => {
    describe('assert', () => {
        it('should throw an error when false is passed', () => {
            const t = () => {
                assert(false);
            };

            expect(t).toThrow('The expression evaluated to a false value');
        });

        it('should throw an custom message when false is passed', () => {
            const t = () => {
                assert(false, 'custom message');
            };

            expect(t).toThrow('custom message');
        });

        it('should not throw an error when false is passed', () => {
            const t = () => {
                assert(true);
            };

            expect(t).not.toThrow();
        });
    });
});