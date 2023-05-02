/*
   Jogo: Tetris
   Autor: Code Explained (www.codeexplained.org)
   Adaptado por: Gilson Filho
*/

// Rotina principal


const LINHA = 6;   //60/60/10
const COLUNA = 27;
const TAMANHO = 15;
const VAGO = "#414141"; 

var peca;
var tabuleiro = [];

var inicioDescida;
var fimDeJogo = false;

var tela = document.getElementById("tela");
var c = tela.getContext("2d");
var tela2 = document.getElementById("tela2");
var c2 = tela2.getContext("2d");
var tela3 = document.getElementById("tela3");
var c3 = tela3.getContext("2d");

var musicadefundo = document.getElementById("musicadefundo");
var musicaeliminacao = document.getElementById("musicaeliminacao");
var somfinal = document.getElementById("somfinal");
var girando = document.getElementById("girando");
var baixoelados = document.getElementById("baixoelados")  
var trava = document.getElementById("trava") 
var r = [];
var primeirapeca = -4;

contRanking = 1;

onkeydown = controlarPeca;

iniciarTabuleiro();

desenharTabuleiro();

gerarPeca();

inicioDescida = Date.now();

descerPeca();

var contZ = 0;
var contJ = 0;
var contS = 0;
var contI = 0;
var contO = 0;
var contL = 0;
var contT = 0;

var contLINHAS = 0;
var contadorlinhasnivel = 0;
var linhaseliminadas = 0;
var contNIVEL = 1;
var contPLACAR = 0;

var velocidade  = 500;
var velocidadeespaco = velocidade - 300;

var img0 = new Image();									
img0.src = "pecas/peca_z.png"

var img1 = new Image();
img1.src = "pecas/peca_s.png"

var img2 = new Image();
img2.src = "pecas/peca_t.png"

var img3 = new Image();
img3.src = "pecas/peca_o.png"

var img4 = new Image();
img4.src = "pecas/peca_l.png"

var	img5 = new Image();
img5.src = "pecas/peca_i.png"

var img6 = new Image();
img6.src = "pecas/peca_j.png"

var proxpeca = [img0, img1, img2, img3, img4, img5, img6];

var logo = new Image();
logo.src = "logo/logotetrispng.png"

// Sub-rotinas (funções)


function iniciarTabuleiro() {

	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}
}

function desenharTabuleiro(){  //c2
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

function apagarTabuleiro(){
	for(var i = 0; i > LINHA; i++);{
		for(var j = 0; j>COLUNA ; j++){
			tabuleiro[i][j] = "black"			
		}
	desenharTabuleiro();
	}
}


function desenharQuadrado(x, y, cor){  //c2
    c2.fillStyle = cor;
    c2.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    c2.strokeStyle = "#414141";
    c2.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}

function gerarPeca(){

	primeirapeca++

	while(primeirapeca < 0){
		r.push(Math.floor(Math.random() * PECAS.length));
		primeirapeca++
	}
		r.push(Math.floor(Math.random() * PECAS.length));

	peca = {
		tetramino : PECAS[r[primeirapeca]][0],
		cor : PECAS[r[primeirapeca]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 12, //19
		y : -2, //-2
	};

	peca2 = {
		tetramino : PECAS[r[primeirapeca+1]][0],
		cor : PECAS[r[primeirapeca+1]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 12,
		y : -2,
	}

	peca3 = {
		tetramino : PECAS[r[primeirapeca+2]][0],
		cor : PECAS[r[primeirapeca+2]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 12,
		y : -2,
	}

	peca4 = {
		tetramino : PECAS[r[primeirapeca+2]][0],
		cor : PECAS[r[primeirapeca+2]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 12,
		y : -2,
	}
	
	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
	peca2.tetraminoAtivo = peca2.tetramino[peca2.tetraminoN];
	peca3.tetraminoAtivo = peca3.tetramino[peca3.tetraminoN];
	peca4.tetraminoAtivo = peca4.tetramino[peca4.tetraminoN];
}

function estatistica(){

	for(var i =  0 ; i < r.length - 4 ; i++ ){

		if(r[i] == 0){  
			contZ++;
		}

		if(r[i] == 1){  
			contS++;
		}

		if(r[i] == 2){
			contT++;
		}

		if(r[i] == 3){
			contO++;
		}

		if(r[i] == 4){
			contL++;
		}

		if(r[i] == 5){
			contI++;
		}

		if(r[i] == 6){
			contJ++;
		}

	}
}

function descerPeca(){

	var agora = Date.now();
    var delta = agora - inicioDescida;	
	
    if (delta > velocidade) {
        mostraproximapeca();
        mostradurante();
        moverAbaixo();
        inicioDescida = Date.now();
		
	}	
	
    if (!fimDeJogo) {     
    requestAnimationFrame(descerPeca);
    musicadefundo.play();
    }
}

function moverAbaixo(){
	
    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        desenharPeca();
       	
	
    } else {
 		
        travarPeca();
        gerarPeca();
    }
}

function moverDireita(){
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda(){
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p){
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }
			
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }
			
            if (novoY < 0) {
                continue;
            }
			
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}
//---------------------------------------------------------------------------------------------------------------------------------
function mostradurante(){	
	
	c.fillStyle = "#A8FEC5";
	c.fillRect(0,0,400,500);
	c.fillStyle = ("black");
	c.font = "25px Russo One"
	c.fillText("Score", 122, tela.height/2.2);  //pontos texto 
	c.fillStyle = "black";
	c.fillStyle = ("black");
	c.font = "50px Russo One"
	if(contPLACAR<100){
		if(contPLACAR<10){
			c.fillText(contPLACAR, 140, tela.height/2.5);
		}else{
			c.fillText(contPLACAR, 130, tela.height/2.5);
		}
	} else{
		c.fillText(contPLACAR, 115, tela.height/2.5);
	}
	
	c.fillStyle = ("black");
	c.font = "25px Russo One"
	c.fillText("Level", 125, tela.height/1.55); // NIVEL texto
	c.fillStyle = "#49beb7";
	c.fillStyle = ("black");
	c.font = "50px Russo One"
	c.fillText(contNIVEL, 145, tela.height/1.7); // contagem nivel 

	c.fillStyle = ("black");
	c.font = "25px Russo One"
	c.fillText("Completed lines", 50, tela.height/1.2); // linha texto
	c.fillStyle = "#49beb7";
	c.fillStyle = ("black");
	c.font = "50px Russo One"
	c.fillText(contLINHAS, 140, tela.height/1.3); //contagem linhas

	c.drawImage(logo, 0, -60, 330, 310);

}

function mostraproximapeca(){
	c3.fillStyle = "#A8FEC5";
	c3.fillRect(0,0,300,500);
	c3.fillStyle = ("black");
	c3.font = "27px Russo One"
	c3.fillText("Next move", 90, 50);
	c3.drawImage(proxpeca[r[primeirapeca+1]], 75, 100, 160, 130);  //130x110
	c3.drawImage(proxpeca[r[primeirapeca+2]], 75, 240, 160, 130);
	c3.drawImage(proxpeca[r[primeirapeca+3]], 75, 390, 160, 130);
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);  //c2
}

function preencherPeca(cor) {  // c2
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca(){

	trava.play();

		for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                continue;

            }
        	if (peca.y + i < 0) {
            	apagarTabuleiro();
            	estatistica();
				somfinal.play();
				musicadefundo.pause();
				fimDeJogo = true;

				c2.fillStyle = "#414141";
				c2.fillRect(0,0,800,600);
			
				c3.fillStyle = "#a8fec5";
				c3.fillRect(0,0,300,600);

				c3.drawImage(img0,11,tela.height/8.3,105,85); //z
				c3.drawImage(img1,11,tela.height/4.2,105,85); //s
				c3.drawImage(img2,11,tela.height/2.8,105,85); //t
				c3.drawImage(img3,11,tela.height/2.04,100,83); //o
				c3.drawImage(img4,11,tela.height/1.6,100,80); //l
				c3.drawImage(img5,11,tela.height/1.37,100,85); //i
				c3.drawImage(img6,11,tela.height/1.18,100,85); //j

				c2.fillStyle = "black";
				c2.fillRect = (0,0,800,600);
				c2.fillStyle = ("black");
				c2.font = "50px Russo One"
				c2.fillText("GAME OVER", 50, tela.height/8);
					c3.fillStyle = "black";
					c3.fillRect = (0,0,800,600);
					c3.fillStyle = ("black");
					c3.font = "30px Calibri"
					c3.fillText("Estatísticas", 75, 50); 
						c3.fillStyle = "#49beb7";
						c3.fillRect = (0,0,800,600);
						c3.fillStyle = ("black");
						c3.font = "24px Courier New"
						 c3.fillText(" - "+contZ+" vezes",90, tela.height/5.15);  // z 4.8
							c3.fillStyle = "#49beb7";
							c3.fillRect = (0,0,800,600);
							c3.fillStyle = ("black");
							c3.font = "24px Courier New"
							c3.fillText(" - "+contS+" vezes",90, tela.height/3.16);  //s 
								c3.fillStyle = "#49beb7";
								c3.fillRect = (0,0,800,600);
								c3.fillStyle = ("black");
								c3.font = "24px Courier New"
								c3.fillText(" - "+contT+" vezes",90, tela.height/2.28); // t
									c3.fillStyle = "#49beb7";
									c3.fillRect = (0,0,800,600);
									c3.fillStyle = ("black");
									c3.font = "24px Courier New"
									c3.fillText(" - "+contO+" vezes",90, tela.height/1.75); // o
										c3.fillStyle = "#49beb7";
										c3.fillRect = (0,0,800,600);
										c3.fillStyle = ("black");
										c3.font = "24px Courier New"
										c3.fillText(" - "+contL+" vezes",90, tela.height/1.42); // L
											c3.fillStyle = "#49beb7";
											c3.fillRect = (0,0,800,600);
											c3.fillStyle = ("black");
											c3.font = "24px Courier New"
											c3.fillText(" - "+contI+" vezes",90, tela.height/1.22); // i
												c3.fillStyle = "#49beb7";
												c3.fillRect = (0,0,800,600);
												c3.fillStyle = ("black");
												c3.font = "24px Courier New"
												c3.fillText(" - "+contJ+" vezes",90, tela.height/1.072); // j
				ranking();
				c2.fillStyle= ("#a8fec5");
				c2.font = "30px Russo One"
				c2.fillText("Ranking", 130, tela.height/5);

                break;
            }

            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
	}

 for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;
		
        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        if (linhaCheia) {
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j];
                }
            }        

            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
			//contadorgeral
			musicaeliminacao.play();
            contLINHAS++; 
			linhaseliminadas++;
			contadorlinhasnivel++
        }
    }

    	if(contadorlinhasnivel == 10){
        	contNIVEL++;
        	velocidade = velocidade - 100;  //vai diminuindo a velocidade de 1000/900/800...  
        	contadorlinhasnivel = 0; // ---     	
        }

    	if(linhaseliminadas == 1){
			linhaseliminadas = 0;
			contPLACAR+=(100*contNIVEL);
		}

		if(linhaseliminadas == 2){
			linhaseliminadas = 0;
			contPLACAR+=(200*contNIVEL);
		}

		if(linhaseliminadas == 3){			
			linhaseliminadas = 0;
			contPLACAR+=(400*contNIVEL);
		}

		if(linhaseliminadas == 4){			
			linhaseliminadas = 0;
			contPLACAR+=(800*contNIVEL);
		}
	
    desenharTabuleiro();
}

function rodarPecaDireita(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function rodarPecaEsquerda(){
    var proximoPadrao = Math.abs(peca.tetramino[(peca.tetraminoN - 1) % peca.tetramino.length]);
    var recuo = 0;
	
	if(peca.tetraminoN == 0){
		peca.tetraminoN = peca.tetramino.length
	}	

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN - 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}


function barradeespaco(){
   while(!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
		peca.y++;
		contPLACAR += 2;
        desenharPeca();
	}  
}

function controlarPeca(evento){
	var tecla = evento.keyCode;
    if (tecla == 37) { //esquerda
    	baixoelados.play(); 
        moverEsquerda();
		inicioDescida = Date.now();
	} else if (tecla == 90){  //z  roda esquerda
    	rodarPecaEsquerda();
		inicioDescida = Date.now();
		girando.play()
    } else if (tecla == 38) {  //roda direita
        rodarPecaDireita();
        inicioDescida = Date.now();
        girando.play();
    } else if (tecla == 39) {    // direita
    	baixoelados.play();
        moverDireita();     
        inicioDescida = Date.now();
    } else if (tecla == 40) {  // desce + rapido
        baixoelados.play();
        moverAbaixo();
  		contPLACAR++   
	} else if(tecla == 32){ //espaco   desce ++++++ rapido
		barradeespaco();
    	baixoelados.play();
    } 
}