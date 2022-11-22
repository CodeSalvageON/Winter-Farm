const body = document.body;

function loadBack (backSrc) {
  let newImg = new Image();

  newImg.onload = function () {
    body.style.backgroundImage = "url('" + newImg.src + "')";
  }
  newImg.src = backSrc;
}

function waitForElement(querySelector, timeout){
  return new Promise((resolve, reject)=>{
    var timer = false;
    if(document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(()=>{
      if(document.querySelectorAll(querySelector).length){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}

waitForElement("body", 3000).then(function () {
  loadBack("/static/img/oia.jpeg");
}).catch(() => {
  console.log("Error: did not load!");
});

// Buttons

const createBtn = document.getElementById("create");
const browseBtn = document.getElementById("browse");

const returnCreate = document.getElementById("rcreate");
const returnBrowse = document.getElementById("rbrowse");

// Forms

const creationForm = document.getElementById("creation-form");
const wikiNameCreation = document.getElementById("wiki-name-creation");
const wikiBgCreation = document.getElementById("wiki-bg-creation");
const wikiColorCreation = document.getElementById("wiki-color-creation");
const wikiPubCreation = document.getElementById("wiki-publicity-creation");

let checkDisable = 0;

createBtn.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#info").slideUp();
  $("#wiki-create").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

returnCreate.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#wiki-create").slideUp();
  $("#info").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

browseBtn.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#info").slideUp();
  $("#wiki-browse").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

returnBrowse.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#wiki-browse").slideUp();
  $("#info").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

// Form submissions

creationForm.onsubmit = function () {
  event.preventDefault();

  
}