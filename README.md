<img src="https://socialify.git.ci/arnabsen1729/Kronos-Tracker/image?font=KoHo&language=1&owner=0&pattern=Brick%20Wall&stargazers=1&theme=Dark" >

# Kronos tracker

Maintaining todos is hard. So, we created a web app that will keep our tasks organized, group tasks on the basis of their priority and urgency. Display progress reports and other statistics, that will keep us boosted and improve our productivity.

## Inspiration

We have a lot of work to do in our whole day in our laptop. All the work to be is difficult to be remembered actually. So often we miss out a task or two. At the end of the day, when we realise that the most important ones get missed out and, it costs us more than we expect.

So to tackle this issue, we came up with a solution, a to-do management web app, that will keep a note of your jobs according to your priority and level of urgency. It will remind you at required time and also it has a timer will accompany you during your work. Also, its unique point system will keep you motivated to be much more  productive. You can even visualise your status through various graphs.

## What it does

We have a web app, which you can login using your google account or as a guest user.

On the to-do dashboard, you can add your todos according to your priority and urgency.  For each todo, you can add it to calendar, and a timer with soft music has been attached that will accompany you during doing your work. And on completing the task, marking it as done, will add to your points .

You can even manually mark a task as done or delete it. You can even move them up and down according to your priority.

On your profile modal, you can get to know your total score, todos left to be done and todos that you have completed. You have even see your longest streak, most productive days and other attributes, that can boost you to increase your productivity day by day.

Even you can monitor your progress using pie charts and bar graphs. Also, each day score is plotted over the last 10 days.

## How we built it

Frontend:
1. React framework
2. Tailwind CSS

Backend:
1. Firebase Cloud firestore

## Challenges we ran into

1. Maintaining the firebase collections for a large number of tasks and points.
2. Using drag and drop of react component.
3. Integration of firebase google authentication with React was something new for us.
4. Customizing our own music player was something we were stuck into for long.
5. Creating the countdown timer from scratch.
6. Since this was completely online, coordinating and discussing ideas and views among teammates was another challenge.

## Accomplishments that we're proud of

1. We're proud of being inspired by the idea of author **the Covy's Four quad rule.**
2. The fact that we were able to make a minimum viable product within 48 hours, is something we are really proud of.
3. This is the first time we made a full stack web app using Firebase and React and deployed with.

## What we learned

1. We learnt to use the collections of firebase and maintain the points system for large no of users.
2. We learnt to use chart.js, material ui and drag and drop component of react.
3. Creating our own countdown timer was new for us.
4. Using GAuth was also something new.


## What's next for Kronos Tracker

We hope to expand the idea of kronos tracker in the following ways:-

1.  User can login using other social handles or github.
2.  We can maintain a leader board of various users.
3.  Extend the user dashboard from where the user can share their success to social media.
