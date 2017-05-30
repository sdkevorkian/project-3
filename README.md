<h1>Doggleganger</h1>
<h4>WDI 13 | Project 3 | Andrew, Sara, Alaina</h4>

<img src="../img/screenshots/doggleganger-hp.png" alt="Doggleganger Homepage">

<h2>User Stories</h2>
<p>People say pets look like their owners. Doggleganger allows you to find the perfect pet based on a percentage look-alike match, as well as personality information about the animal.</p>
<p>Pet lovers who love to procrastinate real-world tasks will love the hours of entertainment Doggleganger provides, while also tempting them to adopt more animals!</p>

<h2>Technologies Used</h2>
<ul>
    <li>HTML5
    <li>CSS3, implementing CSS Grid</li>
    <li>Angular.js: handles data from petfinder and our comparison before display</li>
    <li>Node.js/Express.js</li>
    <li>MongoDB</li>
    <li>Petfinder API: We use the Petfinder to find adoptable pets users can compare their face to.</li>
    <li>gm (graphics magic) npm module. Using the file system, we temporarily download two images, then resize them to be the same with gm. After resizing, gm performs a pixel-by-pixel comparison of the two images and returns the percent equality. The files are then deleted.</li>
</ul>

<h2>Approach</h2>
<p>We began the project by delegating general tasks for the week, and narrowing down each task list every morning. Sara and Andrew focused primary on back-end, while Alaina focused primarily on front-end, although the project was a true team effort.</p>
<p>Sara began by focusing on the image-to-image comparison, getting a headstart over the weekend. This put us in a great position to jump-in to everything on Monday morning. Andrew started off working with the PetFinder API to ensure we could get the data we needed to combine with the image comparison. This was crucial to making our app practical, and he was an expert on PetFinder by Day One. Alaina worked as Git Master and Project Manager, so she began the week by setting up project guidelines, including MVP and designated roles. Alaina also led the design for the site, beginning with wireframing, all the way through to font choice.</p>
<p>"I approached my portion of the project by starting with the most difficult and central part of my responsibilites, the image-to-image comparison. I tested with images locally saved and then broadened it to allow for dynamic, user input. Once that piece was done I could work on other sections as needed." — Sara</p>

<img src="../public/img/screenshots/doggleganger-search.png" alt="Doggleganger Search Page Example">
<br>
<h2>Installation Instructions</h2>
<ul>To install this project locally perform the following steps:
    <li>Fork and/or clone this repo to your local device.</li>
    <li>Run "npm install" in terminal to install all dependencies</li>
    <li>You will also need to install <a href="http://www.imagemagick.org/script/index.php">ImageMagick</a> which you can find on their site or by running "brew install imagemagick" on MacOSX or "sudo apt-get imagemagick" on Linux</li>
    <li>Create a .env file, and save a random string into a variable named JWT_SECRET.</li>
    <li>Also, <a href ="https://www.petfinder.com/developers/api-docs#keys">get an API key from petfinder.com</a> and save that key to a variable named API_KEY in your .env file.</li>
</ul>

<h2>Major Hurdles</h2>
<p>Getting a new auth token when a user updates their profile. Success!</p>
<img src="../img/screenshots/auth-code.png" alt="auth code issues">
<p>Setting up a watch and doing an API call for a list of breeds, so our dropdown is populated with the relevant animal breeds. Success!</p>
<img src="../img/screenshots/breeds-code.png" alt="Doggleganger Homepage">


<h2>Unsolved Problems</h2>
<p>Occasionally user profiles will become unretrievable. We have debugged a few causes (mostly related to Auth tokens), but a few cases still have issues and we have not been able to reliably reproduce the issue.</p>
<p>In Progress: Issues getting animations to work with angular insted of jQuery. Looking forward to taking those on at a later date for version 2.0</p>


<h2>Links</h2>
<a href="https://trello.com/b/VTSyaYEI/doggleganger">Trello Board</a> |
 <a href="https://doggleganger.herokuapp.com">HerokuApp</a> |
 <a href="https://github.com/alainabuzas/project-3">GitHub</a>
