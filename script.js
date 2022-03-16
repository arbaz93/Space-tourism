const nav = document.querySelector('.primary-navigation');
const navToggleBtn = document.querySelector('.mobile-nav-toggle');

// Listen to click event on navigation button
navToggleBtn.addEventListener('click', navToggle);

// This function toggles nav icon and data-visible in HTML
function navToggle() {
  const visisbiity = nav.getAttribute("data-visible")

  if(visisbiity == 'false') {
    nav.setAttribute("data-visible", true);
    navToggleBtn.style.backgroundImage = 'url(./assets/shared/icon-close.svg)';
  } else {
    nav.setAttribute("data-visible", false);
    navToggleBtn.style.backgroundImage = 'url(./assets/shared/icon-hamburger.svg)';
  }
}

// This function fetches data from json file and put it inside HTML document
function getData() {
  // checks which page user is on and assigns it to PAGE_NAME
  const PAGE_NAME = document.querySelector('body').getAttribute(['class']);

  // Fetching json file
  fetch('./json/data.json')
    .then(resp => resp.json())
    .then(planets =>  {
      
    // Looping through each object in json file
    planets[`${PAGE_NAME}`].forEach(data => {
      let picture = document.querySelector('picture');

      // if the object that we are looping through have same name as the data-name
      // of the button we clicked inside HTML then continue
      if(data.name == this.getAttribute(['data-name'])) {
        
        // check if page we are on is destinations
        if(PAGE_NAME == 'destinations') {

          // Location where I want to push my template
          let destination_info = document.querySelector('.destination-info');

          // change img src and alt
          picture.getElementsByTagName('img')[0].src = data.images.png;
          picture.getElementsByTagName('img')[0].alt = data.name;
          
          // This is sort of a template. everything I want to push inside HTML
          // It is sort of rough I am sure there is a better way to solve this
          let template = `<h2 class="uppercase fs-800 ff-serif">${data.name}</h2>
            <p>
              ${data.description}
            </p>
            <div class="destination-meta flex">
              <div>
                <h3 class="text-accent uppercase fs-200">Avg. distance</h3>

                <p class="uppercase ff-serif">${data.distance}</p>
              </div>
              <div>
                <h3 class="text-accent uppercase fs-200">Est. travel time</h3>
                <p class="uppercase ff-serif">${data.travel}</p>
              </div>
            </div>`

          // Pushing template inside HTML 
          destination_info.innerHTML = template
        }

        // check if page we are on is crew
        if(PAGE_NAME == 'crew') {

          // Template to put data extracted from json file
          let template = `<header>
          <h2 class="text-accent uppercase fs-600 ff-serif">${data.role}</h2>
          <p class="uppercase fs-700 ff-serif">${data.name}</p>
        </header>
        <p class="text-accent about-member">
          ${data.bio}
        </p>`;

          // change img src and alt
          picture.getElementsByTagName('img')[0].src = data.images.png;
          picture.getElementsByTagName('img')[0].alt = data.name;
          
          // Pushing template inside HTML 
          document.querySelector('.crew-info').innerHTML = template
        }

        // check if page we are on is technology
        if(PAGE_NAME == 'technology') {

          // Template to put data extracted from json file
          let template = `<h2 class="text-accent uppercase fs-500 ff-sans-cond">
          the terminology ...
          </h2>
          <p class="uppercase fs-600 ff-sans-normal">${data.name}</p>

          <p>
            ${data.description}
          </p>`

          // change img src and alt
          picture.getElementsByTagName('source')[0].srcset = data.images.portrait;
          picture.getElementsByTagName('img')[0].src = data.images.landscape;
          picture.getElementsByTagName('img')[0].alt = data.name;

          // Pushing template inside HTML
          document.querySelector('.technology-info').innerHTML = template;
        }
      }
    })
  });
}

// this functions sets the the attribute aria-seleted to true to the tab we are on and
// make all other tabs attribute aria-seleted to false
function activeTab() {
  document.querySelectorAll('button').forEach(btn => {
    btn.setAttribute('aria-selected', false);
  });
  this.setAttribute('aria-selected', true);
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', getData)
  button.addEventListener('click', activeTab)
})