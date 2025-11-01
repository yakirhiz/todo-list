import React from 'react'

export default function AboutPage() {
  return (
    <div className="about-page">
      <header>
        <h1>About Todolist</h1>
        <p>Simplify your day. Organize your goals.</p>
      </header>

      <main>
        <section>
          <h2>Welcome to Todolist</h2>
          <p>
            <b>Todolist</b> is a simple and powerful to-do list app built to help you stay organized and productive.
            We believe managing your day shouldn't be complicated — that's why <b>Todolist</b> focuses on clarity, speed, and flexibility.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower people to take control of their time, one task at a time.
            We're dedicated to creating a distraction-free space where productivity feels effortless.
          </p>
        </section>

        <section>
          <h2>Why Todolist?</h2>
          <ul>
            <li>Clean, intuitive design</li>
            <li>Sync across devices</li>
            <li>Smart reminders and due dates</li>
            <li>Lists, priorities, and tags for flexibility</li>
            <li>Dark mode for focused work sessions</li>
          </ul>
        </section>

        <section>
          <p>
            Stay organized. Stay inspired.<br />
            With <b>Todolist</b>, your goals are always within reach.
          </p>
        </section>
      </main>
    </div>
  )
}
