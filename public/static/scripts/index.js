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

const returnStyleGuide = document.getElementById("rstyle-guide");

// Forms

const creationForm = document.getElementById("creation-form");
const wikiNameCreation = document.getElementById("wiki-name-creation");
const wikiBgCreation = document.getElementById("wiki-bg-creation");
const wikiColorCreation = document.getElementById("wiki-color-creation");
const wikiPubCreation = document.getElementById("wiki-publicity-creation");

// Wiki actual
const wikiActual = document.getElementById("wiki-actual");
let currentWiki = "";
let currentPage = 1;

// Wiki browsing
const publicWikiList = document.getElementById("public-wiki-list");

let checkDisable = 0;

// Wiki tools
const wikiExit = document.getElementById("wiki-exit");
const wikiEdit = document.getElementById("wiki-edit");
const wikiFlag = document.getElementById("wiki-flag");
const wikiDownload = document.getElementById("wiki-download");
const wikiPagelist = document.getElementById("wiki-pagelist");
const wikiToolkit = document.getElementById("wiki-toolkit");
const wikiHome = document.getElementById("wiki-home");

// Editing options
const cancelEdit = document.getElementById("cancel-edit");
const saveEdit = document.getElementById("save-edit");
const editingArea = document.getElementById("editing-area");

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

// Beyond here we will handle Wiki commands

wikiExit.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  fetch ("/get-wiki", {
    method : "POST", 
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      pageNum : "1", 
      wikiName : currentWiki
    })
  })
  .then(response => response.text())
  .then(data => {
    wikiActual.innerHTML = data;
  })
  .catch(error => {
    throw error;
  });

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

const editStatus = document.getElementById("edit-status");

wikiEdit.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-stuff").slideUp();
  $("#wiki-edit-place").slideDown();

  editingArea.value = wikiActual.innerHTML;

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

wikiFlag.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  fetch ("/flag-wiki", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name : currentWiki,
      num : String(currentPage),
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data === "edited") {
      fetch ("/get-wiki", {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          pageNum : String(currentPage), 
          wikiName : currentWiki
        })
      })
      .then(response => response.text())
      .then(data => {
        wikiActual.innerHTML = data;
      })
      .catch(error => {
        throw error;
      });
    }
  })
  .catch(error => {
    throw error;
  });

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

wikiHome.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-stuff").slideUp();
  $("#info").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

// Here we will handle editing.

cancelEdit.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-edit-place").slideUp();
  $("#wiki-stuff").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

saveEdit.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  editStatus.innerText = "";
  
  fetch ("/edit-wiki", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name : currentWiki,
      num : String(currentPage),
      place : editingArea.value
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data === "edited") {
      editStatus.innerText = "Successfully edited.";

      $("#wiki-edit-place").slideUp();
      $("#wiki-stuff").slideDown();

      fetch ("/get-wiki", {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          pageNum : String(currentPage), 
          wikiName : currentWiki
        })
      })
      .then(response => response.text())
      .then(data => {
        wikiActual.innerHTML = data;
      })
      .catch(error => {
        throw error;
      });
    }

    else if (data === "long") {
      editStatus.innerText = "Edits can only be up to 500 characters in difference every 10 minutes.";
    }

    else {
      editStatus.innerText = "Something went wrong.";
    }
  })
  .catch(error => {
    throw error;
  });

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

returnStyleGuide.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#style-guide").slideUp();
  $("#wiki-edit-place").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

// Form submissions
const creationFormStatus = document.getElementById("creation-form-status");

function clearForm () {
  wikiNameCreation.value = "";
  wikiPubCreation.value = "";
  wikiBgCreation.value = "";
  wikiColorCreation.value = "";
}

creationForm.onsubmit = function () {
  event.preventDefault();

  fetch ("/wiki-create", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name : wikiNameCreation.value,
      pub : wikiPubCreation.value, 
      bg : wikiBgCreation.value, 
      color : wikiColorCreation.value
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data === "null") {
      creationFormStatus.innerText = "Don't leave values blank!";
      clearForm();
    }

    else if (data === "speed") {
      creationFormStatus.innerText = "You're creating wikis too fast.";
      clearForm();
    }

    else if (data === "invalid") {
      creationFormStatus.innerText = "That ain't funny.";
      clearForm();
    }

    else if (data === "long") {
      creationFormStatus.innerText = "Your wiki's name or background-image is too long.";
      clearForm();
    }

    else if (data === "exists") {
      creationFormStatus.innerText = "That specific wiki name is taken.";
      clearForm();
    }

    else {
      let jargonMargon = data.split(",");
      let whatAdmin = jargonMargon[0];
      let whatMod = jargonMargon[1];
      
      creationFormStatus.innerText = "";
      $("#wiki-create").slideUp();
      
      currentWiki = wikiNameCreation.value;
      currentPage = 1;

      fetch ("/get-wiki", {
        method : "POST", 
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          pageNum : "1", 
          wikiName : wikiNameCreation.value
        })
      })
      .then(response => response.text())
      .then(data => {
        wikiActual.innerHTML = data + "<hr/><p>P.S. Below are the passwords for Admin access and Mod access respectively.</p><p>These passwords can later be changed in the admin toolkit.</p><hr/><p>Admin Password: " + whatAdmin + "</p><p>Mod Password: " + whatMod + "</p><p>SAVE THEM ON YOUR DEVICE PERMANENTLY!</p><hr/><i class='header'>Don't Panic: These passwords on the Main Page are only visible to you, and are gone when you leave this Wiki Page.</i>";
        $("#wiki-stuff").slideDown();
        clearForm();
      })
      .catch(error => {
        throw error;
      });
    }
  })
  .catch(error => {
    throw error;
  });
}