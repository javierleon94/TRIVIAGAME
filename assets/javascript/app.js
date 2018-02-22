var triviaQuestions = [{
	question: "What is Sulley's full name?",
	answerList: ["Michael J. Sullivan", "James P. Sullivan", "Sully Sullivan", "Jeff"],
	answer: 1
},{
	question: "What kind of bug is the Scouts leader from 'A Bug's Life'?",
	answerList: ["Ladybug", "Ant", "Grasshopper", "Caterpillar"],
	answer: 0
},{
	question: "What's the name of Buzz and Woody's owner?",
	answerList: ["Andy", "Danny", "Max", "Sid"],
	answer: 0
},{
	question: "Merida's mother changes into what after eating the enchanted cake?",
	answerList: ["Dragon", "Witch", "Bear", "Will-o'-the-Wisp"],
	answer: 2
},{
	question: "What thing is Wall-E protecting?",
	answerList: ["trash", "photos", "gold", "a plant"],
	answer: 3
},{
	question: "Which of the following is not an emotion showed in 'Inside Out'?",
	answerList: ["Confusion", "Sadness", "Fear", "Disgust"],
	answer: 0
},{
	question: "What is the name of Mr. Incredible's arch nemesis?",
	answerList: ["Frozone", "Syndrome", "Mirage", "Elastigirl"],
	answer: 1
},{
	question: "What is Nemo's mom's name?",
	answerList: ["Pearl", "Deb", "Coral", "Dory"],
	answer: 2
},{
	question: "What is the main event called in 'Cars'?",
	answerList: ["Daytona 500", "Piston Cup", "Radiator Springs", "Route 66"],
	answer: 1
},{
	question: "In 'Up', what is Russell apart of?",
	answerList: ["Wild Wilderness Scouts", "Explorers of America", "Wilderness Explorer", "Boy Scouts"],
	answer: 2
},{
	question: "From 'The Good Dinosaur,' what does Arlo call his pet?",
	answerList: ["Spunky", "Spot", "Sparky", "Fido"],
	answer: 1
},{
	question: "What fraternity does Sully end up joining in college?",
	answerList: ["Zeta Hiss Alpha", "Python Nu Kappa", "Roar Omega Roar", "Oozma Kappa"],
	answer: 3
},{
	question: "Which ISN'T a phrase from Woody?",
	answerList: ["Reach for the sky!", "Ride like the wind, Bullseye!", "There's a snake in my boot!", "Somebody's poisoned the water hole!"],
	answer: 1
},{
	question: "Who's your friend who like's to play...?",
	answerList: ["Bong Bong, Bong Bong", "Ding Dong, Ding Dong", "Bing Bong, Bing Bong", "Sing Song, Sing Song"],
	answer: 2
},{
	question: "Do you think it's odd that 'Ratatouille' has a rat making all the food?",
	answerList: ["Yes! So weird!", "Wouldn't be the first time!", "Nope!", "What's a Ratatouille?"],
	answer: 0
}];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, you know Pixar!",
	incorrect: "Do you even Pixar Bro?",
	endTime: "Out of time!",
	finished: "What is your final score?"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
