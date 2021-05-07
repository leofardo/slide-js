class Slide{
	iniciar(tempo){
		const container = document.getElementById('container')

		this.tempo = tempo
		
		this.fotos = [
			'img/foto-1.jpg',
			'img/foto-2.jpg',
			'img/foto-3.jpg',
			'img/foto-4.jpg',
			'img/foto-5.jpg'
		]

		document.querySelector('#container img').src = this.fotos[0]

		// criando os pontos, adicionando à divPontos, e adicionando um onclick
		for (var i = 0; i < this.fotos.length; i++) {
			let ponto = document.createElement('div')
			ponto.classList = 'pontos'
			ponto.id = `ponto-${i+1}`

			divPontos.appendChild(ponto)

			let pontoClick = document.getElementById(ponto.id)

			//onclick para trocar a foto
			pontoClick.addEventListener('click', (e)=>{
				let pontoPos = e.path[0].id
				let posicao = pontoPos.substring(6,7) - 1 

				//alterando a imagem
				document.querySelector('#container img').src = this.fotos[posicao]
				
				//alterando o active do ponto
				for (var a = 0; a < this.fotos.length; a++) {

					let pontoDiv = document.querySelector(`#divPontos div:nth-child(${a+1})`)

					if (pontoDiv.classList == 'pontos active') {
						pontoDiv.classList = 'pontos'
					}

					document.querySelector(`#divPontos #${pontoPos}`).classList = 'pontos active'
				}
			})
		}

		document.querySelector(`#divPontos #ponto-1`).classList = 'pontos active'

		setInterval(()=>{this.moverAutomatico()},this.tempo)

	}

	mover(lado){
		let fotoAtual = document.querySelector('#container img').src

		for (var i = 0; i < this.fotos.length; i++) {
			if(fotoAtual.includes(this.fotos[i])){
				if (lado === 'esquerda') var add = -1
				if (lado === 'direita') var add = 1

				if(this.fotos[i+add] !== undefined){	
					document.querySelector('#container img').src= this.fotos[i+add]
					this.moverPonto(`ponto-${i+1}`, `ponto-${[(i+1)+add]}`)
				}else{
					let lastFoto = this.fotos.length

					if(add === -1){
						document.querySelector('#container img').src = this.fotos[lastFoto - 1]
						this.moverPonto(`ponto-1`, `ponto-${lastFoto}`)
					}else{
						document.querySelector('#container img').src = this.fotos[0]
						this.moverPonto(`ponto-${lastFoto}`, 'ponto-1')
					}
				}
				break
			}
		}
	}

	moverPonto(pontoAtual, pontoPosterior){
		document.querySelector(`#divPontos #${pontoAtual}`).classList = 'pontos'
		document.querySelector(`#divPontos #${pontoPosterior}`).classList = 'pontos active'
	}

	moverAutomatico(){
		for (var i = 1; i <= this.fotos.length; i++) {
			let ponto = document.querySelector(`#divPontos div:nth-child(${i}`)
			if(ponto.classList == 'pontos active'){
				var pontoActive = ponto.id
			}
		}

		let posicao = pontoActive.substring(6,7)
		let fotoNova = `${this.fotos[parseInt(posicao)]}`

		if (fotoNova !== 'undefined') {
			document.querySelector('#container img').src = fotoNova
			var pontoPosterior = `ponto-${parseInt(posicao) + 1}` 
			
		}else{
			document.querySelector('#container img').src = this.fotos[0]

			var pontoPosterior = 'ponto-1'
		}

		this.moverPonto(pontoActive, pontoPosterior)
	}
}

slide = new Slide;
slide.iniciar(5000)

const arrowEsquerda = document.getElementById('setaEsquerda')
const arrowDireita = document.getElementById('setaDireita')

arrowEsquerda.addEventListener('click', ()=>{
	slide.mover('esquerda')
})

arrowDireita.addEventListener('click', ()=>{
	slide.mover('direita')
})
