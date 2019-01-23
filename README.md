# omatori

The point is to help browsing large amounts of tori.fi announcements by showing many of them on one screen.

## Backend 
- server.js nodejs express server makes http request to tori.fi
- parse.js to convert DOM elements into json

Notice! The layout changes often, perhaps weekly, sometimes daily.

## Frontend

Just a vue draft with some mock/test data, and a query for Pirkanmaa region.
when page is scrolled to end, more data is loaded.
