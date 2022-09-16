import React, { Component } from "react";
import './App.css'

class App extends Component {
  state = {
    total: 0,
    minutes: 0,
    seconds: 0,
    click: false,
    pause: false
  }

  addTime = (min) => {
    const somaMais = min * 60;
    this.setState((prevState) => ({
      total: prevState.total + somaMais,
      input: prevState.input + somaMais,
    }))
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      total: Number(value) * 60,
      input: Number(value) * 60
    },() => {
      setTimeout(() => {
        target.value = ''
      },10000)
    })
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
        this.timer() //para somente apos o valor ja estar setado , se nao daria erro
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
    const { total, click } = this.state;
    const minutes = Math.floor(total / 60) //pois se nao daria um numero quebrado por exemplo 4.98888 nos minutos , os segundo iariam permanecer normais
    const seconds = total % 60
    
    return (
      <div>
        <div>
          <button type="button" onClick={ () => this.addTime(0.5) }>
            Bolacha (30 segundos)
          </button>
          <button type="button" onClick={ () => this.addTime(0.75) }>
            Amendoim (45 segundos)
          </button>
        </div>
        <div>
          <button type="button" onClick={ () => this.addTime(1) }>
            Bolacha (+1 minuto)
          </button>
          <button type="button" onClick={ () => this.addTime(1) }>
            Bolacha (+1 minuto)
          </button>
        </div>
        <div>
          <button type="button" onClick={ () => this.addTime(3) }>
            Café preto (+3 minutos)
          </button>
          <button type="button" onClick={ () => this.addTime(4) }>
            Capuccino (+4 minutos)
          </button>
          <button type="button" onClick={ () => this.addTime(5) }>
            Chocolate quente (+5 minutos)
          </button>
        </div>
        <h1>Timer</h1>
          <input
            name="total"
            type='number'
            placeholder="Minutos"
            onChange={ this.handleChange }
          />
        <div className="timer">
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, "0")}</span>
        </div>
        <div className="App">
          <div className="functions">

            <button onClick={this.timer}>Iniciar</button>

            <button onClick={this.clear}>Pausar</button>

            <button onClick={this.limpaTudo}>Limpar</button>

            <button 
            // style={{color:'blue'}} //tem que passar um obj para a chave styles
            onClick={this.restart}>Recomeçar</button>
          </div>

          </div>
          {
            total === 0 && click && <h4>Obrigado  :)</h4>
          }
      </div>
    )
  }
}

export default App;
