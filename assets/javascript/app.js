$(document).ready(function() {
  const questions = [
    {
      q: 'Where in the world is the largest tree?',
      options: ['Amazon Rainforest', 'Sequoia National Park, CA', 'South Africa'],
      correctAnswer: 1,
      funFact: "The largest tree in the world is a giant sequoia in California's Sequoia National Park called General Sherman. The tree is about 275 feet tall and 36.5 feet wide at the base. (source: wikipedia)",
    },
    {
      q: 'What is the largest lake in the world?',
      options: ['Lake Victoria, Africa', 'Lake Huron, US', 'Lake Superior, US'],
      correctAnswer: 2,
      funFact: "Lake Superior is known as the world's largest freshwater lake by surface area. The Caspian Sea is sometimes considered the world's largest lake, but it contains an oceanic basin. (source: wikipedia)",
    },
    {
      q: 'What is the longest bridge in the world?',
      options: ['Chesapeake Bay Bridge-Tunnel, US', 'Danyang–Kunshan Grand Bridge, China', 'Bang Na Expressway, Thailand'],
      correctAnswer: 1,
      funFact: "The Danyang–Kunshan Grand Bridge is the world's longest bridge. It is a 102.4 mile long viaduct on the Beijing–Shanghai High-Speed Railway. (source: wikipedia)",
    },
    {
      q: 'What is the tallest building in the world?',
      options: ['Burj Khalifa, UAE', 'Abraj Al-Bait Clock Tower, Saudi Arabia', 'Shanghai Tower, China'],
      correctAnswer: 0,
      funFact: "The Burj Khalifa is the world's tallest building. It was built in 2010, has 163 floors and is 2,717 feet (828 meters) tall. That's nearly 700 feet taller than the second highest builing, the Shanghai Tower!",
    },
  ];

  let score = 0;
  const questionsArray = [questions[0].q, questions[1].q, questions[2].q, questions[3].q];
  let qIndex = 0;

  function updateScore() {
    $('#score').text(`Score: ${score} out of ${questionsArray.length}`);
  }

  let timeLeft = 15;
  let timer;

  $('#timer').text(timeLeft);

  function displayQuestion() {
    function startTimer() {
      timer = setInterval(function() {
        $('#timer').text(timeLeft);
        if (timeLeft === 0) {
          setTimeout(function() {
            $('#status').empty();
            timeLeft = 15; // test line
            $('#timer').text(timeLeft); // test line
            displayQuestion();
          }, 4000);
          clearInterval(timer);
          $('#status').text(`Sorry you're out of time! ${questions[qIndex].funFact}`);
          qIndex++;
        } else {
          timeLeft--;
        }
      }, 1000);
    }

    if (qIndex <= (questionsArray.length - 1)) {
      updateScore();
      $('#score').text(`Score: ${score} out of ${questionsArray.length}`);
      $('#question').text(questionsArray[qIndex]);
      $('#option1').text(questions[qIndex].options[0]);
      $('#option2').text(questions[qIndex].options[1]);
      $('#option3').text(questions[qIndex].options[2]);
      clearInterval(timer);
      startTimer();
    } else {
      $('#question').text('Game Over!');
      $('#option1').empty();
      $('#option2').empty();
      $('#option3').empty();
      $('#timer').empty();
      if (score >= 3) {
        $('#score').text(`Great job! Your final score is ${score} out of ${questionsArray.length}`);
      } else {
        $('#score').text(`You only got ${score} out of ${questionsArray.length} correct! Better luck next time!`);
      }
    }
  }

  $('.option').on('click', function() {
    if (qIndex === questionsArray.length) {
      return;
    }

    const optionSelected = $(this).index();
    if (optionSelected === questions[qIndex].correctAnswer) {
      setTimeout(function() {
        $('#status').empty();
        timeLeft = 15; // test line
        $('#timer').text(timeLeft); // test line
        displayQuestion();
      }, 4000);
      clearInterval(timer);
      $('#status').text(`Correct! ${questions[qIndex].funFact}`);
      qIndex++;
      score++;
    } else if (optionSelected !== questions[qIndex].correctAnswer) {
      setTimeout(function() {
        $('#status').empty();
        displayQuestion();
      }, 4000);
      clearInterval(timer);
      $('#status').text(`Sorry! ${questions[qIndex].funFact}`);
      qIndex++;
    }
  });

  displayQuestion();
});
