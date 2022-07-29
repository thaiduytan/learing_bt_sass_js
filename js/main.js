window.addEventListener("load", function () {
    /* Truncate Card Title */
    truncateCardTitle();


    /* Sidebar Mini */
    var toggleBtn = document.querySelector('.sidebarMini__button');
    var sidebarMini = document.querySelector('.sidebarMini');
    var switchBtn = document.querySelector('#checkbox');

    toggleBtn.addEventListener('click', function () {
        sidebarMini.classList.toggle('is-opened');
    });

    switchBtn.addEventListener('click', function () {
        document.querySelector('body').classList.toggle('darkMode');
    });


    // header fixed
    function debounceFn(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this,
                args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    const header = document.querySelector(".header");
    const headerHeight = header && header.offsetHeight;

    window.addEventListener("scroll", debounceFn(function (e) {
        const scrollY = window.pageYOffset;
        if (scrollY >= 300) {
            header && header.classList.add("is-fixed");
            document.body.style.paddingTop = `${headerHeight}px`;
        }
        else {
            header && header.classList.remove("is-fixed");
            document.body.style.paddingTop = 0;
        }
    }, 100)
    );



    // header-moobile
    var headerMobile = document.querySelector(".header-mobile");
    var navToggle = document.querySelector(".navbar-toggler");
    var closeMenu = document.querySelector(".header-mobile__close");
    function debounceClick(fn, delay) {
        let timerId;
        return (...args) => {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }
    navToggle.addEventListener("click", debounceClick(function (e) {
        headerMobile && headerMobile.classList.add("is-show")
    }), 1000);
    closeMenu.addEventListener("click", function (e) {
        headerMobile && headerMobile.classList.remove("is-show");
    })
    document.body.addEventListener("click", function (e) {
        if (!headerMobile.contains(e.target)) {
            headerMobile && headerMobile.classList.remove("is-show");
        }
    })


    // --progress back to top
    let scrollProgress = document.querySelector(".progress");
    let progressValue = document.querySelector(".progress-value");
    // const scrollY = window.pageYOffset;
    window.addEventListener("scroll", function () {
        let pos = document.documentElement.scrollTop;
        if (pos >= 300) {
            scrollProgress.classList.add("is-show");
        } else {
            scrollProgress.classList.remove("is-show");
        }
        let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);
        scrollProgress.style.background = `conic-gradient(#ec5252 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`
    })
    scrollProgress.addEventListener("click", function () {
        // document.documentElement.scrollTop = 0;
        document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

function truncateCardTitle() {
    var cardList = document.getElementsByClassName("card-title");
    console.log(cardList);
    for (var i = 0; i < cardList.length; i++) {
        var text = cardList[i].innerHTML;
        var newText = truncateString(text, 35);
        cardList[i].innerHTML = newText;
    }
}

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}
