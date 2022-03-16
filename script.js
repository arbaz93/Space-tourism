const nav = document.querySelector('.primary-navigation');
const navToggleBtn = document.querySelector('.mobile-nav-toggle');

function navToggle() {
  const visisbiity = nav.getAttribute("data-visible")
  if(visisbiity == 'false') {
    nav.setAttribute("data-visible", true);
    navToggleBtn.style.backgroundImage = 'url(./assets/shared/icon-close.svg)';
  } else {
    nav.setAttribute("data-visible", false);
    navToggleBtn.style.backgroundImage = 'url(./assets/shared/icon-hamburger.svg)';
  }
  console.log(visisbiity)
}

navToggleBtn.addEventListener('click', navToggle)
function getData() {
  const PAGE_NAME = document.querySelector('body').getAttribute(['class'])
  const STREAM_DATA = fetch('./json/data.json').then(resp => resp.json());
  const PLANETS_DATA = STREAM_DATA.then(planets =>  {
    planets[`${PAGE_NAME}`].forEach(data => {

      if(data.name == this.getAttribute(['data-name'])) {
        let picture = document.querySelector('picture');
        
        if(PAGE_NAME == 'destinations') {
          let destination_info = document.querySelector('.destination-info');
          picture.innerHTML = `<img src="${data.images.png}" alt="the ${data.name}" />`
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

            destination_info.innerHTML = template
        }

        if(PAGE_NAME == 'crew') {
          let template = `<header>
          <h2 class="text-accent uppercase fs-600 ff-serif">${data.role}</h2>
          <p class="uppercase fs-700 ff-serif">${data.name}</p>
        </header>
        <p class="text-accent about-member">
          ${data.bio}
        </p>`;
        picture.innerHTML = `<img
        src="${data.images.png}"
        alt="image of ${data.name}"
      />`
        document.querySelector('.crew-info').innerHTML = template
        }

        if(PAGE_NAME == 'technology') {
          let template = `<h2 class="text-accent uppercase fs-500 ff-sans-cond">
          the terminology ...
        </h2>
        <p class="uppercase fs-600 ff-sans-normal">${data.name}</p>

        <p>
          ${data.description}
        </p>`
        document.querySelector('.technology-info').innerHTML = template;
        picture.innerHTML = `
        <source
          media="(min-width:45rem)"
          srcset="${data.images.portrait}"
        />
        <img src="${data.images.landscape}" alt="" />`
        }
      }
    })
  });









}
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