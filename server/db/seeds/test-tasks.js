/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  const userId = 'google-oauth2|117792864117201835995'
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Buy Milk', isCompleted: false, user_id: userId },
    { id: 2, task: 'Get a haircut', isCompleted: false, user_id: userId },
    { id: 3, task: 'Fix car', isCompleted: false, user_id: userId },
    { id: 4, task: 'Buy Tshirt', isCompleted: false, user_id: userId },
    { id: 5, task: 'Get flowers', isCompleted: false, user_id: userId },
    { id: 6, task: 'Fix dryer', isCompleted: false, user_id: userId },
    { id: 7, task: 'Buy bread', isCompleted: false, user_id: userId },
    { id: 8, task: 'Pickup drycleaning', isCompleted: false, user_id: userId },
    { id: 9, task: 'Walk the dog', isCompleted: false, user_id: userId },
  ])
}
