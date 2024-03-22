/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Buy Milk' },
    { id: 2, task: 'Get a haircut' },
    { id: 3, task: 'Fix car' },
    { id: 4, task: 'Buy Tshirt' },
    { id: 5, task: 'Get flowers' },
    { id: 6, task: 'Fix dryer' },
    { id: 7, task: 'Buy bread' },
    { id: 8, task: 'Pickup drycleaning' },
    { id: 9, task: 'Walk the dog' },
  ])
}
