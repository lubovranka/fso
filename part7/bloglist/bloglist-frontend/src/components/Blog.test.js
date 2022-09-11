import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const likeHandler = jest.fn()
    let container
    beforeEach(() => {
        const blog = {
            title: 'Test blog',
            author: 'Test author',
            likes: 7,
            url: 'https://test.url',
            user: [{ id: 12 }]
        }

        container = render(<Blog blog={blog} handleLike={likeHandler} handleDelete={() => {}}/>).container
    })

    it('renders content', () => {
        const element = screen.getByText('Test blog Test author')
        expect(element).toBeDefined()
    })

    it('doesn\'t initially render likes', () => {
        const el = container.querySelector('#desc')
        expect(el).toHaveStyle('display: none')
    })

    it('shows likes after click', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('#toggler')
        await user.click(button)
        const el = container.querySelector('#desc')

        expect(el).not.toHaveStyle('display: none')
    })

    it('likes register', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('#likeBtn')
        await user.click(button)
        await user.click(button)
        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})