import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import   {useRouter}   from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton components', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

    render(
      <SubscribeButton />
    )
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
    
  })

  // it('redirects to posts when user already has a subscription', () => {
  //   const useRouterMocked = jest.mocked(useRouter)
  //   const useSessionMocked = jest.mocked(useSession)
  //   const pushMock = jest.fn()

  //   useSessionMocked.mockReturnValueOnce({
  //       user: { name: "John Doe", email: "john.doe@example.com" },
  //       expires: "fake-expires",
  //     activeSubscription: 'fake-active-subscription',
  //     status: "authenticated"
  //   } as any)

  //   useRouterMocked.mockImplementationOnce(() => ({ push: pushMock } as any));

  //   render(<SubscribeButton />)

  //   const subscribeButton = screen.getByText('Subscribe now')

  //   fireEvent.click(subscribeButton)

  //   expect(pushMock).toHaveBeenCalled()
  // })  
})