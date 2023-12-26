import { validate as uuidValidate} from "uuid";
import { InvalidUuidError, Uuid } from "../uuid.vo";


describe('Uuid Unit Tests', () => {

    const validadeSpy = jest.spyOn(Uuid.prototype as any, 'validate');

    test('should throw error when uuid is invalid', () => {
        expect(() => {
             new Uuid('invalid-uuid');
        }).toThrowError(new InvalidUuidError());

        expect(validadeSpy).toHaveBeenCalled();
        expect(validadeSpy).toHaveBeenCalledTimes(1);
        
    });

    test('should create a valid uuid', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidate(uuid.id)).toBeTruthy();
        expect(validadeSpy).toHaveBeenCalledTimes(1);

    
    });

    test('should accept a valid uuid', () => {
        const uuid = new Uuid('f7b9c2a0-6a0c-4c9a-9a1a-8b1a5e9d9f3d');
        expect(uuid.id).toBe('f7b9c2a0-6a0c-4c9a-9a1a-8b1a5e9d9f3d');
        expect(validadeSpy).toHaveBeenCalledTimes(1);

    });
});