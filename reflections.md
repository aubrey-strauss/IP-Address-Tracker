This project was a fun one for me. I went into it with a feeling of dread, since it was my first API project, but I felt more confident as I built it out and saw my progress. The further along I worked, the more my imposter syndrome declined.

I built the HTML first to have a solid foundation, then styled the CSS one section at a time. Adding the mobile layout left a gap between the map and the hero section, which I fixed by giving the results card `position: absolute` so the map could slide up underneath it. My error message was inside the form, so flex squeezed it in beside the input and button. Moving it after `</form>` fixed it.

For the JavaScript, I built it in small steps: making the form notice a search, reading what was typed, fetching from IPify, filling in the card, and moving the map and pin. My biggest challenge was the map pin. It kept adding a new pin with every search instead of moving to the new location. While fixing it, a Console error showed I was trying to move the pin in the same line that created it. I solved it by separating the two jobs: making the pin once at the top, then moving it inside the search.

I've always struggled with Git and file organization. Claude explained what I was doing wrong and why, and kept a study guide for me (study-guide.md) that helped tremendously.

If I had more time, I'd fix the pin being hidden behind the card on mobile, possibly by hiding the search bar once results appear and tightening the card's spacing. Next time, I also want to set up my project folder and repo correctly from the start.