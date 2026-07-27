const PUPPIES = [
    {img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg", author: "Golden Trvs Gol twister", src: "Wikipedia", src_link: "https://en.wikipedia.org/wiki/Puppy#/media/File:Golde33443.jpg"},
    {img: "./assets/puppies/double_dirt.jpg", author: "Alireza Zohoor Parvaz", src: "Pexels", src_link: "https://www.pexels.com/photo/close-up-shot-of-puppies-7256826/"},
    {img: "./assets/puppies/bernese_white_background.jpg", author: "Poodles 2 Doodles", src: "Pexels", src_link: "https://www.pexels.com/photo/close-up-photo-of-sitting-puppy-1458926/"},
    {img: "./assets/puppies/sitting_grass.jpg", author: "María JN", src: "Pixels", src_link: "https://www.pexels.com/photo/adorable-puppies-relaxing-on-green-grass-29628210/"},
    {img: "./assets/puppies/running_grass.jpg", author: "Nana_Amigo_Canino", src: "Pixabay", src_link: "https://pixabay.com/photos/dog-puppy-cavalier-running-play-6977210/"},
    {img: "./assets/puppies/hiding_bush.jpg", author: "Nana_Amigo_Canino", src: "Pixabay", src_link: "https://pixabay.com/photos/dog-pet-puppy-canine-animal-fur-6977214/"},
    {img: "./assets/puppies/kiss.jpg", author: "Jackielsy", src: "Pixabay", src_link: "https://pixabay.com/photos/dog-animal-puppy-cute-shiba-9830812/"},
    
    
];
const FONTS = [
    "Arial, sans-serif",
    "Verdana, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Garamond, serif",
    "Courier New, monospace",
    "Brush Script MT, cursive",

]
const PUNCTUATION = [ '', '.', '!', '?', '¿' ]
 
const PUPPY_IMAGE_CONTAINER = document.getElementById("image-container");
const PUPPY_IMAGE = document.getElementById("image");
const PUPPY_IMAGE_AUTHOR = document.getElementById("image-author");
const PUPPY_IMAGE_LINK = document.getElementById("image-link");
const CURRENCY_DISPLAY = document.getElementById("currency");
const RESET_BUTTON = document.getElementById("reset-progress-button");
const RESET_CONFIRM_DIALOG = document.getElementById("confirm-dialog");
const SHOP_BUTTON = document.getElementById("shop-button");
const SHOP = document.getElementById("shop");

const BARK_SFX_PATH = "../assets/dog_bark.mp3";
const CLICK_SFX = new Audio("../assets/click.mp3");

const ARF_OUTER_PADDING = 100;
const ARF_INNER_PADDING = 32;
var currency = get_currency();
var current_image = PUPPIES[0].img;

function set_image_data(image_data) {
    PUPPY_IMAGE.setAttribute("src", image_data.img);
    PUPPY_IMAGE_AUTHOR.innerText = image_data.author;
    PUPPY_IMAGE_LINK.setAttribute("href", image_data.src_link)
    PUPPY_IMAGE_LINK.innerText = image_data.src;
    current_image = image_data.img;
}
function get_currency() {
    let currency = localStorage.getItem("currency");
    if (currency == null) {
        return 0;
    } else {
        return parseInt(currency);
    }
}

function set_currency(amount) {
    localStorage.setItem("currency", amount);
    CURRENCY_DISPLAY.textContent = `${amount}`;

}

function random_element(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function create_arf() {
    var positionX = Math.random() * (window.innerWidth - ARF_OUTER_PADDING);
    var positionY = Math.random() * (window.innerHeight - ARF_OUTER_PADDING);
    var rotation = Math.random() * 120 - 60;
    var scale = (Math.random() * 1.9) + 0.1 ;
    var color = [Math.random() * 128 + 128, Math.random() * 128 + 128 , Math.random() * 128 + 128]

    var arf = document.createElement("p");
    arf.textContent = "Arf" + random_element(PUNCTUATION);
    arf.className = "arf";
    arf.style.position = "absolute";
    arf.style.fontSize = "32px";
    arf.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    arf.style.transform = `
        rotate(${rotation}deg)
        scale(${scale})
    `;
    arf.style.left = `${positionX}px`;
    arf.style.top = `${positionY}px`;
    arf.style.fontFamily = random_element(FONTS);
    arf.style.cursor = "pointer";
    arf.style.userSelect = "none";
    document.body.appendChild(arf);
    return arf;
}

function collides(rect1, rect2) {
    return !(
        rect1.right <= rect2.left - ARF_INNER_PADDING ||
        rect1.left >= rect2.right + ARF_INNER_PADDING ||
        rect1.bottom <= rect2.top - ARF_INNER_PADDING ||
        rect1.top >= rect2.bottom + ARF_INNER_PADDING
    )
}

function click_arf(event) {
    let arf = event.target;
    CLICK_SFX.play();
    currency += 1;
    set_currency(currency);
    arf.remove();
}

CURRENCY_DISPLAY.textContent = `${currency}`;

PUPPY_IMAGE.addEventListener("click", () => {
    var new_data = random_element(PUPPIES);
    while (new_data.img == current_image) {
        new_data = random_element(PUPPIES);
    }
    set_image_data(new_data);
    let bark = new Audio(BARK_SFX_PATH);
    
    bark.preservesPitch = false;
    bark.playbackRate = 0.8 + (Math.random() * 0.4);
    bark.play();

    var arf = create_arf();
    var arf_rect = arf.getBoundingClientRect();
    while (collides(arf_rect, PUPPY_IMAGE.getBoundingClientRect()) || collides(arf_rect, RESET_BUTTON.getBoundingClientRect())) {
        var positionX = Math.random() * (window.innerWidth - ARF_OUTER_PADDING);
        var positionY = Math.random() * (window.innerHeight - ARF_OUTER_PADDING);
        arf.style.left = `${positionX}px`;
        arf.style.top = `${positionY}px`;
        arf_rect = arf.getBoundingClientRect();
    } 
    arf.addEventListener("click", click_arf);    
})

RESET_BUTTON.addEventListener("click", () => {
    RESET_CONFIRM_DIALOG.style.display = "flex";
});

RESET_CONFIRM_DIALOG.querySelector("#confirm-button").addEventListener("click", () => {
    localStorage.clear();
    location.reload()
});
RESET_CONFIRM_DIALOG.querySelector("#cancel-button").addEventListener("click", () => {
    RESET_CONFIRM_DIALOG.style.display = "none";
});

SHOP_BUTTON.addEventListener("click", () => {
    SHOP.classList.toggle("open");
    var open = SHOP.classList.contains("open");
    SHOP.inert = !open;
});

document.addEventListener("mousedown", (event) => {
    if (event.detail > 1) {
        event.preventDefault();
    }
});