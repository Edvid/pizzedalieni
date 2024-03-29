import React from 'react'
import NavBar from '@/components/navBar'
import PageTitle from '@/components/pageTitle'
import styles from './styles.module.css';

export default function HowDoIDeleteMyself () {
  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <div className='py-8'>
    <div className="m-auto p-8">
      <h1 className='text-3xl text-center'>
        How Do I Delete Myself?
      </h1>
    </div>
        <div className={styles["message-container"] + ' w-[70%] m-auto'}>
          <p>Hello! This is a very small portfolio project of
            mine just meant to show off the skills I have so far in web
            development, but I also have to respect your wish to delete
            your account from my site, even if you have lost your password.
            To verify that your wish to delete your account truly
            came from you, even in the event of not being able to provide
            password, the only other option was to set up automatic emails
            for email verification at sign-up, and subsequent deletion
            of account request emails. This service was a bit much
            to include in a minimally-viable-product of a portfolio project,
            so <i>requesting</i> to delete wasn't what I opted for.
          </p>
          <div className='h-6'></div>
          <p>
            Instead I have taken a different approach entirely to account
            deletion, knowing password or not.
          </p>
          <b>
            Log out and leave this
            account alone for 24-25 hours.</b>
          <p>
            This site doesn't associate
            anything more than the content of your basket with your account,
            outside personal details provided in the sign up process, so
            nothing of value is lost by forcably deleting accounts from the
            site after 24 hours. You are free to sign up again if your account
            has been deleted and you did not intend for that to happen. You are
            also free to provide fake emails, and names for your sign ups.
          </p>
        </div>
      </div>
    </main>
  )
}
