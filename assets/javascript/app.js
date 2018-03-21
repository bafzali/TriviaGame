$(document).ready(function() {
  const questions = [
    {
      q: 'Where is the largest tree in the world?',
      options: ['Amazon Rainforest', 'California', 'South Africa'],
      correctAnswer: 1,
      funFact: "The largest tree in the world is a giant sequoia in California's Sequoia National Park called General Sherman. The tree is about 275 feet tall and 36.5 feet wide at the base. (source: wikipedia)",
    },
    {
      q: 'What is the largest lake in the world?',
      options: ['Lake Victoria, Africa', 'Lake Huron, United States', 'Lake Superior, United States'],
      correctAnswer: 2,
      funFact: "Lake Superior is known as the world's largest freshwater lake by surface area. The Caspian Sea is sometimes considered the world's largest lake, but it contains an oceanic basin. (source: wikipedia)",
    },
    {
      q: 'What is the longest bridge in the world?',
      options: ['Chesapeake Bay Bridge-Tunnel, United States', 'Danyang–Kunshan Grand Bridge, China', 'Bang Na Expressway, Thailand'],
      correctAnswer: 1,
      funFact: "The Danyang–Kunshan Grand Bridge is the world's longest bridge. It is a 102.4 mile long viaduct on the Beijing–Shanghai High-Speed Railway. (source: wikipedia)",
    },
    {
      q: 'What is the tallest building in the world?',
      options: ['Burj Khalifa, United Arab Emirates', 'Abraj Al-Bait Clock Tower, Saudi Arabia', 'Shanghai Tower, China'],
      correctAnswer: 0,
      funFact: "The Burj Khalifa is the world's tallest building. It was built in 2010, has 163 floors and is 2,717 feet (828 meters) tall. That's nearly 700 feet taller than the second highest builing, the Shanghai Tower!",
    },
  ];

  const questionsArray = [questions[0].q, questions[1].q, questions[2].q, questions[3].q];

  let score = 0;
  let qIndex = 0;

  function updateScore() {
    $('#score').text(`Score: ${score} out of ${questionsArray.length}`);
  }

  function turnClickFunctionOff() {
    $('.option').off('click');
  }

  let timeLeft = 10;
  let timer;

  function displayQuestion() {
    // Define the start timer function
    function startTimer() {
      timeLeft = 10;
      timer = setInterval(function() {
        $('#timer').text(`Time remaining: ${timeLeft}`);
        if (timeLeft === 0) {
          setTimeout(function() {
            $('#status').empty();
            $('#timer').text(`Time remaining: ${timeLeft}`);
            displayQuestion();
          }, 5000);
          turnClickFunctionOff();
          clearInterval(timer);
          $('#status').text(`Sorry you're out of time! ${questions[qIndex].funFact}`);
          qIndex++;
        } else {
          timeLeft--;
        }
      }, 1000);
    }

    // Define what happens when the player clicks on their answer
    $('.option').unbind().on('click', function() {
      const optionSelected = $(this).index();
      if (optionSelected === questions[qIndex].correctAnswer) {
        setTimeout(function() {
          $('#status').empty();
          displayQuestion();
        }, 5000);
        turnClickFunctionOff();
        clearInterval(timer);
        $('#status').text(`Correct! ${questions[qIndex].funFact}`);
        qIndex++;
        score++;
        updateScore();
      } else {
        setTimeout(function() {
          $('#status').empty();
          displayQuestion();
        }, 5000);
        turnClickFunctionOff();
        clearInterval(timer);
        $('#status').text(`Sorry! ${questions[qIndex].funFact}`);
        qIndex++;
      }
    });


    if (qIndex <= (questionsArray.length - 1)) {
      console.log(`qIndex is ${qIndex}`); // trying to figure out why qIndex increases by two the second time the start game button is pressed... >:(
      updateScore();
      $('#score').text(`Score:  ${score} out of ${questionsArray.length}`);
      $('#question').text(questionsArray[qIndex]);
      $('#option1').text(questions[qIndex].options[0]);
      $('#option2').text(questions[qIndex].options[1]);
      $('#option3').text(questions[qIndex].options[2]);
      clearInterval(timer);
      startTimer();
    } else {
      console.log(`qIndex is ${qIndex}`); // trying to figure out why qIndex increases by two the second time the start game button is pressed... >:(
      $('#question').empty();
      $('#option1').empty();
      $('#option2').empty();
      $('#option3').empty();
      $('#timer').empty();
      $('#status').text('Game Over!');
      $('button').css('visibility', 'visible');
      $('button').text('Try Again');
      if (score >= 3) {
        $('#score').text(`Great job! Your final score is ${score} out of ${questionsArray.length}`);
      } else {
        $('#score').text(`You only got ${score} out of ${questionsArray.length} correct! Better luck next time!`);
      }
    }
  }

  const resetGame = function() {
    score = 0;
    qIndex = 0;
    $('.instructions').empty();
    $('#status').empty();
    displayQuestion();
  };

  $('#start-game').on('click', function() {
    resetGame();
    $('button').css('visibility', 'hidden');
  });
});
