# omatori

The point is to help browsing large amounts of tori.fi announcements by showing many of them on one screen.

## Backend 
- server.js nodejs express server makes http request to tori.fi
- parse.js to convert DOM elements into json

Notice! The tori.fi layout changes often, perhaps weekly, sometimes daily.

## Frontend

Just a vue draft with a query for Pirkanmaa/Kanta-Häme regions.
when page is scrolled to end, more data is loaded.
