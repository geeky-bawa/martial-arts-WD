var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let positionStart = { 1: -80 };
let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};
let imagePath = (frameNumber, animation) => {
    return "images/" + animation + "/" + frameNumber + ".png";
};
let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    forward: [1, 2, 3, 4, 5, 6],
    backward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
    let images = { idle: [], kick: [], punch: [], forward: [], backward: [] };
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "forward", "backward"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad += animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad -= 1;
                if (imagesToLoad === 0) {
                    callback(images);
                }
            });
        });
    });
};
let animate = (ctx, images, animation, callback) => {
    if (animation == "backward" && positionStart[1] > -80) {
        positionStart[1] -= 40;
    } else if (animation == "forward" && positionStart[1] < 360) {
        positionStart[player] += 40;
    }

    console.log(positionStart);

    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(positionStart[1], 0, 500, 500);
            ctx.drawImage(image, positionStart[1], 0, 500, 500);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queuedAnimations = [];

    let aux = () => {
        let selectedAnimation;

        if (queuedAnimations.length === 0) {
            selectedAnimation = "idle";
        } else {
            selectedAnimation = queuedAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };

    aux();
    document.getElementById("kick").onclick = () => {
        queuedAnimations.push("kick");
    };

    document.getElementById("punch").onclick = () => {
        queuedAnimations.push("punch");
    };

    document.getElementById("forward").onclick = () => {
        queueAnimation.push("forward");
    };
    document.getElementById("backward").onclick = () => {
        queueAnimation.push("backward");
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key;

        if (key === "ArrowUp") {
            queuedAnimations.push("kick");
        } else if (key === "ArrowDown") {
            queuedAnimations.push("punch");
        } else if (key === "ArrowRight") {
            queueAnimation.push("forward");
        } else if (key === "ArrowLeft") {
            queueAnimation.push("backward");
        }
    });
});