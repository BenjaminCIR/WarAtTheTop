window.addEventListener('scroll', function() {
    var scrollPosition = window.pageYOffset;
    var backgroundPosition = "center " + (-scrollPosition / 3) + "px";
    document.querySelector('.background').style.backgroundPosition = backgroundPosition;
});

function scrollToBloc2() {
  var bloc2 = document.getElementById('bloc2');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc3() {
  var bloc2 = document.getElementById('bloc3');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc4() {
  var bloc2 = document.getElementById('bloc4');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc5() {
  var bloc2 = document.getElementById('bloc5');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc6() {
  var bloc2 = document.getElementById('bloc6');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc7() {
  var bloc2 = document.getElementById('bloc7');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}
function scrollToBloc8() {
  var bloc2 = document.getElementById('bloc8');
  bloc2.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
  var scrollToTopButton = document.getElementById('scrollToTopButton');
  if (window.pageYOffset > 100) {
    scrollToTopButton.classList.add('active');
  } else {
    scrollToTopButton.classList.remove('active');
  }
});

document.getElementById('scrollToTopButton').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});