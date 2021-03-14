
<img src="0ones.%20&font=Raleway&pattern=Circuit%20Board&stargazers=1&theme=Dark" >

# Kronos tracker
''. So, we created a web app that will keep your works to be done organised, in a priority based way that will surely enhance our productivity daily.

## Inspiration

We have a lot of work to do in our whole day in our laptop. All the work to be is difficult to be remembered actually. So often we miss out a task or two. At the end of the day, when we realise that the most important ones get missed out and ,it costs us more than we expect.

So to tackle this issue, we came up with a solution, a to-do management web app, that will keep a note of your jobs according to your priority and level of urgency. It will remind you at required time and also it has a timer will accompany you during your work. Also, its unique point system will keep you motivated to be much more  productive. You can even visualise your status through various graphs .

## What it does

We have a web app, which you can login using your google account or as a guest user.

On the to-do dashboard, you can add your todos according to your priority and urgency.  For each todo, you can add it to calendar, and a timer with soft music has been attached that will accompany you during doing your work. And on completing the task, marking it as done, will add to your points .

You can even manually mark a task as done or delete it. You can even move them up and down according to your priority.

On your profile modal, you can get to know your total score, todos left to be done and todos that you have completed. You have even see your longest streak, most productive days and other attributes, that can boost you to increase your productivity day by day.

Even you can monitor your progress using pie charts and bar graphs. Also, each day score is plotted over the last 10 days.

"conclusion line"


## How we built it

We are using **Arduino UNO** to collect the details using the:
> 1.Temperature and Humidity Sensor( DHT11 ).
 >  2.Air pressure sensor (BMP280).

  And also displaying those values in an OLED display component.



The Arduino is then connected to a **Python program using Pyserial** to forward the collected information. The Python script then makes a **POST request to the Node based server** along with all the details. This process keeps repeating at a fixed interval.

The other component is the mobile application, which is built using the **React Native framework.** The app is using the Geolocation API to get the coordinates of the user. Sends this data to the server periodically along with other information like email addresses and device id.

The server is built with **NodeJs and Express and is deployed to Heroku**. It receives the incoming information from the device and mobile app. We are using **Firebase Cloud Storage** to temporarily store the data. Both the device and the mobile application is bound by a unique Id, so that the server can recognize them. As soon as the ids match the server sends the emails to the registered addresses.

We are using the Sendgrid mailing service for that. In the email we have
>	1.  Temperature, Humidity, Air Pressure, Altitude.
>	2.  A static map based on the coordinates using the Mapbox API.
>3.  Weather forecast of the location using the OpenWeatherMap API.
>4.  A link to the exact location in the Google Maps.

Once the email is sent the record in the firebase gets deleted automatically.

## Challenges we ran into



1.  Maintaining the firebase collections for a large number of tasks and points.

2. Integration of firebase google authentication with React was something new for us.

3.  Customizing our own music player was something we were stuck into for long.

4. Creating the countdown timer from scratch took a long time.

5. Using drag and drop of react component was a new experience.

6.  Since this was completely online, coordinating and discussing ideas and views among teammates was another challenge.

## Accomplishments that we're proud of
1. We're proud of being inspired by the idea of scientist **the golden Four quad rule to hack productivity.**

3.  The fact that we were able to make a minimum viable product within 48 hours, is something we are really proud of.

4.  This is the first time we made a full stack web app using Firebase and React and deployed with.

## What we learned





## What's next for Kronos Tracker

We hope to expand the idea of kronos tracker in the following ways:-

1.  User can login using other social handles or github.

2.  We can maintain a leader board of various users.

3.  Extend the user dashboard from where the user can share their success to social media.

4.  The graphs can be made to display for a range of days according to user choice.

5. Improve the ui of the landing page
