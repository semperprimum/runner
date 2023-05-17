const startBtn = document.getElementById("startButton");
const restartBtn = document.getElementById("restartButton");
const firstRunway = document.getElementById("runway1");
const secondRunway = document.getElementById("runway2");
const thirdRunway = document.getElementById("runway3");
const runner = document.getElementById("runner");
const runnerImg = document.getElementById("runner-img");

// MODAL ELEMENTS
const welcomeScreen = document.getElementById("start");
const endScreen = document.getElementById("end");
const errorScreen = document.querySelector(".error");
const successScreen = document.querySelector(".success");

// PLACES
const amazonPlace = document.getElementById("amazon");
const bahiaPlace = document.getElementById("bahia");
const paranaPlace = document.getElementById("parana");
const saoPauloPlace = document.getElementById("saopaulo");
const rioPlace = document.getElementById("rio");

// PANELS
const amazonPanel = document.getElementById("amazonPanel");
const bahiaPanel = document.getElementById("bahiaPanel");
const paranaPanel = document.getElementById("paranaPanel");
const saoPauloPanel = document.getElementById("saopauloPanel");
const rioPanel = document.getElementById("rioPanel");

// GAME VARIABLES
let currentRunway = 2;
let isJumping = false;
let isGameOver = false;
let obstacles = [];

// FUNCTIONS
const startGame = () => {
  welcomeScreen.classList.add("hide");
  runner.classList.add('animate');
  runnerImg.style.opacity = '0';
  generateObstacles();
  moveRunner()
  console.log(obstacles);
  document.addEventListener("keydown", changeRunway);
  document.addEventListener("keydown", jump);
};

const restartGame = () => {
    location.reload();
}

restartBtn.addEventListener("click", restartGame);
startBtn.addEventListener("click", startGame);

const moveRunner = () => {
    const initialPosition = 0;
    const finalPosition = 5100;
    let currentPosition = initialPosition;
    const interval = setInterval(() => {
        if (currentPosition >= finalPosition) {
            clearInterval(interval);
            endScreen.classList.remove("hide");
            successScreen.classList.remove("hide");
            errorScreen.classList.add("hide");
            isGameOver = true;
            return;
        }
        currentPosition += 2;
        runner.style.left = currentPosition + "px";
        climb(currentPosition)
        animatePlaces(currentPosition)
        checkCollision(currentPosition);
    }, 1);
};

const generateObstacles = () => {
    obstacles = [];
    const runways = [firstRunway, secondRunway, thirdRunway];

    if (!isGameOver) {
        for (let i = 1; i <= 3; i++) {
            const randomDistance = Math.ceil(Math.random() * (4400 - 500)) + 500;
            const newObstacle = { runway: i, distance: randomDistance };
            obstacles.push(newObstacle);
        }

        while (obstacles.length < 5) {
            const randomDistance = Math.ceil(Math.random() * (4400 - 500)) + 500;
            const randomRunway = Math.ceil(Math.random() * 3);
            const newObstacle = { runway: randomRunway, distance: randomDistance };
            obstacles.push(newObstacle);
        }
    }

    obstacles.forEach((obstacle) => {
        const obstacleElement = document.createElement("span");
        obstacleElement.classList.add("obstacle");
        obstacleElement.style.transform = `translateX(${obstacle.distance}px)`;
        runways[obstacle.runway - 1].append(obstacleElement);
    });
};


const changeRunway = (event) => {
  if (event.key === "ArrowDown") {
    if (currentRunway < 3) {
      currentRunway++;
    }
  } else if (event.key === "ArrowUp") {
    if (currentRunway > 1) {
      currentRunway--;
    }
  }
  if (currentRunway === 2) {
    runner.style.bottom = "90px";
  } else if (currentRunway === 3) {
        runner.style.bottom = "50px";
  } else if (currentRunway === 1) {
      runner.style.bottom = "120px";
  }
  console.log(currentRunway);
};

const jump = (event) => {
  if (event.key === ' ' && !isJumping && !isGameOver) {
    isJumping = true;
    runner.classList.add("jump");
    runner.classList.remove("animate");
    setTimeout(() => {
      isJumping = false;
      runner.classList.remove("jump");
      runner.classList.add("animate");
    }, 500);
  }
}
const checkCollision = (currentPosition) => {
  obstacles.forEach((obstacle) => {
    if (obstacle.distance === currentPosition && obstacle.runway === currentRunway && !isGameOver && !isJumping) {
        isGameOver = true;
        runner.classList.remove('animate');
        endScreen.classList.remove('hide');
        errorScreen.classList.remove('hide');
        successScreen.classList.add('hide');
        console.log("Game Over");
    }
  })
}

const climb = (distance) => {
    if (distance >= 4700) {
        runner.style.transform = "translateY(-50px)";
    }
    if (distance >= 4800) {
        runner.style.transform = "translateY(-90px)";
    }
    if (distance >= 4900) {
        runner.style.transform = "translateY(-135px)";
    }
}

const animatePlaces = (distance) => {
    if (distance >= 1000) {
        amazonPlace.classList.add("appear");
        amazonPanel.classList.add("appear-panel");
        amazonPanel.style.opacity = '1';
        amazonPlace.style.opacity = '1';
    }
    if (distance >= 1800) {
        bahiaPlace.classList.add("appear");
        bahiaPanel.classList.add("appear-panel");
        bahiaPanel.style.opacity = '1';
        bahiaPlace.style.opacity = '1';
    }
    if (distance >= 2500) {
        paranaPlace.classList.add("appear");
        paranaPanel.classList.add("appear-panel");
        paranaPanel.style.opacity = '1';
        paranaPlace.style.opacity = '1';
    }
    if (distance >= 3400) {
        saoPauloPlace.classList.add("appear");
        saoPauloPanel.classList.add("appear-panel");
        saoPauloPanel.style.opacity = '1';
        saoPauloPlace.style.opacity = '1';
    }
    if (distance >= 4400) {
        rioPlace.classList.add("appear");
        rioPanel.classList.add("appear-panel");
        rioPanel.style.opacity = '1';
        rioPlace.style.opacity = '1';
    }
}