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
  ])
}
