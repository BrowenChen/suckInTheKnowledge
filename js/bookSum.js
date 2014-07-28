// EXTRACTING TEXT FROM A PDF
var pdfText = require('pdf-text')
var bookPath = "clausewitz.pdf"
var pathToPdf = __dirname + "/" + bookPath;
var natural = require('natural');

countInflector = natural.CountInflector;
soundEx = natural.SoundEx

//For finding the root word stems.
tokenizer = new natural.WordTokenizer();
stemmer = natural.PorterStemmer; 
wordnet = new natural.WordNet('.');

stemmer.attach()


natural.LancasterStemmer.attach();


TfIdf = natural.TfIdf,
tfidf = new TfIdf();




//When you reach a chapter, empty the chapter contents. startCh is true, then start appending
//Each chunk into chapterContents.

var startCh = false;
var curContents = [];

var chapterContents = {};

var curChapterName = "";

var send = "";

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
  // var chFive = chapterContents["Chapter 5"].join(',');      

  // console.log(chOne)
  //Tokenize and stem

  // console.log(chOne.tokenizeAndStem())
  

  //Analyze the words
  tfidf.addDocument(chOne);
  tfidf.addDocument(chTwo);
  tfidf.addDocument(chThree); 
  tfidf.addDocument(chFour);
  // tfidf.addDocument(chFive);    


  tfidf.listTerms(0 /* document index */).forEach(function(item) {
  console.log(item.term + ': ' + item.tfidf);
  send = send + " " +  item.term
 
  });

  console.log(send);

  
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



//Not working right now
var inputSentence = "As a simple analogy, consider two restaurants, one that requires reservations and another that neither requires reserva- tions nor accepts them. For the restaurant that requires reservations, we have to go through the hassle of calling before we leave home. But when we arrive at the restaurant we can, in principle, immediately be seated and order our meal. For the restaurant that does not require reservations, we don’t need to bother to reserve a table. But when we arrive at the restaurant, we may have to wait for a table before we can be seated.";
var array = tokenizer.tokenize(inputSentence);
var test = inputSentence.tokenizeAndStem();
var joined = array.join(" ");


// array.split(',').join(' ');
console.log(joined);

console.log(test);
//join to string



// EXPORTS

var adDummyData = " planner persuade emotional intended tgi brand strategy account bene consumers objectives inform drills communication data population campaign users ne multitude attitudes clever holes factual goes test purpose blueprint symbiosis pieces nition persuasive aim needs achieve precision image things likely speci ts varying metallic finally lollipop concentrate sale thomson walter analyses chain responsibility understand identify formulations doing dozens diversity surely symbiotic bridge analytical advertises potential 1948 grasp covers elds resulting difference conclusions drill critics imagery secret former ask beings acceptable existing aware ahead cation younger unacceptable boxes line subheadings purposes contend exclusive type copies functional sales question everyone dif petfood clothes vital aims facts huge golden everything emotive developed itself advertised percentage publicity customers essential industry successful competitors book better try nd crucial af feel uent third services end agencies analysed parts ourselves modern provides developing hardly mean draw producing shall status pets wants muscleman communicated preparation countless launch cations promote founded thinks gone ones factors current fundamental effect tesco regularly offers order argue reached record latter nothing weekly channel watch consistent cult psychological awareness analyse programmes names whatsoever healthy includes subsidiary wpp legally 50 groups products tedium studied whittled sort popularly touched myriads emails blocks 17 mentions investigation apparently boring blogs telephone clich environment sells simplistic isn female trying men deduce funds thoughtful interchangeably stop smoking drinking emphasis army nhs recruit culty squarely boil feature masses mite edges insight truthful incidentally collects rewarded holidays literate examine ke decisions transmuting kaleidoscope desired 1968 pattern 1970 paragraphs gets outsiders asking economy jumping technically deliberately thirds accounts exciting gross disentangle unlock psychographic shift health targets sake keen proffer simplicity emphasized battle win charity drafting connection emperor ng inventing puf attempts ineffectual meets extension gap defeating sender ultimately haven receiver ex commonplace whole confusing perfectly trends wealthier jigsaw stock wooden ingredient interlock nite leave textbooks blank invaluable infrequently packs cheated tries fails meetings foolish represents mutually contradictory blunt dry wine sweet weak protection reliably inspiring whoever pet hears bones bof achieving versa ef goal confusions spelled correlating disregard charter arise baggage earliest backroom detract bare frequency hostile subjects waste introduction silly informative policymakers alcohol deemed esh airlines desirable action images deployed assigned justice researcher rational persuasion headings expanded chapters follow unembellished cater draft usage arguments exists contentious persuasively undoubtedly conscientious ecologically universal parent shopper metallurgist inextricably entwined sensible adjustments feminine burgeoning worse eld masculine cleverer segments task ects supermarket addressed pollitt massimi inspire promotions possibly emotions segment feelings halo segmented valentine stay retail sources boase yours forever respects offs weaknesses infant astonishing jwt purchases busy afternoon outcome properly potentially formulated function competitions catalogues giant deeper 250 placements sharper globally syndicated anyone contract justify helps practised ingredients functioned operation kantar falls analysing annual interviews operates es vries leonard les studying 700 marital lms appreciated habitation consumption differing sharply uni brands vary objective look news answer equally diverse ensure tried fact advertise away involved types perhaps process knows example 000 selling agency information use goods service available single communicate words demand massive require saying relevant details required none mentioned among overlapping whatever detail human designed give job re client days newspaper past agreed include cally word right 1955 care separate person windows targeting uses allows greater audiences bits talented specify prime blurred blend effectively beer unusual study winning applies carefully tourism advance impossible itv prospective channels cover experience cynics middle considered vice fewer four kinds absolutely yes studies focus expect implies literally document lacking newspapers society honed related sizable demands surveys continuous role obtain prepare front unsurprisingly index skill fundamentals era 1969 concentrated uence drinks irrelevant conglomerates carries slightly carbonated place identi persuaded victorian immediate ten sees failing art age 19th sex automobiles realistic education strictly researchers summary requires closely computer list message tone comprehensive light opinions budgets sense covering timescale duration runs love bland 500 abundance starting personality millions oreal improvement heard useless driving intention blood purchasers choices reveal conglomerate counts relationship hobson enjoy owned john fourth owners seemingly colleagues leads going teams split stated distinction laws tightly 16 moving homogeneous approaches popular minority entity simultaneously pack increase importantly forgotten activity 14 glamorous unimportant brief discover real taken mass planners need paid put retailers particularly works exactly detailed let classi planning unless point similar time simple system sell say effective london however fail carry next result specialists clearly longer short state ciently normally revenue packaging comes 13 strengths shop store eds relations websites view communications last publish falling requirements 33 learn evidence importance unlike questions precisely completed ideas lots heavy creation display worth further carried 11 decades matter approximately manufacturers shown free radio certainly running variety inevitably comprise therefore self social akin pictures clients personally regional common demographic section keep mind already totally 20th nearly excellent existence value larger kind deal charities nancial global table written surprisingly aimed appear don host towards fall upon case makes advertiser reality really times page indeed until build top quality cost sometimes down history creative show working go exact reach printed using hard provide average necessary buying national fairly half nance cannot activities entertainment run travel strong 12 terms recent launched responsible 100 made back growth name messages varied easily government felt having probably naturally results money cinema cosmetics consider posters raft completely magazines found leader 15 constantly class american easy frequently return uk 40 basic seen 10 produce less high entire given around explore start internet countries sector ed throughout world small traditional important always almost when consumer will major business why true again ways quite different key rather advertisers own above rst its work campaigns product usually great new whether become buy know every target market long something research particular generally may called highly no clear people us once good advertisement britain few so nor far others years media today commercial television three ever means largest two british themselves ned day not marketing one just number without even though markets within best public second sectors used often large basis advertisements first de nowadays part considerable especially think advertising does chapter group quickly pro century complex possible want yet simply together"
var lawDummyData = "further political 2003 1970 reading european 1992 2006 perez wesley 161 certoma italian hein butterworth 162 163 people republic atiyah 1990 zweigert 164 freckmann paperbacks austin province xian chu konrad determined uses chisholm garth nettheim australia lexis russia chorus dutch anke weidenfeld nicolson andrew clapham baker soviet 13th wegerich rebirth post making central 221 fran ois dessemontet tugrul ansay swiss venn dicey 1000 michener 8th vereshchagin liberty fund williams manlio taking seriously bellomo impression reply critics duckworth matter principle empire alexander 1800 past carole geirnaert florence houssais 1823 language future eric jeanpierre medieval emily finch stefan fa nski skills early stein canon slapper gary 1954 invitation simpson nigel foster satish sule lydia cochrane freeman interdisciplinary irwin polity catholic 1960 twentieth century canadian norton rogelio 14 perdomo 1968 age globalization tz glanville yash ghai 12 fragment essentials government resumption sovereignty basic freedoms gleave eugenia kermeli comment commentaries charter tauris pickering principles traditions roach sustainable diversity kent guest edinburgh hahlo ellison kahn morals legislation its background juta owen haley spirit japanese georgia phil harris 7th 1973 concept bulloch sharpe 1975 hall hobbes leviathan oakeshott ucl 1978 honor kerameus kozyris greek lobban prentice man adams 1981 trials black consciousness era loewe edward shaughnessy ancient origins civilization bc stanley lubman bird cage reform ";
;

var clauseDummyData = "corps young scharnhorst king royal berlin college prussian revolutionary gneisenau allied infantry french 1815 world develop kant service family death set artillery twelve dynasty august staff von age napoleon years prince wing virtually 1813 nationalist readmitted badly 1792 cers deep classes free regiment germany passed beginning widespread sacri designed philosophy discerned seven volunteers based campaigning appointed eliminated chief year born patriotic eliminate helped rational loyalty reduced armies scienti professional rules cer napoleonic again state certainty moulded lamented 20 non she contain neuruppin 63 henry 70 1780 monarchy nevertheless received opened son pay creation milit monarchical iii brilliant universe director intellectually 1795 administrative structure education leaving developing revolution applying commission lack deeper brie posterity sought encountered turned driven techniques background liberal group 12 rische gesellschaft siege 1799 1803 ambition waged glory joined disease head deeply wife 16 rightly patron marie match works advance breslau intellectual analyses looked accompanied search projected drafts colleagues reputation following rejoined nigsberg four sentiment doubted passionate expensive spring uniform wore forebears linear russian six serving renewal yorck national altogether 19 1831 coalition exclusive marshal bl cher countryside fodder formation circles tied double break arm reform rhine ritual saxony opportunities absurd across ideas new people carried barriers collection old twenty future towards active uvre earlier battles study result trained transformation closely lived reasons served studies system government science added pages career taking campaign later strategy eld nation need france experience troops principles prussia until throughout resources tactics end europe first questioned containing driving antidote distant satisfaction republic attitude ection vosges spread completed broad valley trudging cowardice steep wooded chains tracks burst infantryman familiarity teach inspire betrothed potentially determining ended treaty basel aristocratic withdrew precarious animal deluding quarter father alignment nearly cruelly aroused eleven essay ve lazy garrison duty stir town 1804 intelligent whips lethargy contemptible periods leisure characterize peacetime brooded internment indifference excellent library brother bourgeois bind theirs commissioned thread affair connecting hohenzollern revealed haunted engage interests fellow subalterns remedy profoundly including relief transferred redrafting attend newly revising unprejudiced terror gerd 1808 ruling began revered giants distilled materials dictatorship plebiscitary thinker 1812 hanoverian birth artilleryman ces uncomplainingly submitted fruit identi junker stint dominated 1814 pour basic universal conquered appointment reluctantly remarkably terrible lowered puzzling rabble untrained undisciplined cered merciless jumped ncos adequate proportions admit cing alone outnumbered 1816 manuscript wear columns dense 1818 european skirmishers substituted ciently insuf plenty retired exible dispersed formations whol be";

exports.chapter = chapterContents;
exports.mainWords = adDummyData;
exports.lawWords = lawDummyData;
exports.clauseWords = clauseDummyData;

