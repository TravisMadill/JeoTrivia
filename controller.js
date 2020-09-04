$(document).ready(function(){
	
	generateQuestionBoard();

	// Set up marquee stuff
	var marqArea = $(".marq-line");
	var areaWidth = marqArea.parent().width();

	marqArea.each(function(){
		if($(this).width() > areaWidth){
			$(this).addClass("marq-animate");
		}
	});
});

function generateQuestionBoard(data){
	var questionField = $('.question-field');
	var categoryRow = $(document.createElement('div'));
	categoryRow.addClass("w3-row");
	for(let i = 0; i < questionList.length; i++){
		var catCell = $(document.createElement('div'));
		catCell.addClass('w3-col s2 w3-leftbar w3-bottombar w3-topbar w3-border-red w3-center');
		if(i == questionList.length - 1){ catCell.addClass('w3-rightbar'); }
		catCell.append(`<div class="marq-area"><div class="marq-line w3-large">${questionList[i].name}</div></div>`)
		categoryRow.append(catCell);
	}
	questionField.append(categoryRow);

	let qValue = 0;
	for(let row = 0; row < questionList[0].questions.length; row++){
		var qRow = $(document.createElement('div'));
		qRow.addClass('w3-row');
		qValue += 200;
		for(let col = 0; col < questionList.length; col++){
			var qCell = $(document.createElement('div'));
			qCell.addClass(`w3-col s2 w3-large w3-border-left w3-border-bottom w3-border-red w3-center w3-padding-16 w3-hover-red`);
			qCell.attr("id", `question-${col}${row}`)
			qCell.attr("onClick", `showQuestion(${col}, ${row})`);
			if(col == questionList.length - 1){ qCell.addClass('w3-border-right'); }
			qCell.append(`\$${qValue}`)
			qRow.append(qCell)
		}
		questionField.append(qRow);
	}
}

function showQuestion(categoryIndex, questionIndex){
	if(categoryIndex == 4 && questionIndex == 3){ // For the "It's" instead of "For" hint
		document.getElementById('answer-header').innerText = `It's \$${(questionIndex+1)*200}...`;
	} else document.getElementById('answer-header').innerText = `For \$${(questionIndex+1)*200}...`;
	document.getElementById('question-display').innerHTML = questionList[categoryIndex].questions[questionIndex].q;
	document.getElementById('answer-display').innerHTML = questionList[categoryIndex].questions[questionIndex].a;
	document.getElementById('close-question-modal').setAttribute('onclick', `finishQuestion(${categoryIndex}, ${questionIndex})`);
	document.getElementById('btn-ans-reveal').style.display='block';
	document.getElementById('answer-footer').style.display='none';
	document.getElementById('ansmodal').style.display='block';
}

function revealAnswer(){
	document.getElementById('answer-footer').style.display='block';
	document.getElementById('btn-ans-reveal').style.display='none';
}

function finishQuestion(categoryIndex, questionIndex){
	document.getElementById('ansmodal').style.display='none';
	document.getElementById(`question-${categoryIndex}${questionIndex}`).innerHTML = "<span class='w3-text-gray'><i>Answered</i></span>";
}

