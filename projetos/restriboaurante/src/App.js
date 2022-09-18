import React, { Component } from "react";
import './App.css'
// Importação graças a ajuda do Washington
const actions = require('./Oquefazer');

export default class App extends Component {
  state = {
    total: 0,
    minutes: 0,
    seconds: 0,
  }

  sorteiaAcao = (chave) => {
    const random = Math.floor(Math.random() * actions[chave].length);
    return actions[chave][random]
  }

  addTime = (min) => {
    const somaMais = min * 60;
    this.setState((prevState) => ({
      total: prevState.total + somaMais,
      input: prevState.input + somaMais,
    }))
  }

  timer = () => {
    this.setState({ click: true })
    const { total } = this.state;
    if (total > 0)
      this.idTimer = setInterval(() => {
        this.setState(({ total }) => ({
          total: total - 1
        }))
      }, 1000)
  }

  componentDidUpdate() {
    const { total, click } = this.state;
     if (total < 0 && click) {
      clearInterval(this.idTimer)
      this.setState({total: 0})
      setTimeout(() => {
        this.setState({click: false })
      },2100)
    }
  }

  restart = () => {
    const { input } = this.state;
    clearInterval(this.idTimer)
    if (typeof input === 'number') {
      this.setState({
        total: input,
        click: true,
      }, () => {
        this.timer()
      })
    }
  }

  clear = () => {
    const { pause } = this.state;
    this.setState(({ pause }) =>({
      pause: !pause,
    }))
    if (pause){
      clearInterval(this.idTimer)
      this.timer()
      return
    }
    clearInterval(this.idTimer)
  }

  limpaTudo = () => {
    clearInterval(this.idTimer)
    this.setState( { click: false , total: 0})
  }

  render() {
    const { total } = this.state;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;

    return (
      <main>
        <div className="header">
          No intervalo vai dar tempo de...
        </div>
        <div className="container">
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
                        />
                        { this.sorteiaAcao('um') }
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
                        />
                        { this.sorteiaAcao('umemeio') }
                      </div>
                      <div className="item-price">1 min 30 seg</div>
                    </div>
                  </label>

                  <label htmlFor="dois">
                    <div className="item">
                      <div className="item-price">
                        <input
                          id="dois"
                          value="1.5"
                          type="checkbox"
                        />
                        { this.sorteiaAcao('dois') }
                      </div>
                      <div className="item-price">2 min</div>
                    </div>
                  </label>

                </div>
              </fieldset>


              <div className="rodape">
                <button onClick={this.timer}>Pedir!</button>
                <button onClick={this.limpaTudo}>Novo pedido</button>
              </div>
            </form>            
          </div>


          <div className="cronometro">
          { total === 0 ? (<div>Faça o seu pedido</div>) :
          (<div>
            <center>Intervalo</center>
            <div className="clock-container">
              <div className="clock-column">
                <p className="clock-minutes clock-timer">{ minutes.toString().padStart(2, "0") }</p>
                <p className="clock-label">MINUTOS</p>
              </div>

              <div className="clock-column">
                <p className="clock-seconds clock-timer">{ seconds.toString().padStart(2, "0") }</p>
                <p className="clock-label">SEGUNDOS</p>
              </div>
            </div>
          </div>)
          }
          </div>
        </div>
      </main>
    )
  }
}
