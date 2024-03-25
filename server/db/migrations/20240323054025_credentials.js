/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('credentials').del()
  await knex('credentials').insert([
    { password: 'password4', username: 'user4' },
    { password: 'password5', username: 'user5' },
    { password: 'password6', username: 'user6' },
  ])
}
