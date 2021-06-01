
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    var timeleft = 15;
  var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    showResults();
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);
    
    // for each question...
    myQ.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    qCont.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const aConts = qCont.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQ.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const aCont = aConts[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (aCont.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        aConts[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        aConts[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resltCont.innerHTML = `${numCorrect} out of ${myQ.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const qCont = document.getElementById('quiz');
  const resltCont = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQ = [
    {
      question: "Which of those doesn’t have an index based structure?",
      answers: {
      a: " List",
      b: "Set",
      c: "Map",
      d: "None of the above",
    },
    correctAnswer: "b" 
  },
  {
      question: "java.util.Collections is a:",
      answers: {
      a: " Object",
      b: "Interface",
      c: "Class",
      d: "None of the above",
    },
    correctAnswer: "c"
  }, 
  {
      question: "Which of those allows duplicate elements?",
      answers: {
      a: "Set",
      b: "List",
      c: "All",
      d: "None of the above",
    },
    correctAnswer: "b"
  },
  {
      question: "The most used interfaces from the collection framework are?",
      answers: {
      a: "List",
      b: "Map",
      c: "Set",
      d: "None of the above",
    },
    correctAnswer: "b"
  },
  {
      question: "The root interface of Java collection framework hierarchy is –",
      answers: {
      a: "Collection",
      b: "Root",
      c: "Collections",
      d: "List/Set",
    },
    correctAnswer: "d"
  },
  {
      question: "ArrayList implements that of the following?",
      answers: {
      a: "List",
      b: "RandomAccess",
      c: "Cloneable",
      d: "All the above",
    },
    correctAnswer: "d"
  },
  {
      question: "What describes an algorithm performs in best, average or worse case scenarios?",
      answers: {
      a: "Big-B",
      b: "Big-O",
      c: "Big-Data",
      d: "Big-N",
    },
    correctAnswer: "b"
  },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);


