import { Uuid } from "../../../shared/domain/values-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    let validateSpy: any;
    //reseta os dados do mock a cada teste
    beforeEach(() => {
        validateSpy = jest.spyOn(Category, 'validate');
    });
    describe('constructor', () => {
        test('create category', () => {
            let category = new Category({
                name: 'Category 1'
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Category 1');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
            
        });

        test('should be defined with all properties', () => {
            const created_at = new Date('2020-01-01');
            const category = new Category({
                name: 'Category 1',
                description: 'Description',
                is_active: false,
                created_at: created_at
            });
            
            expect(category.category_id).toBeInstanceOf(Uuid) ;
            expect(category.name).toBe('Category 1');
            expect(category.description).toBe('Description');
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBe(created_at);
        });

        test('should be defined with all properties using factory', () => {
            const created_at = new Date('2020-01-01');
            const category = Category.create({
                name: 'Category 1',
                description: 'Description',
                is_active: false,
                created_at: created_at
            });
            
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Category 1');
            expect(category.description).toBe('Description');
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBe(created_at);
        });

        describe("Created commando", () => {
            test('should create a category', () => {
                const category = Category.create({
                    name: 'Category 1'
                });
                
                expect(category.category_id).toBeInstanceOf(Uuid);
                expect(category.name).toBe('Category 1');
                expect(category.description).toBeNull();
                expect(category.is_active).toBe(true);
                expect(category.created_at).toBeInstanceOf(Date);
                expect(validateSpy).toHaveBeenCalledTimes(1);
            });
        });

        test('should be defined with all properties using factory and default values', () => {
            const category = Category.create({
                name: 'Category 1'
            });
            
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Category 1');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
        });

    });

    describe('category_id field', () => {
        const arrange = [{category_id: null}, {category_id: undefined}, {category_id: new Uuid}];
        test.each(arrange)('id = %j', ({category_id}) => {
            const category = Category.create({
                name: 'Category 1',
                category_id: category_id as any
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            if (category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        });

    });

    describe('changeName', () => {
        test('should change name', () => {
            const category = Category.create({
                name: 'Category 1'
            });

            category.changeName('Category 2');

            expect(category.name).toBe('Category 2');
            expect(validateSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('changeDescription', () => {
        test('should change description', () => {
            const category = Category.create({
                name: 'Category 1',
                description: 'Description'
            });

            category.changeDescription('Description 1');

            expect(category.description).toBe('Description 1');
            expect(validateSpy).toHaveBeenCalledTimes(2);
        });
        test('should not change description when empty', () => {
            const category = Category.create({
                name: 'Category 1',
                description: 'Description'
            });

            category.changeDescription('');

            expect(category.description).toBe('');
        });
    });

    
    describe('activate', () => {
        test('should activate', () => {
            const category = Category.create({
                name: 'Category 1',
                is_active: false
            });

            category.activate();

            expect(category.is_active).toBe(true);
        });
    });

    describe('desactivate', () => {
        test('should desactivate', () => {
            const category = Category.create({
                name: 'Category 1',
                is_active: true
            });

            category.desactivate();

            expect(category.is_active).toBe(false);
        });
    });

    describe('toJSON', () => {
        test('should return all properties', () => {
            const created_at = new Date('2020-01-01');
            const category = Category.create({
                name: 'Category 1',
                description: 'Description',
                is_active: false,
                created_at: created_at
            });

            const json = category.toJSON();

            expect(json).toEqual({
                category_id: category.category_id.id,
                name: 'Category 1',
                description: 'Description',
                is_active: false,
                created_at: created_at
            });
        });
    });

});

describe ('Category Validator', () => {
    describe('created command', () => {
        test('should an invalid category with name property', () => {

            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => Category.create({ name: "" })).containsErrorMessages({
                name: [
                    "name should not be empty",
                ],
            });

            // expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
            //     name: [
            //         "name must be a string",
            //     ],
            // });

            expect(() => Category.create({ name: "a".repeat(256) })).containsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        });

        it('should an invalid category with description property', () => {
            expect(() => 
                Category.create({ description: 5 } as any )).containsErrorMessages({
                    description: [ "description must be a string",],
            });
        });

        it('should an invalid category with is_active property', () => {
            expect(() => 
                Category.create({ is_active: 5 } as any )).containsErrorMessages({
                    is_active: [ "is_active must be a boolean value",],
            });
        });

    });

});
