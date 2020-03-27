(function(){
	//array que armazenará os objetos com src e id de 1 a 8
	var imagens = [];
	
	//imagem a ser exibida em caso de acerto
	var cartaAcerto = document.querySelector("#match");
	
	//imagem de fim do jogo
	var fimJogo = document.querySelector("#gameOver");
	
	//array que armazena as cartas viradas
	var cartasViradas = [];
	
	//variável contadora de acertos. ao chegar em 8 o jogo termina
	var acertos = 0;
	
	//estrutura de atribiução das imagens aos card
	for(var i = 0; i < 8; i++){
		//cria um objeto img com um src e um id
		var img = {
			src: "img/" + i + ".jpeg",
			id: i%4
		};
		
		//inserer o objeto criado no array
		imagens.push(img);
	}
	
	//chama a função de inicialização do jogo
	startGame();
	
	//função de inicialização do jogo
	function startGame(){
		//zera o array de cartas viradas
		cartasViradas = [];
		
		//zera o contador de acertos
		acertos = 0;
		
		//embaralhamento do array de imagens
		imagens = randomSort(imagens);
		
		//lista de elementos div com as classes back e front
		var backFaces = document.getElementsByClassName("back");
		var frontFaces = document.getElementsByClassName("front");
		
		//posicionamento das cartas e adição do evento click
		for(var i = 0; i < 8; i++){
			//limpa as cartas marcadas
			backFaces[i].classList.remove("match","flipped");
			frontFaces[i].classList.remove("match","flipped");
			
			//posiciona as cartas no tabuleiro
			var card = document.querySelector("#card" + i);
			card.style.left = (i % 4) === 0 ? 5 + "px" : 4 + ((i % 4) * 165) + "px";
			card.style.top = i/4 >= 1 ? 230 + "px" : 5 + "px";
			
			//adiciona às cartas o evento click chamando a função que vira as cartas
			card.addEventListener("click",flipCard,false);
			
			//adiciona as imagens às cartas
			frontFaces[i].style.background = "url('" + imagens[i].src + "')";
			frontFaces[i].setAttribute("id",imagens[i].id);
		}
		
		//joga a imagem de game over para o plano de fundo
		fimJogo.style.zIndex = "-2";
		
		//remove o evento click da imagem de game over
		fimJogo.removeEventListener('click',function(){
			startGame();
		},false);
	}//fim da função de inicialização do jogo
	
	
	//função que vira as cartas
	function flipCard(){
		//verifica se o número de cartas viradas é menor que 2
		if(cartasViradas.length < 2){
			//pega as faces da carta clicada
			var faces = this.getElementsByClassName("face");
			
			//confere se a carta já está virada, impedindo que a mesma carta seja virada duas vezes
			if(faces[0].classList[2]){
				return;
			}
			
			//adiciona a classe fliped às faces da carta para que sejam viradas
			faces[0].classList.toggle("flipped");
			faces[1].classList.toggle("flipped");
			
			//adiciona a carta clicada ao array de cartas viradas
			cartasViradas.push(this);
			
			//verifica se o número de cartas no array de cartas viradas é igual a 2
			if(cartasViradas.length === 2){
				//compara o id das cartas viradas para ver se houve um acerto
				if(cartasViradas[0].childNodes[3].id ===cartasViradas[1].childNodes[3].id){
					//em caso de acerto adiciona a classe match a todas as faces das duas cartas presentes no array de cartas viradas
					cartasViradas[0].childNodes[1].classList.toggle("match");
					cartasViradas[0].childNodes[3].classList.toggle("match");
					cartasViradas[1].childNodes[1].classList.toggle("match");
					cartasViradas[1].childNodes[3].classList.toggle("match");
					
					//chama a função que exibe a mensagem MATCH
					matchCardsSign();
					
					//limpa o array de cartas viradas
					cartasViradas = [];
					
					//soma um ao contador de acertos
					acertos++;
					
					//verifica se o contador de acertos chegou a 8
					if(acertos >= 4){
						//caso haja 8 acertos, chama a função que finaliza o jogo
						gameOver();
					}
				} 
			} 
		} else {
			//em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
			cartasViradas[0].childNodes[1].classList.toggle("flipped");
			cartasViradas[0].childNodes[3].classList.toggle("flipped");
			cartasViradas[1].childNodes[1].classList.toggle("flipped");
			cartasViradas[1].childNodes[3].classList.toggle("flipped");
			
			//limpa o array de cartas viradas
			cartasViradas = [];
		}
	}
	
	
	//função que embaralha as cartas recebendo um array de cartas por parâmetro
	function randomSort(array){
		//cria um array vazio
		var newArray = [];
		
		//executa a estrutura enquanto o novo array não atingir o mesmo número de elementos do arrau passado por parâmetro
		while(newArray.length !== array.length){
			//cria uma variável i recebendo um número aleatório entre 0 e o número de elementos no array -1
			var i = Math.floor(Math.random()*array.length);
			
			//verifica se o elemento indicado pelo índice i já existe no array novo
			if(newArray.indexOf(array[i]) < 0){
				//caso não exista é inserido
				newArray.push(array[i]);
			}
		}
		
		//retorna o array novo, que possui os elementos do array passado por parâmetro embaralhados
		return newArray;
	}//fim da função que embaralha as cartas
	
	
	//função que gera o sinal de MATCH
	function matchCardsSign(){
		//joga a mensagem de MATCH para o primeiro plano
		cartaAcerto.style.zIndex = "1";
		
		//deixa a mensagem transparente
		cartaAcerto.style.opacity = "0";
		
		//move a mensagem para cima
		cartaAcerto.style.top = "150px";
		
		//função executada após 1.5 segundo
		setTimeout(function(){
			//joga a mensagem de MATCH para o plano de fundo
			cartaAcerto.style.zIndex = "-1";
			
			//remove a transparência da mansagem
			cartaAcerto.style.opacity = "1";
			
			//move a mensagem para o centro da tela
			cartaAcerto.style.top = "150px";
		},500);
	}//fim da função que exibe mensagem de MATCH
	
	//função de fim do jogo
	function gameOver(){
		//joga a mensagem de fim do jogo para o plano da frente
		fimJogo.style.zIndex = "99";
		
		//adiciona o evento click à imagem de game over
		fimJogo.addEventListener('click',function(){
			//chama a função que reinicia o jogo
			startGame();
		},false);
	}
}());
