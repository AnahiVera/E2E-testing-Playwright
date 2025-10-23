import { test, describe, beforeEach, expect } from '@playwright/test';


describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    
    test('front page can be opened', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const locator = page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blog app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
    })


    test('Log in form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()
        await expect(page.getByRole('textbox').first()).toBeVisible()
        await expect(page.getByRole('textbox').last()).toBeVisible()
    })


         


    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {

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

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'Login' }).click()
            await page.getByRole('textbox').first().fill('wrong user')
            await page.getByRole('textbox').last().fill('wrong password')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
    })


})