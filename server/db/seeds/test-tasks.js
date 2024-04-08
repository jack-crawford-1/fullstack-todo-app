/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Buy Milk', isCompleted: false },
    { id: 2, task: 'Get a haircut', isCompleted: false },
    { id: 3, task: 'Fix car', isCompleted: false },
    { id: 4, task: 'Buy Tshirt', isCompleted: false },
    { id: 5, task: 'Get flowers', isCompleted: false },
    { id: 6, task: 'Fix dryer', isCompleted: false },
    { id: 7, task: 'Buy bread', isCompleted: false },
    { id: 8, task: 'Pickup drycleaning', isCompleted: false },
    { id: 9, task: 'Walk the dog', isCompleted: false },
  ])
}
