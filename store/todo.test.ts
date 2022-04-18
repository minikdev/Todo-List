import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import {setActivePinia,createPinia} from "pinia"
import { useTodoStore } from './todo'


beforeAll(()=>{
    setActivePinia(createPinia())
})
describe('useTodoStore',()=>{
    let store : ReturnType<typeof useTodoStore>;

    beforeEach(()=>{
       store = useTodoStore()
    })
    afterEach(()=>{
        store.$reset() 
    })
    test('should be defined',()=>{
        expect(store).toBeDefined()
    })

    test("initiliazes with empty items", ()=>{
        expect(store.items).toStrictEqual([])
    })
    test("creates a todo", ()=>{
        store.add({label:"test"});
        expect(store.items[0]).toBeDefined()
        expect(store.items[0].label).toBe("test");
    })
    test("gets by id", ()=>{
        store.add({label:"test"});
        const item = store.items[0];
        const todo = store.getTodoById(item.id)
        expect(todo).toBe(item)
         
    })
    test("gets ordered todos", ()=>{
        store.add({label:"test2"});
        store.add({label:"test"});
        store.add({label:"test3"});
        const todos = store.getSortedTodos;
        expect(todos[0].label).toBe("test2");
        expect(todos[1].label).toBe("test");
        expect(todos[2].label).toBe("test3");
    })
    test("removes a todo", ()=>{
        store.add({label:"test"});
        const item = store.items[0];
        store.remove(item.id);
        expect(store.items).toStrictEqual([])
    })
    test("updates a todo", ()=>{
        store.add({label:"test"});
        const item = store.items[0];
        store.update(item.id,{label:"test2"});
        store.update(item.id,{done:true});
        expect(store.items[0].label).toBe("test2");
        expect(store.items[0].done).toBe(true);

    })
})