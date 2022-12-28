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

function escapeHTML (str) {
  return new Option(str).innerHTML;
}

function removeTags (str) {
  if ((str===null) || (str==='')) {
    return false;
  }
    
  else {
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }
}


function getParameterByName (name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
const returnPageList = document.getElementById("rlist");

const radmin = document.getElementById("radmin");
let styleGuidePlace = 0;

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

// Page Creation options
const makePage = document.getElementById("make-page");
const cancelCreate = document.getElementById("cancel-create");
const saveCreate = document.getElementById("save-create");
const cpageStatus = document.getElementById("cpage-status");
const pageCreateArea = document.getElementById("cpage-area");
const cpageAuth = document.getElementById("cpage-auth");

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
      pageNum : 1, 
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

wikiToolkit.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-stuff").slideUp();
  $("#wiki-admin-place").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

radmin.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-admin-place").slideUp();
  $("#wiki-stuff").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

const actualStatus = document.getElementById("actual-status");

wikiFlag.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  actualStatus.innerText = "";

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

    else if (data === "long") {
      actualStatus.innerText = "Flagging can only be done every 2 minutes.";
    }

    else if (data === "already") {
      actualStatus.innerText = "This page is already flagged.";
    }

    else {
      actualStatus.innerText = "Something went wrong.";
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

wikiPagelist.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#wiki-stuff").slideUp();
  $("#comp-page-list").slideDown();

  const pageListHTML = document.getElementById("page-list-html");

  fetch ("/get-all-pages", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      name : currentWiki
    })
  })
  .then(response => response.text())
  .then(data => {
    const parsedPages = JSON.parse(data);
    pageListHTML.innerHTML = "";

    for (i = 0; i < parsedPages.length; i++) {
      let defTitle = "";
      let splitTitle = [];

      if (parsedPages[i].includes("<p class='title-marker'></p>") || parsedPages[i].includes('<p class="title-marker"></p>') || parsedPages[i].includes("<p class=title-marker></p>")) {
        if (parsedPages[i].includes("<p class='title-marker'></p>")) {
          splitTitle = parsedPages[i].split("<p class='title-marker'></p>");
        }

        else if (parsedPages[i].includes('<p class="title-marker"></p>')) {
          splitTitle = parsedPages[i].split('<p class="title-marker"></p>');
        }

        else {
          splitTitle = parsedPages[i].split('<p class=title-marker></p>');
        }

        if (splitTitle[0].length > 50) {
          defTitle = splitTitle[0].substring(0, 50);
        }

        else if (splitTitle[0] === "") {
          defTitle = "Un-titled page";
        }

        else {
          defTitle = splitTitle[0];
        }

        console.log(splitTitle);
      }

      else {
        defTitle = "Un-titled page";
      }

      pageListHTML.innerHTML += "<p>Title: " + removeTags(defTitle) + ", Page Number: " + String(i + 1) + "</p>";
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

// Here we will deal with page creation on the client side

makePage.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#comp-page-list").slideUp();
  $("#wiki-page-place").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

cancelCreate.onclick = function () {
  switch (checkDisable) {
    case 1: 
      return false;
  }

  $("#wiki-page-place").slideUp();
  $("#comp-page-list").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

saveCreate.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  fetch ("/create-page", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      auth : cpageAuth.value,
      cont : pageCreateArea.value,
      name : currentWiki
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data === "invalid") {
      cpageStatus.innerText = "Something went wrong.";
    }

    else if (data === "long") {
      cpageStatus.innerText = "Without authorization, you can only create pages every 2 minutes with a limit of 500 characters.";
    }

    else {
      fetch ("/get-all-pages", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          name : currentWiki
        })
      })
     .then(response => response.text())
     .then(data => {
       const parsedPages = JSON.parse(data);
       let oogaLength = parsedPages.length - 1;

       wikiActual.innerHTML = parsedPages[oogaLength];

       $("#wiki-page-place").slideUp();
       $("#wiki-stuff").slideDown();

       cpageStatus.value = "";
       cpageStatus.innerText = "";
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

// Page List Navigation

const pageNav = document.getElementById("plist-nav");
const pageNavNum = document.getElementById("plist-num");

pageNav.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  currentPage = pageNavNum.value;
  
  fetch ("/get-wiki", {
    method : "POST", 
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      pageNum : String(pageNavNum.value), 
      wikiName : currentWiki
    })
  })
  .then(response => response.text())
  .then(data => {
    wikiActual.innerHTML = data;

    $("#comp-page-list").slideUp();
    $("#wiki-stuff").slideDown();
  })
  .catch(error => {
    throw error;
  });

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}


// Admin Toolkit

const adminChangeInput = document.getElementById("admin-change");
const oldAdmin = document.getElementById("old-admin");
const adminChangeBtn = document.getElementById("chagmin");

const modChangeInput = document.getElementById("mod-change");
const modChangePass = document.getElementById("mod-change-pass");
const modChangeBtn = document.getElementById("chagmod");

const urlChangeInput = document.getElementById("url-change");
const urlChangePass = document.getElementById("url-change-pass");
const urlChangeBtn = document.getElementById("chagurl");

const pageDelNum = document.getElementById("page-del-num");
const pageDelPass = document.getElementById("page-del-pass");
const chagPag = document.getElementById("chagpag");

const toolkitStatus = document.getElementById("toolkit-status");

adminChangeBtn.onclick = function () {
  toolkitStatus.innerText = "";
  
  if (oldAdmin.value === "" || oldAdmin.value === null || oldAdmin.value === undefined || adminChangeInput.value === "" || adminChangeInput.value === undefined || adminChangeInput.value === null) {
    toolkitStatus.innerText = "Error: One of your inputs is empty!";
  }

  else {
    fetch ("/change-admin", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        auth : oldAdmin.value, 
        new : adminChangeInput.value, 
        name : currentWiki
      })
    })
    .then(response => response.text())
    .then(data => {
      if (data === "invalid") {
        toolkitStatus.innerText = "Error: Something went wrong...";
      }

      else if (data === "404") {
        toolkitStatus.innerText = "Error: One of your inputs is empty!";
      }

      else if (data === "wrong") {
        toolkitStatus.innerHTML = "Error: Wrong admin password.";
      }

      else {
        toolkitStatus.innerText = "Changed Admin Password.";
        oldAdmin.value = "";
        adminChangeInput.value = "";
      }
    })
    .catch(error => {
      throw error;
    });
  }
}

modChangeBtn.onclick = function () {
  toolkitStatus.innerText = "";
  
  if (modChangePass.value === "" || modChangePass.value === null || modChangePass.value === undefined || modChangeInput.value === "" || modChangeInput.value === undefined || modChangeInput.value === null) {
    toolkitStatus.innerText = "Error: One of your inputs is empty!";
  }

  else {
    fetch ("/change-mod", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        auth : modChangePass.value, 
        new : modChangeInput.value, 
        name : currentWiki
      })
    })
    .then(response => response.text())
    .then(data => {
      if (data === "invalid") {
        toolkitStatus.innerText = "Error: Something went wrong...";
      }

      else if (data === "404") {
        toolkitStatus.innerText = "Error: One of your inputs is empty!";
      }

      else if (data === "wrong") {
        toolkitStatus.innerHTML = "Error: Wrong admin password.";
      }

      else {
        toolkitStatus.innerText = "Changed Mod Password.";
        modChangeInput.value = "";
        modChangePass.value = "";
      }
    })
    .catch(error => {
      throw error;
    });
  }
}

urlChangeBtn.onclick = function () {
  toolkitStatus.innerText = "";
  
  if (urlChangePass.value === "" || urlChangePass.value === null || urlChangePass.value === undefined || urlChangeInput.value === "" || urlChangeInput.value === undefined || urlChangeInput.value === null) {
    toolkitStatus.innerText = "Error: One of your inputs is empty!";
  }

  else {
    fetch ("/change-url", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        auth : urlChangePass.value, 
        new : urlChangeInput.value, 
        name : currentWiki
      })
    })
    .then(response => response.text())
    .then(data => {
      if (data === "invalid") {
        toolkitStatus.innerText = "Error: Something went wrong...";
      }

      else if (data === "404") {
        toolkitStatus.innerText = "Error: One of your inputs is empty!";
      }

      else if (data === "wrong") {
        toolkitStatus.innerHTML = "Error: Wrong admin password.";
      }

      else {
        toolkitStatus.innerText = "Changed Admin Password.";
        modChangeInput.value = "";
        modChangePass.value = "";
      }
    })
    .catch(error => {
      throw error;
    });
  }
}

chagPag.onclick = function () {
  toolkitStatus.innerText = "";
  
  if (pageDelPass.value === "" || pageDelPass.value === null || pageDelPass.value === undefined || pageDelNum.value === "" || pageDelNum.value === undefined || pageDelNum.value === null) {
    toolkitStatus.innerText = "Error: One of your inputs is empty!";
  }

  else {
    fetch ("/del-page", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json" 
      },
      body : JSON.stringify({
        auth : pageDelPass.value, 
        num : parseInt(pageDelNum.value), 
        name : currentWiki
      })
    })
    .then(response => response.text())
    .then(data => {
      if (data === "invalid") {
        toolkitStatus.innerText = "Error: Something went wrong...";
      }

      else if (data === "404") {
        toolkitStatus.innerText = "Error: One of your inputs is empty! (Or page doesn't exist!)";
      }

      else if (data === "wrong") {
        toolkitStatus.innerHTML = "Error: Wrong admin password.";
      }

      else {
        toolkitStatus.innerText = "Deleted Page.";
        modChangeInput.value = "";
        modChangePass.value = "";
      }
    })
    .catch(error => {
      throw error;
    });
  }
}

// Mundane stuff below

returnPageList.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }

  $("#comp-page-list").slideUp();
  $("#wiki-stuff").slideDown();
  
  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

wikiDownload.onclick = function () {
  const downloadFile = new File([wikiActual.innerHTML], 'page.html', {
    type: 'text/plain',
  });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(downloadFile);

  link.href = url;
  link.download = downloadFile.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
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
  switch (styleGuidePlace) {
    case 0:
      $("#wiki-edit-place").slideDown();
      break;
    case 1:
      $("#wiki-page-place").slideDown();
      break;
  }

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
      let bgImg = jargonMargon[2];
      let colorBG = jargonMargon[3];
      
      creationFormStatus.innerText = "";

      if (bgImg === "" || bgImg === null || bgImg === undefined) {
        // do nothing
      }

      else {
        loadBack(bgImg);
      }
      body.style.backgroundColor = colorBG;
      
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

fetch ("/get-all-wikis", {
  method : "POST",
  headers : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    name : "Placeholder Wiki"
  })
})
.then(response => response.text())
.then(data => {
  let kritiKA = JSON.parse(data).reverse();

  for (i = 0; i < kritiKA.length; i++) {
    document.getElementById("public-wiki-list").innerHTML += "<p>" + kritiKA[i] + "</p>";
  }
})
.catch(error => {
  throw error;
});

// URL Params

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const wikiNameParg = urlParams.get('n');
const wikiNumParg = urlParams.get('p');

if (wikiNameParg === null) {
  // Do nothing
}

else {
  if (wikiNumParg === null) {
    fetch ("/get-wiki", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        pageNum : 1, 
        wikiName : wikiNameParg
      })
    })
    .then(response => response.text())
    .then(data => {
      wikiActual.innerHTML = data;

      $("#wiki-create").slideUp();
      $("#wiki-browse").slideUp();
      $("#wiki-edit-place").slideUp();
      $("#style-guide").slideUp();
      $("#comp-page-list").slideUp();
      $("#wiki-page-list").slideUp();
      $("#wiki-admin-place").slideUp();
      $("#info").slideUp();
    
      $("#wiki-stuff").slideDown();
      currentPage = 1;
      currentWiki = wikiNameParg;
    })
    .catch(error => {
      throw error;
    });
  }

  else {
    fetch ("/get-wiki", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        pageNum : wikiNumParg, 
        wikiName : wikiNameParg
      })
    })
    .then(response => response.text())
    .then(data => {
      wikiActual.innerHTML = data;

      $("#wiki-create").slideUp();
      $("#wiki-browse").slideUp();
      $("#wiki-edit-place").slideUp();
      $("#style-guide").slideUp();
      $("#comp-page-list").slideUp();
      $("#wiki-page-list").slideUp();
      $("#wiki-admin-place").slideUp();
      $("#info").slideUp();
    
      $("#wiki-stuff").slideDown();
      currentPage = wikiNumParg;
      currentWiki = wikiNameParg;
    })
    .catch(error => {
      throw error;
    });
  }
}