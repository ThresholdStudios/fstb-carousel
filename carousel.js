$(document).ready(function () {
  const cards = $('.card');
  const carouselImage = $('#carouselImage');
  const cardCount = cards.length;
  let currentIndex = 0;
  let interval; // Global variable to store the interval ID

  function showImage(index) {
    const imageUrl = cards.eq(index).data('image');
    carouselImage.fadeOut(250, function () {
      $(this).attr('src', imageUrl).fadeIn(500); // Fade out and then fade in
    });
  }

  function startTimer(index) {
    const progressBar = cards.eq(index).find('.progress-bar');
    let progress = 0;
    progressBar.width(0).css('opacity', 1);

    interval = setInterval(function () {
      progress += 100/100; // 5 seconds for each card
      progressBar.width(`${progress}%`);

      if (progress >= 100) {
        clearInterval(interval);
         progressBar.css('opacity', 0);
         currentIndex = (index + 1) % cardCount;
         showImage(currentIndex);
          setCurrentCard(currentIndex);
          startTimer(currentIndex);
        // Delay the reset by 0.5 seconds
        setTimeout(function () {
          progressBar.width(0);
          
          
        }, 500);
      }
    }, 40);
  }

  function setCurrentCard(index) {
    cards.removeClass('active');
    cards.eq(index).addClass('active');
  }

  cards.on('click', function () {
    const clickedIndex = $(this).index();

    // Reset the progress bar and clear the interval of the current card
    clearInterval(interval);
    cards.eq(currentIndex).find('.progress-bar').width(0).css('opacity', 0);

    showImage(clickedIndex);
    setCurrentCard(clickedIndex);
    currentIndex = clickedIndex;
    startTimer(clickedIndex);
  });

  // Initial setup
  showImage(0);
  setCurrentCard(0);
  startTimer(0);
});
