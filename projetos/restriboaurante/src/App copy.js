import React, { Component } from "react";
import './App.css'
import Acoes from "./components/Acoes";

export default class App extends Component {
  state = {
    total: 0,
    minutes: 0,
    seconds: 0,
    click: false,
  }

  timer = () => {
    const { total } = this.state;
    this.setState({
      click: true,
    })
    if (!this.idTime) {
      if (total > 0) {
        this.idTimer = setInterval(() => {
          this.setState(({ total }) => ({
            total: total - 1,
          }))
        }, 1000)
      }
    }
  }

  componentDidUpdate() {
    const { total, click } = this.state;
    if (total < 0 && click) {
      clearInterval(this.idTimer)
      this.setState({ total: 0 })
      setTimeout(() => {
        this.setState({ click: false })
      },2100)
    }
  }

  limpaTudo = () => {
    clearInterval(this.idTimer)
    this.setState( { click: false, total: 0})
  }

  check = ({ target }) => {
    const qto = target.value * 60;
    this.setState((prevState) => ({
      total: target.checked ? Number(prevState.total + qto) : Number(prevState.total - qto),
    }))
  }

  render() {
    const { total, click } = this.state;
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;

    return (
      <main>
        <div className="header">
          No intervalo vai dar tempo de...
        </div>
        <div className="container">
          <Acoes
            check={ this.check }
            timer={ this.timer }
            limpaTudo={ this.limpaTudo }
          />
          <div className="cronometro">
{/*           { total === 0 && click && (<div className="clock-container">
          <div className="clock-column">
                <p className="clock-minutes clock-timer">00</p>
                <p className="clock-label">MINUTOS</p>
              </div>
              <div className="clock-column">
                <p className="clock-seconds clock-timer">00</p>
                <p className="clock-label">SEGUNDOS</p>
              </div>

          </div>) } */}
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
          </div>
        </div>
      </main>
    )
  }
}
