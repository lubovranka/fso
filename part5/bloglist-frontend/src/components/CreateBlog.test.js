import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
    it('creating a new blog', async () => {
        const formHandler = jest.fn(e => e.preventDefault())
        const container = render(<CreateBlog handleNewBlog={formHandler}/>).container
        const user = userEvent.setup()

        const titleInput = container.querySelector('#titleInput')
        const authorInput = container.querySelector('#authorInput')
        const urlInput = container.querySelector('#urlInput')
        const createBtn = container.querySelector('#createBtn')

        await user.type(titleInput, 'Test title')
        await user.type(authorInput, 'Test author')
        await user.type(urlInput, 'Test url')
        await user.click(createBtn)

        expect(formHandler.mock.calls).toHaveLength(1)
        expect(Array.from(formHandler.mock.calls[0][0].target.children)[0].value).toBe('Test title')
    })
})