'use strict';
const header = document.getElementById('header');
const burgerToggleBtns = document.getElementsByClassName('burger-toggle');
const bgForClose = document.getElementById('close-span');
const burgerNav = document.getElementById('burger-head');

const headLinks = document.getElementsByClassName('nav__link');
const sections = document.querySelectorAll('[data-scroll-here]');

const navItems = document.getElementsByClassName('nav__item');
const btnScrollNextSection = document.getElementsByClassName('btn-next-section');
// ==== form 
const btnsSubmit = document.querySelectorAll('[data-submit]');

let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

// ==== sldier / "splide"
document.addEventListener('DOMContentLoaded', function () {
    // home slider
    new Splide('.home-splide', {
        direction: 'ttb',
        height: '100vh',
        rewind: true,
        pagination: true,
        arrows: false,
        autoplay: true,
        classes: {
            pagination: 'splide__pagination splide__pagination_ttd',
            page: 'splide__pagination__page splide__pagination_ttd__page',
        },
        breakpoints: {
            590: {
                height: '90vh',

            }
        }
    }).mount();
    // news slider
    new Splide('.splide', {
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        rewind: true,

        classes: {
            pagination: 'splide__pagination splide__pagination_ltr',
            page: 'splide__pagination__page splide__pagination_ltr__page',
            // arrows
            prev: 'splide__arrow--prev splide__arrow--prev_news',
            next: 'splide__arrow--next splide__arrow--next_news',
        },

        // breakpoints: 
        breakpoints: {
            900: {
                perPage: 2,
            },
            451: {
                perPage: 1,
                pagination: false,
                arrows: false,
            },
        }
    }).mount();

    // === Map settings
    var map = L.map('map', {
        center: [40.67156447253645, -73.91115687675763],
        zoom: 13
    });
    //  marker
    var customIcon = L.icon({
        iconUrl: './images/map/marker.png',

        iconSize: [106, 106], // size of the icon
        iconAnchor: [53, 53], // point of the icon which will correspond to marker's location

    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([40.67156447253645, -73.91115687675763], {
        icon: customIcon
    }).addTo(map);
    // ==== /.map

    // ======= Bg close  ======
    closeElementForClick(bgForClose, burgerNav, 'nav_burger-active', burgerToggleBtns, 'burger-toggle_active');


    // ======= Burger menu  ======
    for (let btn of burgerToggleBtns) {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            toggleBurger(btn, 'burger-toggle_active', 'nav_burger-active')
        })
    }


    window.addEventListener('resize', function () {

        wHeight = window.innerHeight;
        wWidth = window.innerWidth;

    });
    window.addEventListener('scroll', function (e) {
        
        if ( !burgerNav.classList.contains('nav_burger-active')) {
            scrollingForHideToShow(header);
        }

        if (wWidth > 900) {
            checkScrollAddClass(header, 'header_bg');
        } else {
            checkScrollAddClassMobile(header, 'header_bg');
            checkScrollAddClassMobile(burgerNav, 'nav_bg');
        }

        activeScrollLinks(headLinks);

    });

    // ========= Scroll to sections =========

    scrollToSection(headLinks);
    scrollToSection(btnScrollNextSection);

    // ============ filter gallery

    let dataGallery = {

        'HongCong': [{
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/01.jpg',
                size: 'big',
                'linkUrl': '#',
            },
            {
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/01.jpg',
                size: 'big',
                'linkUrl': '#',
            },
            {
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/02.jpg',
                size: 'small',
                'linkUrl': '#',

            },
            {
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/03.jpg',
                size: 'small',
                'linkUrl': '#',

            },
            {
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/04.jpg',
                size: 'small',
                'linkUrl': '#',

            },
            {
                title: 'HongCong house',
                img: './images/gallery/Hong-Cong/05.jpg',
                size: 'small',
                'linkUrl': '#',

            },

        ],
        'NewYour': [{
                title: 'NewYour house',
                img: './images/gallery/NewYour/01.jpg',
                size: 'big',
                'linkUrl': '#',
            },
            {
                title: 'NewYour house',
                img: './images/gallery/NewYour/02.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'NewYour house',
                img: './images/gallery/NewYour/03.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'NewYour house',
                img: './images/gallery/NewYour/04.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'NewYour house',
                img: './images/gallery/NewYour/05.jpg',
                size: 'small',
                'linkUrl': '#',
            },
        ],
        'Ukraine': [{
                title: 'Ukraine house',
                img: './images/gallery/Ukraine/01.jpg',
                size: 'big',
                'linkUrl': '#',
            },
            {
                title: 'Ukraine house',
                img: './images/gallery/Ukraine/02.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'Ukraine house',
                img: './images/gallery/Ukraine/03.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'Ukraine house',
                img: './images/gallery/Ukraine/04.jpg',
                size: 'small',
                'linkUrl': '#',
            },
            {
                title: 'Ukraine house',
                img: './images/gallery/Ukraine/05.jpg',
                size: 'small',
                'linkUrl': '#',
            },
        ],
    };

    const btnsFiltr = document.querySelectorAll('[data-filter-city]');
    const galleryWrapper = document.getElementById('gallry-wrapper');

    btnsFiltr.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            let city = item.getAttribute('data-filter-city');

            filterOnClick(dataGallery, galleryWrapper, city);
        });
    });

    // ====== validate forms

    for (let btn of btnsSubmit) {

        btn.addEventListener('click', function (e) {
            e.preventDefault();

            let formId = this.getAttribute('data-form-id');
            let form = document.querySelector(formId);


            validateForm(form);

        });

    }
});
//  === Functionons ===
function filterOnClick(obj, wrapper, idFilter) {

    wrapper.innerHTML = '';

    let html = '';
    let big = 0;
    let small = 0;

    for (let i = 0; i < obj[idFilter].length; i++) {
        // big item
        if (obj[idFilter][i]['size'] === 'big' && big === 0) {
            html += `
            <div class="item item_big">
                <button class="item-btn">
                    <img class="item-btn__img" src="./images/gallery/btn/360.png" alt="360" title="360">
                </button>
                <div class="bg-color_light"></div>
                <a class="item__link" href="${obj[idFilter][i]['linkUrl']}">
                    <img class="bg-img bg-img_opacity" src="${obj[idFilter][i]['img']}" alt="${obj[idFilter][i]['title']}" title="${obj[idFilter][i]['title']}">
                </a>
            </div>
            `;

            big++;
        }
        //  small item
        if (obj[idFilter][i]['size'] === 'small') {
            html += `
            <div class="item" >
                <div class="bg-color_light"></div>
                <a class="item__link" href="${obj[idFilter][i]['linkUrl']}">
                    <img class="bg-img bg-img_opacity" src="${obj[idFilter][i]['img']}" alt="${obj[idFilter][i]['title']}" title="${obj[idFilter][i]['title']}">
                </a>
            </div>
        `;
            small++;
        }

        if (big === 1 && small === 4) {
            break;
        }
    }

    wrapper.innerHTML = html;
}
let scrollPrev = 0;
function scrollingForHideToShow(element, ) {

    let scrolled = window.scrollY;

    if (scrolled > 100 && scrolled > scrollPrev ) {
        // Hides header
        element.classList.remove('header_show');
        element.classList.add('header_hidden');
    } else {
        // Shows header
        element.classList.remove('header_hidden');
        element.classList.add('header_show');
    }

    scrollPrev = scrolled;

}
function checkScrollAddClass(item, className) {

    if (scrollY > sections[1].offsetTop - header.clientHeight) {
        item.classList.add(className);
    } else {
        item.classList.remove(className);
    }
}
function checkScrollAddClassMobile(item, className) {

    if (scrollY > (sections[1].offsetTop / 4)) {
        item.classList.add(className);
    } else {
        item.classList.remove(className);
    }

}
function scrollToSection(links) {

    for (let link of links) {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            let sectionId = this.getAttribute('href');
            let sectionPos = document.getElementById(sectionId).offsetTop;

            window.scrollTo({
                top: sectionPos,
                behavior: 'smooth',
            });

        });

    }

}
function activeScrollLinks(links) {

    for (let link of links) {
        // circles
        let parentEl = link.parentElement;

        // section
        let sectionId = link.getAttribute('href');
        let section = document.getElementById(sectionId)
        let sectionPos = section.getBoundingClientRect();


        if (sectionPos.top < wHeight / 2 && sectionPos.top > sectionPos.height * -1 + wHeight / 2) {

            document.querySelectorAll('.circle_nav-circle').forEach(el => {
                el.classList.remove('circle_active');
            });

            parentEl.querySelector('.circle_nav-circle').classList.add('circle_active');
        }

    }

}
function validateForm(form) {

    let requiredInputs = form.getElementsByClassName('required');
    let fails = form.getElementsByClassName('form-fail');

    // === checking length
    for (let input of requiredInputs) {
        if (input.value.length < 1 || input.value.length > 100) {
            for (let fail of fails) {

                fail.classList.add('form-fail_active');
                setTimeout(() => {
                    fail.classList.remove('form-fail_active');
                }, 5000);

            }
            return false;
        }
    }

    let email = form.querySelector('[data-email]').value;
    let valEmail = validateEmail(email);

    if (valEmail === false) {
        for (let fail of fails) {
            fail.textContent = 'Emalil! '
            fail.classList.add('form-fail_active');
        }
        return false;
    } else {
        for (let fail of fails) {
            fail.classList.remove('form-fail_active');
        }
    }

}
function validateEmail(email) {
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(email);
}
function toggleBurger(toggleBtn, classForBtn, classForBurger) {


    let burgerId = toggleBtn.getAttribute('data-close-id');
    let burger = document.getElementById(burgerId);

    burger.classList.toggle(classForBurger);
    checkScrollAddClass(burger, 'nav_bg');
    toggleBtn.classList.toggle(classForBtn);

    bgForClose.classList.toggle('close-span_active');

    document.documentElement.classList.toggle('overflow-hide');
}
function closeElementForClick(btn, item, itemClassName, toggleBtn, toogleBtnClassName) {
    btn.addEventListener('click', () => {
        btn.classList.remove('close-span_active');
        item.classList.remove(itemClassName);

        document.documentElement.classList.remove('overflow-hide')

        for (let btn of toggleBtn) {
            btn.classList.remove(toogleBtnClassName);
        }
    })
}