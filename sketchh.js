// Arrays para armazenar as posições das árvores e balões

let arvores = [];

let baloes = [];

// Arrays para armazenar as posições e tipos de construções

let construcoes = [];

// Posição da pessoa (estática)

let pessoaX;

let pessoaY;

let pessoaLargura = 30;

let pessoaAltura = 50;

// Contador de árvores plantadas

let arvoresPlantadas = 0;

const LIMITE_ARVORES_PARA_BALOES = 5; // Quantidade de árvores para começar a soltar balões

// Variável para controlar se os balões podem ser soltos

let podeSoltarBaloes = false;

// Variáveis para controlar a criação automática de balões

let ultimoBalaoTempo = 0;

const INTERVALO_BALAO = 1000 / 2; // 2 balões por segundo (1000ms / 2 balões = 500ms por balão)

// Variável para exibir a mensagem de parabéns

let mostrarMensagemParabens = false;

// Função setup é chamada uma vez quando o programa inicia

function setup() {

  createCanvas(800, 600); // Tamanho da tela

    background(135, 206, 235); // Cor de fundo azul claro (céu)

      // Define a posição inicial da pessoa (no centro, em cima do chão)

        pessoaX = width / 2;

          pessoaY = height - 100 - pessoaAltura / 2; // Acima do chão

            // Inicializa as construções (5 prédios e 2 casas)

              // Ajustei um pouco as posições para melhor distribuição

                construcoes.push({ tipo: 'predio', x: 80, y: height - 250, largura: 80, altura: 200 });

                  construcoes.push({ tipo: 'casa', x: 200, y: height - 120, largura: 90, altura: 70 });

                    construcoes.push({ tipo: 'predio', x: 350, y: height - 300, largura: 90, altura: 250 });

                      construcoes.push({ tipo: 'predio', x: 500, y: height - 200, largura: 70, altura: 150 });

                        construcoes.push({ tipo: 'casa', x: 650, y: height - 150, largura: 80, altura: 90 });

                          construcoes.push({ tipo: 'predio', x: 20, y: height - 180, largura: 60, altura: 130 }); // Mais um prédio

                            construcoes.push({ tipo: 'predio', x: 720, y: height - 270, largura: 75, altura: 220 }); // Mais um prédio

                            }

                            // Função draw é chamada repetidamente (cerca de 60 vezes por segundo)

                            function draw() {

                              background(135, 206, 235); // Desenha o céu novamente para "limpar" o frame

                                // Desenha o chão

                                  noStroke();

                                    fill(100, 150, 50); // Cor de grama/terra

                                      rect(0, height - 100, width, 100); // Um retângulo que representa o chão

                                        // Desenha as construções

                                          for (let i = 0; i < construcoes.length; i++) {

                                              let c = construcoes[i];

                                                  if (c.tipo === 'predio') {

                                                        desenhaPredio(c.x, c.y, c.largura, c.altura);

                                                            } else if (c.tipo === 'casa') {

                                                                  desenhaCasa(c.x, c.y, c.largura, c.altura);

                                                                      }

                                                                        }

                                                                          // Desenha e atualiza as árvores

                                                                            for (let i = 0; i < arvores.length; i++) {

                                                                                desenhaArvore(arvores[i].x, arvores[i].y);

                                                                                  }

                                                                                    // Desenha a pessoa (estática)

                                                                                      desenhaPessoa(pessoaX, pessoaY, pessoaLargura, pessoaAltura);

                                                                                        // Exibe a contagem de árvores plantadas

                                                                                          fill(0);

                                                                                            textSize(16);

                                                                                              text(`Árvores Plantadas: ${arvoresPlantadas} / ${LIMITE_ARVORES_PARA_BALOES}`, 10, 20);

                                                                                                // Checa se já pode soltar balões

                                                                                                  if (arvoresPlantadas >= LIMITE_ARVORES_PARA_BALOES) {

                                                                                                      podeSoltarBaloes = true;

                                                                                                          mostrarMensagemParabens = true; // Ativa a mensagem de parabéns

                                                                                                              // Cria balões automaticamente em intervalos de tempo

                                                                                                                  if (millis() - ultimoBalaoTempo > INTERVALO_BALAO) {

                                                                                                                        let r = random(255);

                                                                                                                              let g = random(255);

                                                                                                                                    let b = random(255);

                                                                                                                                          let novaCor = color(r, g, b);

                                                                                                                                                // Balão nasce aleatoriamente no chão

                                                                                                                                                      baloes.push({ x: random(width), y: height - 80, cor: novaCor, velocidade: random(1, 3) });

                                                                                                                                                            ultimoBalaoTempo = millis();

                                                                                                                                                                }

                                                                                                                                                                  } else {

                                                                                                                                                                      fill(200, 0, 0);

                                                                                                                                                                          text("Plante mais árvores para soltar balões!", 10, 40);

                                                                                                                                                                            }

                                                                                                                                                                              // Desenha e atualiza os balões

                                                                                                                                                                                for (let i = baloes.length - 1; i >= 0; i--) {

                                                                                                                                                                                    // Balão sobe

                                                                                                                                                                                        baloes[i].y -= baloes[i].velocidade;

                                                                                                                                                                                            desenhaBalao(baloes[i].x, baloes[i].y, baloes[i].cor);

                                                                                                                                                                                                // Remove balões que saem da tela

                                                                                                                                                                                                    if (baloes[i].y < -50) {

                                                                                                                                                                                                          baloes.splice(i, 1); // Remove o balão do array

                                                                                                                                                                                                              }

                                                                                                                                                                                                                }

                                                                                                                                                                                                                  // Exibe a mensagem de parabéns se a condição for verdadeira

                                                                                                                                                                                                                    if (mostrarMensagemParabens) {

                                                                                                                                                                                                                        fill(0, 150, 0); // Cor verde para a mensagem

                                                                                                                                                                                                                            textSize(32); // Tamanho maior

                                                                                                                                                                                                                                textAlign(CENTER, CENTER); // Centraliza o texto

                                                                                                                                                                                                                                    text('Parabéns, agora temos menos poluição!', width / 2, height / 2);

                                                                                                                                                                                                                                        textAlign(LEFT, BASELINE); // Volta ao alinhamento padrão para outros textos

                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                          // --- Funções de Desenho de Elementos ---

                                                                                                                                                                                                                                          function desenhaPessoa(x, y, largura, altura) {

                                                                                                                                                                                                                                            // Corpo

                                                                                                                                                                                                                                              fill(0, 0, 200); // Azul

                                                                                                                                                                                                                                                rect(x - largura / 2, y - altura / 2, largura, altura);

                                                                                                                                                                                                                                                  // Cabeça

                                                                                                                                                                                                                                                    fill(255, 200, 150); // Cor de pele

                                                                                                                                                                                                                                                      ellipse(x, y - altura / 2 - 15, 25, 25); // Cabeça

                                                                                                                                                                                                                                                        // Olhos (opcional)

                                                                                                                                                                                                                                                          fill(0);

                                                                                                                                                                                                                                                            ellipse(x - 5, y - altura / 2 - 15, 3, 3);

                                                                                                                                                                                                                                                              ellipse(x + 5, y - altura / 2 - 15, 3, 3);

                                                                                                                                                                                                                                                                // Pés (opcional)

                                                                                                                                                                                                                                                                  fill(50, 50, 50);

                                                                                                                                                                                                                                                                    rect(x - largura / 2, y + altura / 2, largura / 3, 10);

                                                                                                                                                                                                                                                                      rect(x + largura / 2 - largura / 3, y + altura / 2, largura / 3, 10);

                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                      function desenhaPredio(x, y, largura, altura) {

                                                                                                                                                                                                                                                                        fill(150); // Cor base do prédio (cinza)

                                                                                                                                                                                                                                                                          rect(x, y, largura, altura);

                                                                                                                                                                                                                                                                            // Janelas

                                                                                                                                                                                                                                                                              fill(200, 200, 0, 200); // Cor de janela (amarelo claro transparente)

                                                                                                                                                                                                                                                                                let espacoJanela = largura / 4;

                                                                                                                                                                                                                                                                                  let numAndares = floor(altura / 30); // Número de andares aproximado

                                                                                                                                                                                                                                                                                    for (let andar = 0; andar < numAndares; andar++) {

                                                                                                                                                                                                                                                                                        for (let janela = 0; janela < 2; janela++) {

                                                                                                                                                                                                                                                                                              if (janela % 2 === 0) { // Janela esquerda

                                                                                                                                                                                                                                                                                                      rect(x + espacoJanela / 2, y + 10 + (andar * 30), espacoJanela, 15);

                                                                                                                                                                                                                                                                                                            } else { // Janela direita

                                                                                                                                                                                                                                                                                                                    rect(x + largura - espacoJanela * 1.5, y + 10 + (andar * 30), espacoJanela, 15);

                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                function desenhaCasa(x, y, largura, altura) {

                                                                                                                                                                                                                                                                                                                                  // Corpo da casa

                                                                                                                                                                                                                                                                                                                                    fill(200, 100, 50); // Cor da casa (marrom/laranja)

                                                                                                                                                                                                                                                                                                                                      rect(x, y, largura, altura);

                                                                                                                                                                                                                                                                                                                                        // Telhado

                                                                                                                                                                                                                                                                                                                                          fill(150, 50, 0); // Cor do telhado (marrom escuro)

                                                                                                                                                                                                                                                                                                                                            triangle(x, y, x + largura, y, x + largura / 2, y - altura / 2);

                                                                                                                                                                                                                                                                                                                                              // Porta

                                                                                                                                                                                                                                                                                                                                                fill(100, 50, 0); // Cor da porta

                                                                                                                                                                                                                                                                                                                                                  rect(x + largura / 2 - 15, y + altura - 40, 30, 40);

                                                                                                                                                                                                                                                                                                                                                    // Janela

                                                                                                                                                                                                                                                                                                                                                      fill(200, 200, 0, 200); // Cor da janela

                                                                                                                                                                                                                                                                                                                                                        rect(x + largura / 4, y + altura / 3, largura / 4, altura / 4);

                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                        function desenhaArvore(x, y) {

                                                                                                                                                                                                                                                                                                                                                          // Tronco

                                                                                                                                                                                                                                                                                                                                                            fill(139, 69, 19); // Cor do tronco (marrom)

                                                                                                                                                                                                                                                                                                                                                              rect(x - 10, y - 50, 20, 50); // Tronco

                                                                                                                                                                                                                                                                                                                                                                // Folhagem

                                                                                                                                                                                                                                                                                                                                                                  fill(34, 139, 34); // Cor da folhagem (verde)

                                                                                                                                                                                                                                                                                                                                                                    ellipse(x, y - 70, 60, 60); // Copa da árvore

                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                    function desenhaBalao(x, y, cor) {

                                                                                                                                                                                                                                                                                                                                                                      fill(cor);

                                                                                                                                                                                                                                                                                                                                                                        noStroke();

                                                                                                                                                                                                                                                                                                                                                                          ellipse(x, y, 40, 50); // Corpo do balão

                                                                                                                                                                                                                                                                                                                                                                            // Nó do balão

                                                                                                                                                                                                                                                                                                                                                                              fill(cor);

                                                                                                                                                                                                                                                                                                                                                                                triangle(x - 5, y + 25, x + 5, y + 25, x, y + 30);

                                                                                                                                                                                                                                                                                                                                                                                  // Corda

                                                                                                                                                                                                                                                                                                                                                                                    stroke(0); // Cor da corda (preto)

                                                                                                                                                                                                                                                                                                                                                                                      line(x, y + 30, x, y + 60);

                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                      // --- Funções de Interação ---

                                                                                                                                                                                                                                                                                                                                                                                      // Função mousePressed é chamada quando o botão do mouse é clicado

                                                                                                                                                                                                                                                                                                                                                                                      function mousePressed() {

                                                                                                                                                                                                                                                                                                                                                                                        // Planta uma árvore se o clique foi na área do chão

                                                                                                                                                                                                                                                                                                                                                                                          if (mouseY > height - 100) {

                                                                                                                                                                                                                                                                                                                                                                                              arvores.push({ x: mouseX, y: height - 50 }); // Adiciona uma nova árvore na posição do clique, no chão

                                                                                                                                                                                                                                                                                                                                                                                                  arvoresPlantadas++; // Incrementa o contador

                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                                    