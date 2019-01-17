function initPage() {
    let bLazy = new Blazy();

    function readTextFile(file, callback) {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        };
        rawFile.send(null);
    }

//usage:
    let projectImages;
    readTextFile("js/data.json", text => {
        projectImages  = JSON.parse(text);
    });


    AOS.init();

// You can also pass an optional settings object
// below listed default settings
    AOS.init({
        // Global settings
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll

        // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1200, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: true, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom'// defines which position of the element regarding to window should trigger the animation
    });



    let temp = document.querySelector('#project--template');
    let plate = document.querySelector('#projects');


    function createProject(arr) {
        // var children = [];

        for (let i = 0; i < arr.length; i++) {
            let card = document.importNode(temp.content, true);
            let wrapper = card.querySelector('.project');
            let img = wrapper.querySelector(".project--item");
            wrapper.setAttribute('data-aos', arr[i].aos);
            img.classList.add('b-lazy');
            img.setAttribute('data-src', arr[i].src);
            img.setAttribute('src', arr[i].dataSrc);
            wrapper.classList.add(arr[i].align);
            wrapper.addEventListener("click", e => {
                Gallery(i);
            });
            plate.appendChild(card);
            // card.__data__ = arr[i];

            // children.push(card);
        }

        // plate.append.apply(plate, children);
    }

    createProject(projectImages);


    let form =  document.querySelector('.form-wrapper');
    let contactMeButton =  document.querySelector('.scroll');
    let contactMeButtonText = document.querySelector('.scroll--bar');

    contactMeButton.addEventListener('click', function() {
        contactMeButtonText.classList.toggle('rotated');
            form.classList.toggle('active')
    });


    window.onscroll = function () {
        myFunction();

    };

    let navbar = document.querySelector('.nav--list--hidden');
    let projects = document.querySelector("#projects");
    let menu = document.querySelector('.nav--hidden');
    let windowHeight = window.innerHeight;
    let sticky = projects.offsetTop - windowHeight * 0.1;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            document.styleSheets[0].addRule('.nav--list--item:before', 'content: none;');
            document.styleSheets[0].addRule('.nav--list--item:after', 'content: none;');
            menu.style.display = "block";
            navbar.style.display = "flex";
            navbar.classList.add("sticky");
            // navbar.setAttribute('data-aos','fade-up');
            // navbar.setAttribute('data-aos-anchor-placement','top-bottom');

        } else {
            document.styleSheets[0].addRule('.nav--list--item:before', 'content: \" \";');
            document.styleSheets[0].addRule('.nav--list--item:after', 'content: " ";');
            navbar.style.display = "none";
            menu.style.display = "none";
            navbar.classList.remove("sticky");


            // navbar.setAttribute('data-aos','fade-up');
            // navbar.setAttribute('data-aos-anchor-placement','top-bottom');

        }
    }

    let home = $("#home");
    let contacts = $("#contacts");
    scrollTo(".link-projects", projects, 75, 1000);
    scrollTo(".link-home", home, 120, 1400);
    scrollTo(".link-contacts", contacts, 0, 1400);

    function scrollTo(trigger, to, offset, time) {
        $(trigger).click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(to).offset().top - offset

            }, time);
        });
    }



    function Gallery(index, params = {}) {
        const {
                // targetImgSelector = '.gallery-item > img',
                sliderSelector = '.slider',
                sliderWrapperSelector = '.slider__wrapper',
                sliderNextSelector = '.slider__next',
                sliderPrevSelector = '.slider__prev'
            } = params,
            // targetImgSelector = typeof params.targetImgSelector === 'undefined'
            // ? '.gallery-item > img'
            // : params.targetImgSelector
            slider = document.querySelector(sliderSelector) || createSlider(),
            sliderWrapper = slider.querySelector(sliderWrapperSelector),
            sliderPrev = slider.querySelector(sliderPrevSelector),
            sliderNext = slider.querySelector(sliderNextSelector);
        let currentSlideIndex = index,
            slidesLength = 1;
        let image = projectImages[index];

        // window.addEventListener('click', function(e) {
        //     const targetContainer = image;
        //     // imgContainer.classList.remove('b-lazy');
        //     // imgContainer.parentNode.removeAttribute('data-aos');
        //     //let nextImge = document.querySelector('.project');
        //     // nextImge.removeAttribute('data-aos');
        //     // nextImge.classList.remove('aos-init');
        //     console.log(e.target);
        //     console.log(e.target.closest(targetImgSelector));
        //
        //     if (targetContainer) {
        //         fillSlider(targetContainer);
        //         slider.classList.add('slider--active');
        //     }
        // });
        if (image) {
            fillSlider(index);
            slider.classList.add('slider--active');
        }
        sliderPrev.addEventListener('click', function () {
            showSlide(currentSlideIndex - 1);
        });

        sliderNext.addEventListener('click', function () {
            showSlide(currentSlideIndex + 1);
        });

        slider.addEventListener('click', function (e) {
            if (e.currentTarget === e.target) {
                // currentSlideIndex=0;
                slider.classList.remove('slider--active');
            }
        });

        function showSlide(slideNumber) {
//     let newSlideNumber = slideNumber % slidesLength;

//     if (newSlideNumber < 0) {
//       newSlideNumber += slidesLength;
//     }

            // currentSlideIndex = newSlideNumber;

            if (slideNumber < slidesLength && slideNumber >= 0) {
                currentSlideIndex = slideNumber;
                sliderWrapper.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
            }
        }

        function fillSlider(imageIndex) {
            //const allProjects = document.querySelectorAll(targetImgSelector),
            // const  imageIndex = projectImages.findIndex(
            //         function(prjEl) {
            //             return prjEl === targetContainer.__data__;
            //         }
            //     ),
            console.log(imageIndex);
            let allSlides = projectImages.map(
                createSlide
            );

            slidesLength = projectImages.length;

            showSlide(imageIndex);

            sliderWrapper.innerText = '';
            sliderWrapper.append.apply(
                sliderWrapper,
                allSlides
            );
        }

        function createSlide(data) {
            const imgSrc = data.src,
                imgDataSrc = data.dataSrc,
                sliderItem = document.createElement('li'),
                sliderImage = document.createElement('img');

            sliderItem.classList.add('slider__item');
            // sliderImage.classList.add('b-lazy');
            // sliderImage.setAttribute('data-src', imgSrc);
            sliderImage.setAttribute('src', imgSrc);
            sliderImage.setAttribute('alt', 'photo');
            sliderItem.append(sliderImage);

            return sliderItem;
        }

        function createSlider() {
            const sliderEl = document.createElement('div'),
                sliderViewboxEl = document.createElement('div'),
                sliderTapeEl = document.createElement('div'),
                sliderWrapperEl = document.createElement('ul'),
                sliderNextEl = document.createElement('button'),
                sliderPrevEl = document.createElement('button');

            sliderEl.classList.add('slider');
            sliderViewboxEl.classList.add('slider__viewbox');
            sliderTapeEl.classList.add('slider__tape');
            sliderWrapperEl.classList.add('slider__wrapper');
            sliderNextEl.classList.add('slider__next');
            sliderPrevEl.classList.add('slider__prev');

            sliderNextEl.innerText = 'Next';
            sliderPrevEl.innerText = 'Prev';

            sliderEl.append(sliderViewboxEl);
            sliderViewboxEl.append(sliderTapeEl, sliderNextEl, sliderPrevEl);
            sliderTapeEl.append(sliderWrapperEl);
            document.body.append(sliderEl);

            return sliderEl;
        }
    }


    // Gallery({
    //     targetImgSelector: '.project',
    //     sliderSelector: '.slider'
    // });
}

initPage();

// let projectImages = [
//     {
//         src: "./img/main/projects/img-1.jpg",
//         dataSrc: "./img/main/projects/data-src/img-1.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-2.jpg",
//         dataSrc: "./img/main/projects/data-src/img-2.jpg",
//         align: "horizontal",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-3.jpg",
//         dataSrc: "./img/main/projects/data-src/img-3.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-4.jpg",
//         dataSrc: "./img/main/projects/data-src/img-4.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-5.jpg",
//         dataSrc: "./img/main/projects/data-src/img-5.jpg",
//         name: "img-5.png",
//         align: "big",
//         aos: "zoom-in"
//         // aos: "zoom-out"
//     },
//     {
//         src: "./img/main/projects/img-6.jpg",
//         dataSrc: "./img/main/projects/data-src/img-6.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-7.jpg",
//         dataSrc: "./img/main/projects/data-src/img-7.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-8.jpg",
//         dataSrc: "./img/main/projects/data-src/img-8.jpg",
//         align: "horizontal",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-9.jpg",
//         dataSrc: "./img/main/projects/data-src/img-9.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-10.jpg",
//         dataSrc: "./img/main/projects/data-src/img-10.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-11.jpg",
//         dataSrc: "./img/main/projects/data-src/img-11.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-12.jpg",
//         dataSrc: "./img/main/projects/data-src/img-12.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-13.jpg",
//         dataSrc: "./img/main/projects/data-src/img-13.jpg",
//         align: "big",
//         aos: "zoom-in"
//         // aos: "zoom-out"
//     },
//     {
//         src: "./img/main/projects/img-14.jpg",
//         dataSrc: "./img/main/projects/data-src/img-14.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-15.jpg",
//         dataSrc: "./img/main/projects/data-src/img-15.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     // {
//     //     src: "./img/main/projects/img-16.jpg",
//     //     class: "horizontal"
//     // },
//     {
//         src: "./img/main/projects/img-17.jpg",
//         dataSrc: "./img/main/projects/data-src/img-17.jpg",
//         align: "big",
//         aos: "zoom-in"
//         // aos: "zoom-out"
//     },
//     // {
//     //     src: "./img/main/projects/img-18.jpg",
//     //     class: "horizontal"
//     // },
//     {
//         src: "./img/main/projects/img-19.jpg",
//         dataSrc: "./img/main/projects/data-src/img-19.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     // {
//     //     src: "./img/main/projects/img-20.jpg",
//     //     class: "horizontal"
//     // },
//     {
//         src: "./img/main/projects/img-21.jpg",
//         dataSrc: "./img/main/projects/data-src/img-21.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-28.jpg",
//         dataSrc: "./img/main/projects/data-src/img-28.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-24.jpg",
//         dataSrc: "./img/main/projects/data-src/img-24.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-23.jpg",
//         dataSrc: "./img/main/projects/data-src/img-23.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-25.jpg",
//         dataSrc: "./img/main/projects/data-src/img-25.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-26.jpg",
//         dataSrc: "./img/main/projects/data-src/img-26.jpg",
//         align: "horizontal",
//         aos: "zoom-in"
//     },
//     {
//         src: "./img/main/projects/img-29.jpg",
//         dataSrc: "./img/main/projects/data-src/img-29.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-22.jpg",
//         dataSrc: "./img/main/projects/data-src/img-22.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-27.jpg",
//         dataSrc: "./img/main/projects/data-src/img-27.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-30.jpg",
//         dataSrc: "./img/main/projects/data-src/img-30.jpg",
//         align: "big",
//         aos: "zoom-in"
//         // aos: "zoom-out"
//     },
//     {
//         src: "./img/main/projects/img-31.jpg",
//         dataSrc: "./img/main/projects/data-src/img-31.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-32.jpg",
//         dataSrc: "./img/main/projects/data-src/img-32.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-33.jpg",
//         dataSrc: "./img/main/projects/data-src/img-33.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-34.jpg",
//         dataSrc: "./img/main/projects/data-src/img-34.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-35.jpg",
//         dataSrc: "./img/main/projects/data-src/img-35.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-36.jpg",
//         dataSrc: "./img/main/projects/data-src/img-36.jpg",
//         align: "horizontal",
//         aos: "zoom-in"
//     },
//     {
//         src: "./img/main/projects/img-37.jpg",
//         dataSrc: "./img/main/projects/data-src/img-37.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-38.jpg",
//         dataSrc: "./img/main/projects/data-src/img-38.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-39.jpg",
//         dataSrc: "./img/main/projects/data-src/img-39.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-40.jpg",
//         dataSrc: "./img/main/projects/data-src/img-40.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-41.jpg",
//         dataSrc: "./img/main/projects/data-src/img-41.jpg",
//         align: "vertical",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-42.jpg",
//         dataSrc: "./img/main/projects/data-src/img-42.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     // {
//     //     src: "./img/main/projects/img-43.jpg",
//     //     class: "vertical"
//     // },
//     {
//         src: "./img/main/projects/img-44.jpg",
//         dataSrc: "./img/main/projects/data-src/img-44.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-45.jpg",
//         dataSrc: "./img/main/projects/data-src/img-45.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-46.jpg",
//         dataSrc: "./img/main/projects/data-src/img-46.jpg",
//         align: "horizontal",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-47.jpg",
//         dataSrc: "./img/main/projects/data-src/img-47.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-48.jpg",
//         dataSrc: "./img/main/projects/data-src/img-48.jpg",
//         align: "horizontal",
//         aos: "zoom-in"
//     },
//     {
//         src: "./img/main/projects/img-49.jpg",
//         dataSrc: "./img/main/projects/data-src/img-49.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-58.jpg",
//         dataSrc: "./img/main/projects/data-src/img-58.jpg",
//         align: "horizontal",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-51.jpg",
//         dataSrc: "./img/main/projects/data-src/img-51.jpg",
//         align: "horizontal",
//         aos: "zoom-in"
//     },
//     {
//         src: "./img/main/projects/img-52.jpg",
//         dataSrc: "./img/main/projects/data-src/img-52.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-53.jpg",
//         dataSrc: "./img/main/projects/data-src/img-53.jpg",
//         align: "horizontal",
//         aos: "zoom-in-up"
//     },
//     {
//         src: "./img/main/projects/img-55.jpg",
//         dataSrc: "./img/main/projects/data-src/img-55.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-54.jpg",
//         dataSrc: "./img/main/projects/data-src/img-54.jpg",
//         align: "horizontal",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-56.jpg",
//         dataSrc: "./img/main/projects/data-src/img-56.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     // {
//     //     src: "./img/main/projects/img-57.jpg",
//     //     class: "horizontal"
//     // },
//     {
//         src: "./img/main/projects/img-50.jpg",
//         dataSrc: "./img/main/projects/data-src/img-50.jpg",
//         align: "horizontal",
//         aos: "zoom-in"
//     },
//     {
//         src: "./img/main/projects/img-43.jpg",
//         dataSrc: "./img/main/projects/data-src/img-43.jpg",
//         align: "vertical",
//         aos: "fade-up"
//     },
//     {
//         src: "./img/main/projects/img-0.jpg",
//         dataSrc: "./img/main/projects/data-src/img-0.jpg",
//         align: "end",
//         aos: "fade-up"
//     }
// ];