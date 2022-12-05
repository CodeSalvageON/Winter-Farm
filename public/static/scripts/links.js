const styleGuideLink = document.getElementById("style-guide-link");
const styleGuideLink2 = document.getElementById("style-guide-link2");

styleGuideLink.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#wiki-edit-place").slideUp();
  $("#style-guide").slideDown();

  styleGuidePlace = 0;

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}

styleGuideLink2.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#wiki-page-place").slideUp();
  $("#style-guide").slideDown();

  styleGuidePlace = 1;

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}