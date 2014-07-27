// EXTRACTING TEXT FROM A PDF
var pdfText = require('pdf-text')

var bookPath = "advertising.pdf"

var pathToPdf = __dirname + "/" + bookPath;

var natural = require('natural');

countInflector = natural.CountInflector;
soundEx = natural.SoundEx

//For finding the root word stems.
stemmer = natural.PorterStemmer; 
wordnet = new natural.WordNet('.');

stemmer.attach()


TfIdf = natural.TfIdf,
tfidf = new TfIdf();




//When you reach a chapter, empty the chapter contents. startCh is true, then start appending
//Each chunk into chapterContents.

var startCh = false;
var curContents = [];

var chapterContents = {};

var curChapterName = "";



pdfText(pathToPdf, function(err, chunks) {
  //chunks is an array of strings 
  //loosely corresponding to text objects within the pdf

  

  //Search from all of the chunks with chapter in them
  // console.log(chunks[0]);
  // console.log(chunks[0].toLowerCase().indexOf("very"));


  //This searches for all of the chapters in the book.
  for (var i = 0; i < chunks.length; i++){
	
	if(startCh == true){
		curContents.push(chunks[i]);
	}


	if (chunks[i].toLowerCase().indexOf("chapter") != -1){
		//Empty out the chapterContents
		
		//Filter out the sentences that include chapter
		if (chunks[i].length < 13){	
		   startCh = true;         			
		   chapterContents[curChapterName] = curContents;
		   curContents = [];	
           console.log(chunks[i]);
           curContents.push(chunks[i]);
           curChapterName = chunks[i];
           chapterContents[curChapterName] = "";

		}
	}
  }



 

  //Testing
  // console.log(chapterContents);

  var chOne = chapterContents["Chapter 1"].join(',');
  var chTwo = chapterContents["Chapter 2"].join(',');
  var chThree = chapterContents["Chapter 3"].join(',');  
  var chFour = chapterContents["Chapter 4"].join(',');  
  var chFive = chapterContents["Chapter 5"].join(',');      

  // console.log(chOne)
  //Tokenize and stem

  // console.log(chOne.tokenizeAndStem())


  //Analyze the words
  tfidf.addDocument(chOne);
  tfidf.addDocument(chTwo);
  tfidf.addDocument(chThree); 
  tfidf.addDocument(chFour);
  tfidf.addDocument(chFive);    


  tfidf.listTerms(0 /* document index */).forEach(function(item) {
  console.log(item.term + ': ' + item.tfidf);
 
  });


  
})

//or parse a buffer of pdf data
//this is handy when you already have the pdf in memory
//and don't want to write it to a temp file
var fs = require('fs')
var buffer = fs.readFileSync(pathToPdf)
pdfText(buffer, function(err, chunks) {

})








//NATRUAL LANGUAGE PROCESSING ON A BOOK


classifier = new natural.BayesClassifier();
classifier.addDocument("my unit-tests failed.", 'software');
classifier.addDocument("tried the program, but it was buggy.", 'software');
classifier.addDocument("the drive has a 2TB capacity.", 'hardware');
classifier.addDocument("i need a new power supply.", 'hardware');
classifier.train();



var stem = stemmer.stem('stems');  
console.log(stem);  
stem = stemmer.stem('stemming');  
console.log(stem);  
stem = stemmer.stem('stemmed');  
console.log(stem);  
stem = stemmer.stem('stem');  
console.log(stem);  

stem = "running".stem()

console.log(stem)

var sentence = "i am waking up to the sounds of chainsaws";
console.log(sentence)


console.log(sentence.tokenizeAndStem()); //Removes noise words










var doc = 'i code in ruby and node, but node more often.';
console.log(doc.tokenizeAndStem());

// tfidf.addDocument('i code in c.');
// tfidf.addDocument('i code in ruby and node, but node more often.');
// tfidf.addDocument('this document is about natural, written in node');
// tfidf.addDocument('i code in ruby.');
// tfidf.addDocument('i code in fortran.');
// console.log('node --------------------------------');

// tfidf.tfidfs('ruby', function(i, measure) {
//	console.log('document #' + i + ' is ' + measure);
// });


// tfidf.listTerms(2 /* document index */).forEach(function(item) {
// console.log(item.term + ': ' + item.tfidf);

// });

// wordnet.lookup('entity', function(results) {
//     wordnet.getSynonyms(results[0], function(results) {
//         results.forEach(function(result) {
//             console.log('------------------------------------');
//             console.log(result.synsetOffset);
//             console.log(result.pos);
//             console.log(result.lemma);
//             console.log(result.pos);
//             console.log(result.gloss);
//         });
//     });
// });

// if(soundEx.compare('ruby', 'rubie'))
//     console.log('they sound alike');


console.log(countInflector.nth(4));

// Lancaster stemmer
// var stemmer = require('natural').LancasterStemmer;
// console.log(stemmer.stem("words"));
// stemmer.attach();
// console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
// console.log("chainsaws".stem());



// classifier = new natural.BayesClassifier();

// classifier.train([{classification: 'computing', text: ['fix', 'box']},
//     {classification: 'computing', text: 'write some code.'},
//     {classification: 'literature', text: ['write', 'script']},
//     {classification: 'literature', text: 'read my book'}
// ]);

// console.log(classifier.classify('there is a bug in my code.'));
// console.log(classifier.classify('write a book.'));





