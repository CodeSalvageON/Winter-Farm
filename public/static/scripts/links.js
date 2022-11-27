const styleGuideLink = document.getElementById("style-guide-link");

styleGuideLink.onclick = function () {
  switch (checkDisable) {
    case 1:
      return false;
  }
  
  $("#wiki-edit-place").slideUp();
  $("#style-guide").slideDown();

  checkDisable = 1;
  setTimeout(function () {
    checkDisable = 0;
  }, 500);
}