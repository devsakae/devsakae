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
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);
    
    return (
      <main>
        <div>
          Menu
        </div>
        <div>
          <button type="button" onClick={ () => this.addTime(0.05) }>
            Teste (2 segundos)
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
        { total === 0 ? click && <h4>Terminou o intervalo!</h4> :
          (<div className="countdown-wrapper">
              { minutes && (
                  <div className="countdown-item">
                      <SVGCircle radius={ minutesRadius } />
                      { minutes.toString().padStart(2, "0") }
                      <span>minutos</span>
                  </div>
              )}
              { seconds && (
                  <div className="countdown-item">
                      <SVGCircle radius={ secondsRadius } />
                      { seconds.toString().padStart(2, "0") }
                      <span>segundos</span>
                  </div>
              )}
          </div>)        
        }

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
      </main>
    )
  }
}

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
      <path
        fill="none"
        stroke="#333"
        strokeWidth="5"
        d={describeArc(50, 50, 48, 0, radius)}
      />
  </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
  ].join(' ');

  return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

export default App;
