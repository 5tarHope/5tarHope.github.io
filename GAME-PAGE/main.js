import {
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { db } from "../SIGNUP-PAGE/firebase.js";

export let userInfo = JSON.parse(localStorage.getItem("user"));
export function save(location) {
  console.log("Start Saving");

  localStorage.setItem("user", JSON.stringify(userInfo));
  set(ref(db, "users/" + localStorage.getItem("UID")), userInfo).then(() => {
    if (location == "signup") {
      window.location.pathname = "/SIGNUP-PAGE/signup.html";
    } else if (location == "shop") {
      window.location.pathname = "/SHOP-PAGE/shop.html";
    } else if (location == "game") {
      window.location.pathname = "/GAME-PAGE/main.html";
    }
  });
}

//Sound from Zapsplat.com
let build = new Audio("/SOUNDS/building.mp3");
let onloadMusic = new Audio("/SOUNDS/onload.mp3");
let bgm1 = new Audio("/SOUNDS/bgm.mp3");
let bgm2 = new Audio("/SOUNDS/bgm 2.mp3");
let bgm3 = new Audio("/SOUNDS/bgm 3.mp3");

onloadMusic.volume = 0.5;
onloadMusic.play();

//getting values from html
const cityLayout = document.querySelector(".city-layout"); //the playfield
const shopBtn = document.querySelector(".fa-cart-shopping");

//level indicator
const levelIndicator = document.querySelector(".circle");
const levelProgressBar = document.querySelector(".level-progress");

//terminal
const terminalResultsCont = document.querySelector("#terminalResultsCont");
const terminalTextInput = document.querySelector("#terminalTextInput");
const terminalResultWrapper = document.querySelector(".terminalResultWrapper");
const sendBtn = document.querySelector("#sendBtn");
let terminalInput;
let option; //for displaying the options for the qn
let alertIntervalCount = 0; //for counting the number of times user += suspoints so the alerts are not appearing that often
let developmentCount = 0;
let questionsDB = getQuestions();
let arrayOfQuestions;

//Chat History
let chatHistory = "";
let previousMessage = 0; //the number of times the arrow up button was pressed

const returnBtn = document.getElementById("return");
const noinnoText =
  "Nothing happened, just like the Lore dictated. Clearly, the humans have run out of innovation so they can no longer Develop this area.";
const nofavorsText =
  "Hey, hey, hold on, User! You still have to answer a few more questions! To Develop an area, you need Sus Points. Slow down and level up first, got it?";

async function getQuestions() {
  console.log("Getting Qns");
  let getData = new Promise(function (resolve) {
    get(child(ref(db), "questions"))
      .then((snapshot) => {
        console.log("Done.");
        resolve(Object.values(snapshot.val()));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  let questions = await getData;
  return questions;
}

//educational cutscene functions
function redirectToYoutubeERP() {
  window.open("https://www.youtube.com/watch?v=EE6sSf4QAsg");
}

function imageOverlay(imageSource, imageElement) {
  imageElement.src = imageSource; //source of image
  cityLayout.appendChild(imageElement);
  imageElement.classList.add("overlay-image");
}

function updateOverlay() {
  //DISPLAY BLIMP OVERLAY IMAGES
  if (userInfo.shopItems.includes("blimpBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-BLIMP.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("PineappleManBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-PINEAPPLE-MAN.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("windowBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-WINDOW.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("alienBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-ALIEN.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("floatBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-FLOATIE.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("graffitiBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-GRAFFITI.png",
      document.createElement("img")
    );
  }
  //DISPLAY PINEAPPLE MAN OVERLAY IMAGES
  if (userInfo.shopItems.includes("umbrellasBought")) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/SHOP-UMBRELLAS.png",
      document.createElement("img")
    );
  }
  //DISPLAYING ROAD OVERLAY IMAGES UPON LOADING
  if (userInfo.roadLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-ROAD-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.roadLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-ROAD-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING FACTORY OVERLAY IMAGES UPON LOADING
  if (userInfo.factoryLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-FACTORY-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.factoryLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-FACTORY-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING OFFICES OVERLAY IMAGES UPON LOADING
  if (userInfo.officesLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-OFFICES-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.officesLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-OFFICES-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING COAST OVERLAY IMAGES UPON LOADING
  if (userInfo.coastLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-COAST-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.coastLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-COAST-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING LANDFILL OVERLAY IMAGES UPON LOADING
  if (userInfo.landfillLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-LANDFILL-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.landfillLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-LANDFILL-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING GAS STATION OVERLAY IMAGES UPON LOADING
  if (userInfo.gasstationLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-GAS STATION-1.png",
      document.createElement("img")
    );
  }
  if (userInfo.gasstationLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/DEV-GAS STATION-2.png",
      document.createElement("img")
    );
  }
  //DISPLAYING PARK OVERLAY IMAGES UPON LOADING
  if (userInfo.parkLevel > 2) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/PARK-stage 1.png",
      document.createElement("img")
    );
  }
  if (userInfo.parkLevel > 3) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/PARK-stage 2.png",
      document.createElement("img")
    );
  }
  if (userInfo.parkLevel >= 4) {
    imageOverlay(
      "/DEVELOPMENT-PROJ-SERVE/PARK-stage 3.png",
      document.createElement("img")
    );
  }
}

class Dialogue {
  constructor(character, dialogueContent) {
    this.character = character;
    this.dialogueContent = dialogueContent;
  }

  //Method to create a dialogue in the terminal
  createTextInTerminal() {
    let dialogue = document.createElement("p");
    dialogue.textContent = this.dialogueContent;
    if (this.character == "CAS") {
      dialogue.style.color = "#44dcfa";
    } else if (this.character == "POL") {
      dialogue.style.color = "white";
    } else if (this.character == "QUESTION") {
      dialogue.style.color = "yellow";
    } else {
      console.log(
        "Error: Character is wrongly defined. It must either be CAS or POL"
      );
    }
    setTimeout(function () {
      if (terminalResultsCont && terminalResultWrapper) {
        terminalResultsCont.append(dialogue);
        terminalResultWrapper.scrollTop =
          terminalResultWrapper.scrollHeight -
          terminalResultWrapper.clientHeight; //MOVES THE TEXT UP
      }
    }, 200);
  }
}

function sayText(theTextContent, character) {
  let newDialogue = new Dialogue(character, theTextContent);
  newDialogue.createTextInTerminal();
}

shopBtn.addEventListener("click", () => {
  save("shop");
});

returnBtn.addEventListener("click", () => {
  save("signup");
});

window.addEventListener("beforeunload", () => {
  save("signup");
}); // when the user is about to close the tab

window.addEventListener("hashchange", () => {
  save("signup");
}); // when the url changes

function sendInput() {
  terminalInput = terminalTextInput.value;
  switch (terminalInput) {
    case "/help":
      //display all the commands

      sayText(
        "If you ever need an in-depth tutorial of the game, you can use the command [/tutorial] for more information. Our president, Mr. Nosae, will guide you through the game and provide helpful tips and insights.",
        "CAS"
      );
      sayText(
        "Pro Tip: Pressing the up arrow allows you to view your command history.",
        "POL"
      );

      break;
    case "/q":
      window.isQuestionAnswered = false;
      window.randomQn = Math.floor(Math.random() * arrayOfQuestions.length);
      //display question
      sayText(
        `Question: ${arrayOfQuestions[window.randomQn].question}`,
        "QUESTION"
      );
      // console.log(arrayOfQuestions[window.randomQn].correctAnswer);
      //display options
      for (
        let i = 1;
        i < arrayOfQuestions[window.randomQn].choices.length + 1;
        i++
      ) {
        switch (i) {
          case 1:
            option = arrayOfQuestions[window.randomQn].choices[0].text;
            break;
          case 2:
            option = arrayOfQuestions[window.randomQn].choices[1].text;
            break;
          case 3:
            option = arrayOfQuestions[window.randomQn].choices[2].text;
            break;
          case 4:
            option = arrayOfQuestions[window.randomQn].choices[3].text;
            break;
        }
        sayText(`Option ${i}: ${option}`, "QUESTION");
      }
      break;
    case "/1":
      if (window.isQuestionAnswered == false)
        checkForCorrectAns(terminalInput, window.randomQn);
      else dontUnderstand();
      break;
    case "/2":
      if (window.isQuestionAnswered == false)
        checkForCorrectAns(terminalInput, window.randomQn);
      else dontUnderstand();
      break;
    case "/3":
      if (window.isQuestionAnswered == false)
        checkForCorrectAns(terminalInput, window.randomQn);
      else dontUnderstand();
      break;
    case "/4":
      if (window.isQuestionAnswered == false)
        checkForCorrectAns(terminalInput, window.randomQn);
      else dontUnderstand();
      break;
    case "/tutorial":
      window.open("https://youtu.be/1M4iZHjBWB4");
      break;
    case "":
      break;
    default:
      const userInput = terminalInput; // Replaced with the user input string
      const hasProfanity = profanities.some((profanity) =>
        userInput.includes(profanity)
      );

      if (hasProfanity) {
        // Handle the presence of profanity

        profanityDetected();
      } else {
        dontUnderstand();
        break;
      }
  }
  terminalTextInput.value = ""; //RESETS THE INPUT

  if (developmentCount == 12) {
    gameEnd(); //to show that no longer can level up
  }
}

function saveChat() {
  chatHistory += terminalInput += "||"; // || is the sign for separating chats
  localStorage.setItem("chat-history", chatHistory);
}
function updateChat() {
  let chatHistoryUpdate = localStorage.getItem("chat-history"); //Getting updated value of chat history
  if (chatHistoryUpdate != null) {
    window.eachCommand = chatHistoryUpdate.split("||"); //Creates an array of each command
  }
}

function dontUnderstand() {
  sayText("Unfortunately, we don't understand you.", "CAS");
  sayText(
    "Ignore her, what we mean is *please use commands that exist.*",
    "POL"
  );
}

function profanityDetected() {
  sayText("HEY! Watch your language.", "CAS");
  sayText("YOU BEST MIND THAT TONGUE OF YOURS, YOU ROGUISH RASCAL!", "POL");
  sayText("Must you outdo me every time???", "CAS");
  sayText("Yes, yes CAS I must.", "POL");
}

function levelUp() {
  sayText(
    "Hey hey, guess who got enough Sus Points, and can now develop a little special something? You! Go on, type /develop, choose a grid from the selections, then /(grid name) to develop one of the grids...",
    "CAS"
  );
  sayText("Enter /help if you forgot the grid.", "POL");
  sayText(
    "That's such a nice reminder, POL! If only you were this nice at my wedding...",
    "CAS"
  );
}

function resetGame() {
  // Update Values
  userInfo.level = 0;
  userInfo.favor = 0;
  userInfo.levelProgress = 0;
  terminalTextInput.value = "";

  // Updates UI
  levelIndicator.textContent = userInfo.level;
  levelProgressBar.style.width = userInfo.levelProgress + "%";

  while (cityLayout.children.length > 1) {
    cityLayout.removeChild(cityLayout.lastChild);
  }
  // while (terminalResultsCont.children.length > 0) {
  //   terminalResultsCont.removeChild(terminalResultsCont.lastChild);
  // }
  sayText("CAS is online", "CAS");
  sayText("POL is online", "POL");
}

function gameEnd() {
  if (confirm("Continue the time loop?")) {
    resetGame();
  } else {
    alert("Alright, well - we can just, stone.");
    if (confirm("Are you sure?")) {
      alert("Alright, fine.");
    } else {
      resetGame();
    }
  }
}

function checkForCorrectAns(terminalInput, randomQn) {
  if (terminalInput == `/${arrayOfQuestions[randomQn].correctAnswer}`) {
    //IF ANSWER IS CORRECT
    sayText("Correct!", "CAS");
    console.log("Updating Green Points");
    updateGreenpoints();
    if (userInfo.levelProgress > 50) {
      userInfo.level += 1;
      userInfo.favor += 1;
      levelUp();
      if (userInfo.favor > 1 && developmentCount < 12) {
        if (alertIntervalCount == 3) {
          alert(
            "Do you want to develop your city? Try /develop, choosing a grid from the selection, then /(grid name)!"
          );
          alertIntervalCount = 1;
        } else {
          alertIntervalCount += 1;
        }
      }
      userInfo.greenpoints += roundNearest5(20 / userInfo.level);

      if (userInfo.level % 4 == 0) {
        //IF LEVEL IS 4, 8, OR 12 -> UPDATE THE PARK
        switch (userInfo.parkLevel) {
          case 2:
            sayText(
              "It seems like... they have developed the park. By themselves.",
              "POL"
            );
            sayText(
              "Hm, just thinking. Why do they place it everywhere? I mean, what exactly do they hope to gain by putting such eyesores all over the place. There's no point for them, anyways, not when there's no Sun in here.",
              "POL"
            );
            break;
          case 3:
            sayText(
              "It seems like... they have developed the park. By themselves. Again.",
              "POL"
            );
            break;
          case 4:
            sayText("Are- are those birds???", "POL");
            break;
        }
        userInfo.parkLevel += 1;
        build.play();
      }
      userInfo.levelProgress = 0; //RESETS THE LEVEL PROGRESS BAR
    } else {
      // levelProgress == 75 ? (levelProgress += 99) : (levelProgress += 99);
      userInfo.levelProgress += 99;
      // console.log(userInfo.levelProgress);
    }
    levelIndicator.textContent = userInfo.level;
    levelProgressBar.style.width = userInfo.levelProgress + "%";
  } else {
    sayText("Incorrect. Another question.", "CAS");

    sayText(
      "Of course, even Divine humans like you fail eventually, User.",
      "POL"
    );

    //nothing happens if they get it wrong
  }
  window.isQuestionAnswered = true;
}

function roundNearest5(num) {
  return Math.round(num / 5) * 5;
}

function updateGreenpoints() {
  userInfo.greenpoints += 5;
  sayText(
    "You have 5 more Leaf Stickers, now! Rewards are a crucial part of the conditioning process. They get so many results with subjects; trust me, I'd know!",
    "POL"
  );
}

//ON LOAD
if (window.location.pathname == "/GAME-PAGE/main.html") {
  updateChat();
  getQuestions();

  questionsDB
    .then(function (questions) {
      //QUESTIONS LOADED
      console.log("Questions Loaded");
      arrayOfQuestions = questions;
      sendBtn.addEventListener("click", sendInput);
      document.addEventListener("keydown", function (e) {
        switch (e.key) {
          case "ArrowUp":
            if (previousMessage + 1 < window.eachCommand.length) {
              previousMessage += 1;
              terminalTextInput.value = eachCommand[previousMessage];
            }
            break;
          case "ArrowDown":
            if (previousMessage - 1 >= 0) {
              previousMessage -= 1;
              terminalTextInput.value = eachCommand[previousMessage];
            }
            break;
          case "Enter":
            sendInput();
            saveChat();
            previousMessage = 0;
            break;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });

  shopBtn.addEventListener("click", () => {});

  onloadMusic.addEventListener("ended", () => {
    bgm1.volume = 0.5;
    bgm1.play();
  });
  bgm1.addEventListener("ended", () => {
    bgm2.volume = 0.5;
    bgm2.play();
  });
  bgm2.addEventListener("ended", () => {
    bgm3.volume = 0.5;

    bgm3.play();
  });

  updateOverlay();
  // Update developmentCount upon loading
  developmentCount =
    userInfo.roadLevel -
    2 +
    (userInfo.factoryLevel - 2) +
    (userInfo.officesLevel - 2) +
    (userInfo.landfillLevel - 2) +
    (userInfo.coastLevel - 2) +
    (userInfo.gasstationLevel - 2);

  sayText("CAS is online", "CAS");
  sayText("POL is online", "POL");
}
