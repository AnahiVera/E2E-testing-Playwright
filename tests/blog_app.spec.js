import { test, describe, beforeEach, expect } from '@playwright/test';
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // reset backend state testing (no blogs, no users accounts)
        await request.post('/api/testing/reset')
        //creates a user for the tests
        await request.post('/api/users', {
            data: {
                name: 'TestUser',
                username: 'TestUser',
                password: '1234'
            }
        })

        await page.goto('/')
        //clear local storage to remove logged in user info
        await page.evaluate(() => {
            localStorage.clear()
        })
    })


    test('front page can be opened', async ({ page }) => {
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
        beforeEach(async ({ page }) => {
            await page.goto('/')
        })

        test('succeeds with correct credentials', async ({ page }) => {

            //click en toogle Login form
            /* await page.getByRole('button', { name: 'Login' }).click() */
            //llenar formulario-> usamos first and last para seleccionar los input por orden
            /* await page.getByRole('textbox').first().fill('Anahi')
            await page.getByRole('textbox').last().fill('1234') */

            // all method tambien para llenar formularios (para mas de 2 campos)
            /* const textboxes = await page.getByRole('textbox').all()
                await textboxes[0].fill('Anahi')
                await textboxes[1].fill('1234') */

            /* await page.getByRole('button', { name: 'login' }).click() */

            //usaremos helper function para evitar repeticion de log in
            await loginWith(page, 'TestUser', '1234')

            await expect(page.getByText('TestUser logged in')).toBeVisible()

        })

        test('fails with wrong credentials', async ({ page }) => {
            /*  await page.getByRole('button', { name: 'Login' }).click()
             await page.getByRole('textbox').first().fill('wrong user')
             await page.getByRole('textbox').last().fill('wrong password')
             await page.getByRole('button', { name: 'login' }).click() */

            await loginWith(page, 'wrong user', 'wrong password')
            await expect(page.getByText('Wrong credentials')).toBeVisible()

            await expect(page.getByText('TestUser logged in')).not.toBeVisible()
        })
    })


    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            // Configuración INDEPENDIENTE para este describe
            await page.goto('/')

            // Limpiar estado ANTES del login
            await page.evaluate(() => {
                localStorage.removeItem('loggedBlogUser')
            })
            await page.reload()

            await loginWith(page, 'TestUser', '1234')
            await expect(page.getByText('TestUser logged in')).toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'TestTitle', 'Playwright', 'www.testurl.com')
            await expect(page.getByText(`Created successfully TestTitle by Playwright`)).toBeVisible()
            await page.getByText('TestTitle, Playwright').waitFor()
            await expect(page.getByText('TestTitle, Playwright')).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            // Crea el blog en este test
            await createBlog(page, 'TestTitle', 'Playwright', 'www.testurl.com')
            await expect(page.getByText('Created successfully TestTitle by Playwright')).toBeVisible()


            // Da like al blog recién creado
            await page.getByRole('button', { name: 'View' }).first().click()

            const blogContainer = page.locator('.blog').first()
            await blogContainer.getByRole('button', { name: 'Like' }).click()

            await page.getByText('You liked TestTitle').waitFor()
            await expect(page.getByText('You liked TestTitle')).toBeVisible()
        })


        test('the user who created a blog can delete it', async ({ page }) => {
            await page.pause()
            // Crea un blog
            await createBlog(page, 'BlogToDelete', 'Playwright', 'www.delete.com')
            await expect(page.getByText('Created successfully BlogToDelete by Playwright')).toBeVisible()

            // Abre el blog para mostrar el botón Delete
            await page.getByRole('button', { name: 'View' }).first().click()
            const blogContainer = page.locator('.blog').first()

            // Interceptar y aceptar el diálogo de confirmación
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('Are you sure you want to delete BlogToDelete by Playwright?')
                await dialog.accept()
            })

            // Clic en Delete
            await blogContainer.getByRole('button', { name: 'Delete' }).click()

            // Verifica que el blog fue eliminado del DOM
            await expect(page.getByText('BlogToDelete, Playwright')).not.toBeVisible()
        })

    })




})