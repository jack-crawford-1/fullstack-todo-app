/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { task: 'Buy Milk', completed: 1 },
    { task: 'Get a haircut', completed: 0 },
    { task: 'Fix car', completed: 0 },
    { task: 'Buy Tshirt', completed: 0 },
    { task: 'Get flowers', completed: 0 },
    { task: 'Fix dryer', completed: 0 },
    { task: 'Buy bread', completed: 0 },
    { task: 'Pickup drycleaning', completed: 0 },
    { task: 'Walk the dog', completed: 0 },
  ])
}
