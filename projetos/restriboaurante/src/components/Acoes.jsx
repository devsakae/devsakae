import React, { Component } from 'react';
// Importação graças a ajuda do Washington
const actions = require('../Oquefazer');

export default class Acoes extends Component {
  sorteiaAcao = (chave) => {
    const random = Math.floor(Math.random() * actions[chave].length);
    return actions[chave][random]
  }

  render() {
    const { check, ativaTimer, limpaTudo, botaoIniciar } = this.props;
    return (
      <div className="cardapio">
            <form className="form">
              <fieldset className="section">
                <legend>Clique para sortear outras ações</legend>
                <div className="itens">
                  <label htmlFor="um">
                    <div className="item">
                      <div className="item-price">
                        <input
                          id="um"
                          value="1"
                          type="checkbox"
                          onChange={ (e) => check(e) }
                        />
                       Commitar a aula
                      </div>
                      <div className="item-price">1 min</div>
                    </div>
                  </label>

                  <label htmlFor="umemeio">
                    <div className="item">
                      <div className="item-price">
                        <input
                          id="umemeio"
                          value="1.5"
                          type="checkbox"
                          onChange={ (e) => check(e) }
                        />
                        Pegar um chocolatinho
                      </div>
                      <div className="item-price">1 min 30 seg</div>
                    </div>
                  </label>

                  <label htmlFor="dois">
                    <div className="item">
                      <div className="item-price">
                        <input
                          id="dois"
                          value="2"
                          type="checkbox"
                          onChange={ (e) => check(e) }
                        />
                        Ir no banheiro (n. 1)
                      </div>
                      <div className="item-price">2 min</div>
                    </div>
                  </label>

                  <label htmlFor="doismeio">
                    <div className="item">
                      <div className="item-price">
                        <input
                          id="doismeio"
                          value="2.5"
                          type="checkbox"
                          onChange={ (e) => check(e) }
                        />
                        Se esticar um pouco
                      </div>
                      <div className="item-price">2 min 30 seg</div>
                    </div>
                  </label>

                </div>
              </fieldset>
              <div className="rodape">
                <button onClick={ ativaTimer }>{ botaoIniciar ? 'Recomeçar contagem' : 'Iniciar a contagem' }</button>
                <button onClick={ limpaTudo }>Reset</button>
              </div>
            </form>            
          </div>
    )
  }
}
