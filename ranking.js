/*
function ranking(){
	rank = JSON.parse(localStorage.getItem("rank"));

		if(rank == null){
			rank = [];
		}

		var name = prompt("digite suas iniciais");
			
		pessoa = {
			nome: name,
			pts: contPLACAR,
		}

		var aux = ""
var w;
		for( w = 0; w < rank.length ; w++){
			if(pessoa.nome == rank[w].nome){
				if(pessoa.pts > rank[w].pts){
					rank[w] = pessoa;
					aux = "cheio"
				}
			}kakaka
		}

		if(aux !== "cheio"){
			rank.push(pessoa);
		}

		if(rank == null){
			rank = [];
		}

		if(rank.length > 1){

			for (var k = 0; k < rank.length-1; k++) {
				for (var j = 0; j < rank.length-1-k; j++) {
					if (rank[j] > rank[j+1]) {
						aux = rank[j];
						rank[j] = rank[j+1];
						rank[j+1] = aux;
					}
				}
			}
		}

		if(rank.length > 5){
			while(rank.length > 5){
				rank.pop();
			}
		}

	localStorage.setItem("rank", JSON.stringify(rank));*/

var conta;
var pessoa;

function ranking(){

	
var pergunta = prompt("Gostaria de salvar seu nome no ranking? 1- sim 2 - não");
ranking  = JSON.parse(localStorage.getItem('ranking'));
if(pergunta == "1"){		
	if(ranking == null){
		ranking = [];
	}

	var sigla = prompt("DIGITE SEU NOME").slice(0,3);
	pessoa = {
		nomesigla: sigla,
		placar: contPLACAR
	};

	var aux = "";
	for (conta = 0 ; conta <ranking.length ; conta++){
		if(pessoa.nomesigla == ranking[conta].sigla){
			if(pessoa.placar > ranking[conta].placar){
				ranking[conta] = nomesigla;
				aux = "cinco";
			}								
		}
	}

	if(aux !== "cinco"){
		ranking.push(pessoa);
	}

	if(ranking == null){
		ranking = [];
	}

	var auxordenacao;
	var z;

	for (var i = 1; i < ranking.length; i++) {
		auxordenacao = ranking[i];
		z = i;

		while (z > 0 && ranking[z-1].placar < auxordenacao.placar) {
			ranking[z] = ranking[z-1];
			z--;
		}
		ranking[z] = auxordenacao;
	}	
	if (ranking.length > 5) {
		while(ranking.length>5){
			ranking.pop();
		}
	}							
}
	localStorage.setItem("ranking",JSON.stringify(ranking));

	var altura = 170;						
	for(var i = 0; i < ranking.length ; i++){
		c2.fillStyle = "#49beb7";
		c2.fillStyle = ("white");
		c2.font = "30px Courier New"
		c2.fillText(contRanking+". "+ranking[i].nomesigla+" - "+ ranking[i].placar, 100, altura);// /3	
		altura += 60;
		contRanking++
	}
}