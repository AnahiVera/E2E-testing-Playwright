import { test, describe, expect } from '@playwright/test';


describe('Blog app', () => {
test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = page.getByText('Blogs')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Blog app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
})


 test('user can log in', async ({ page }) => {
    await page.goto('http://localhost:5173')

    //click en toogle Login form
    await page.getByRole('button', { name: 'Login' }).click()
    //llenar formulario-> usamos first and last para seleccionar los input por orden
    await page.getByRole('textbox').first().fill('Anahi')
    await page.getByRole('textbox').last().fill('1234')

    // all method tambien para llenar formularios (para mas de 2 campos)
/* const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill('Anahi')
    await textboxes[1].fill('1234') */

    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Anahi logged in')).toBeVisible()
  })



})