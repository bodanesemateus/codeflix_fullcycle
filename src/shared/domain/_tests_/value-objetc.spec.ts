import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor( readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor( readonly value: string, readonly value2: number) {
    super();
  }
}

describe('ValueObject', () => {
    test('should be equals', () => {
        const valueObject1 = new StringValueObject('teste');
        const valueObject2 = new StringValueObject('teste');
        expect(valueObject1.equals(valueObject2)).toBeTruthy();

        const complexValueObject1 = new ComplexValueObject('teste', 1);
        const complexValueObject2 = new ComplexValueObject('teste', 1);
        expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
    });

    test('should not be equals', () => {
        const valueObject1 = new StringValueObject('teste');
        const valueObject2 = new StringValueObject('teste2');
        expect(valueObject1.equals(valueObject2)).toBeFalsy();
        expect(valueObject1.equals(null as any)).toBeFalsy();
        expect(valueObject1.equals(undefined as any)).toBeFalsy();

        const complexValueObject1 = new ComplexValueObject('teste', 1);
        const complexValueObject2 = new ComplexValueObject('teste', 2);
        expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
        expect(complexValueObject1.equals(null as any)).toBeFalsy();
        expect(complexValueObject1.equals(undefined as any)).toBeFalsy();
    });
});