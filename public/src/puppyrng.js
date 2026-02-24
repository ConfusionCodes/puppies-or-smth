const PUPPIES = [
    "https://i.imgur.com/40nPh.jpeg",
    "https://images.puppies.com/processed/fba5b9b3-2513-44a0-a61c-09e4aa67de80/listing/a0ad617a-1e67-4c9f-8e71-7d89f87db8fe/76d8573b-4a3a-4fde-9ad6-99fbf791d352-opt.webp",
    "https://preview.redd.it/adopted-this-little-dude-today-needs-a-name-12-weeks-old-v0-vyl964z4xabg1.jpg?width=1080&crop=smart&auto=webp&s=f242397a4182485ce4a76ac13b1a590d707a6e4b",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/250px-Golde33443.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg/250px-Cara_de_quem_caiu_do_caminh%C3%A3o..._%28cropped%29.jpg",
    "https://eskipaper.com/images/adorable-puppies-1.jpg",
    "https://i.ytimg.com/vi/PqweYCDi3uc/maxresdefault.jpg",
    "http://www.iheartteacups.com/wp-content/uploads/2017/11/IMG_6958.jpg",
    "http://www.iheartteacups.com/wp-content/uploads/2016/09/IMG_7801.jpg",
    "https://miniteacuppups.com/wp-content/uploads/2020/11/Soonyi-Female-Teacup-Morkie-1-1024x1024.jpg",
    "https://wallpapers.com/images/hd/cute-puppies-pictures-iq9esw6nily31v5g.jpg",
    "https://i.pinimg.com/originals/87/07/cf/8707cff9dfdaf60143317263a20d6909.jpg",
    "https://i.pinimg.com/originals/a8/20/f6/a820f6e2b86f678febc855972223bc6a.jpg"
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
const PUNCTUATION = [ '', '.', '!', '?' ]

function random_element(list) {
    return list[Math.floor(Math.random() * list.length)]
}

const PUPPY_IMAGE = document.getElementById("puppy-image");
PUPPY_IMAGE.addEventListener("click", () => {
    let current_image = PUPPY_IMAGE.getAttribute("src");
    var new_image = random_element(PUPPIES);
    while (new_image == current_image) {
        new_image = random_element(PUPPIES);
    }
    PUPPY_IMAGE.setAttribute("src", new_image);
    
    const BARK = new Audio("../assets/dog-bark.mp3");
    BARK.preservesPitch = false;
    BARK.playbackRate = 0.8 + (Math.random() * 0.4);
    BARK.play();

    const PADDING = 100;
    var positionX = Math.random() * (window.innerWidth - PADDING) - ((window.innerWidth - PADDING) / 2);
    var positionY = Math.random() * (window.innerHeight - PADDING);
    var rotation = Math.random() * 120 - 60;
    var scale = Math.random() * 2;
    var color = [Math.random() * 128 + 128, Math.random() * 128 + 128 , Math.random() * 128 + 128]
    var arf = document.createElement("p");
    arf.textContent = "Arf" + random_element(PUNCTUATION);
    arf.className = "arf";
    arf.style.position = "absolute";
    arf.style.fontSize = "32px";
    arf.style.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    arf.style.transform = `
        translate(${positionX}px, ${positionY}px)
        rotate(${rotation}deg)
        scale(${scale})
    `;
    arf.style.fontFamily = random_element(FONTS)
    document.body.appendChild(arf);
})
