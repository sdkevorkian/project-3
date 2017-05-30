<h1>Doggleganger</h1>
<h4>WDI 13 | Project 3 | Andrew, Sara, Alaina</h4>

<h2>User Stories</h2>
<p>People say pets look like their owners. Doggleganger allows you to find the perfect pet based on a percentage look-alike match, as well as personality information about the animal.</p>
<p>Pet lovers who love to procrastinate real-world tasks will love the hours of entertainment Doggleganger provides, while also tempting them to adopt more animals!</p>

<h2>Technologies Used</h2>
<ul>
    <li>HTML + CSS, with focus on CSS Grid</li>
    <li>Angular.js: handles data from petfinder and our comparison before display.</li>
    <li>Node.js/Express.js</li>
    <li>MongoDB</li>
    <li>Petfinder API: We use the Petfinder to find adoptable pets users can compare their face to.</li>
    <li>gm (graphics magic) npm module. Using the file system, we temporarily download two images, then resize them to be the same with gm. After resizing, gm performs a pixel-by-pixel comparison of the two images and returns the percent equality. The files are then deleted.</li>
</ul>

<h2>Approach</h2>
<p>SK: I approached my portion of the project by starting with the most difficult and central part of my responsibilites, the image to image comparison. I tested with images locally saved and then broadened it to allow for dynamic, user input. Once that piece was done I could work on other sections as needed. </p>

<h2>Installation Instructions</h2>
<ul>To install this project locally perform the following steps:
    <li>Fork and/or clone this repo to your local device.</li>
    <li>Run "npm install" in terminal to install all dependencies</li>
    <li>You will also need to install <a href="http://www.imagemagick.org/script/index.php">ImageMagick</a> which you can find on their site or by running "brew install imagemagick" on MacOSX or "sudo apt-get imagemagick" on Linux</li>
    <li>Create a .env file, and save a random string into a variable named JWT_SECRET.</li>
    <li>Also, <a href ="https://www.petfinder.com/developers/api-docs#keys">get an API key from petfinder.com</a> and save that key to a variable named API_KEY in your .env file.</li>
</ul>

<h2>Unsolved Problems / Major Hurdles</h2>
<p>Occasionally user profiles will become unretrievable. We have debugged a few causes (mostly related to Auth tokens), but a few cases still have issues and we have not been able to reliably reproduce the issue.</p>
<p>SK - did not figure out how to implement async on the compare.js file (in controllers folder, backend routing). I attempted series and waterfall methods but in both cases the functions ran out of order.</p>

<h2>Links</h2>
<a href="https://trello.com/b/VTSyaYEI/doggleganger">Trello Board</a>
<a href="https://doggleganger.herokuapp.com">HerokuApp</a>
<a href="https://github.com/alainabuzas/project-3">GitHub</a>
