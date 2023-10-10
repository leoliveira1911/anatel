import React, { useState } from "react";
import Input from "./Input";
import { isElementOfType } from "react-dom/test-utils";

export default function Layout() {
  const [valor, setValor] = useState([]);
  const [potencia, setPotencia] = useState(0);
  const [valorPerdaCabos, setValorPerdaCabos] = useState(0);
  const [ganhoAntena, setganhoAntena] = useState(0);
  const [ind, setInd] = useState(0);

  const [frequencia, setFrequencia] = useState(0);

  function converterWtoDbm(w) {
    const dbm = 10 * Math.log10(1000 * w);
    return +dbm.toFixed(2);
  }
  function converterDbmToW(dbm) {
    const w = 10 ** ((dbm - 30) / 10);
    console.log(w);
    return +w.toFixed(2);
  }

  function pushValues() {
    const obj = { frequencia, potencia, ind };
    setValor([...valor, obj]);
    setInd(ind + 1);
    console.log(valor);
  }

  function delFreq(index) {
    setValor(valor.filter((el) => el.ind !== index));
  }

  function printResults(valor) {
    const g = +(10 ** (ganhoAntena / 10)).toFixed(4);
    const textoBase = (
      <>
        <h1>
          Ganho da antena G = 10 ^ ({ganhoAntena}/10) = <mark>{g}</mark>
        </h1>
        <h1>D para população geral:</h1>
      </>
    );
    const textoExposicaoOcupacional = <h1>D para exposição ocupacional</h1>;
    const dPopGeral = [];
    let dMaxPopGeral = 0;
    const dExposicaoOcupacional = [];
    let dMaxExpOcupacional = 0;
    const potenciaOperacaoEAntena = [];
    valor.map((el) => {
      const valorDbm = +converterWtoDbm(el.potencia).toFixed(2);
      const valorParaAntenaDbm = +(valorDbm - valorPerdaCabos).toFixed(2);
      const valorParaAntenaW = converterDbmToW(valorParaAntenaDbm);
      const eirp = +(g * valorParaAntenaW).toFixed(2);

      potenciaOperacaoEAntena.push(
        <>
          <p>
            Potência de operação frequencia {el.frequencia} MHz ={" "}
            <mark>{valorDbm}</mark> dBm
          </p>
          <p>
            Potência entregue à antena frequencia {el.frequencia} MHz ={" "}
            <mark>{valorParaAntenaDbm}</mark> dBm
          </p>
          <br />
        </>
      );

      dPopGeral.push(
        <>
          <p>
            Calculando-se EIRP para a frequência F={el.frequencia} MHz, tem-se:{" "}
          </p>
          {/* <p>
            Potência entregue à antena = <mark>{valorParaAntenaW}</mark> W
            (valor utilizado para cálculos){" "}
          </p>
 */}{" "}
          <p>EIRP = Pt x G</p>
          <p>
            EIRP =
            <mark>
              {valorParaAntenaW} x {g}
            </mark>{" "}
            = <mark>{eirp}</mark> W
          </p>
          <p>Então: </p>
          <p>D = 1,3 x (EIRP/Slim) ^0,5 </p>
          <p>
            D = 1,3 x (<mark>{eirp}</mark> / 2) ^0,5
          </p>
          <p>
            D = 1,3 x (<mark>{eirp / 2}</mark>) ^0,5 ={" "}
            <mark>{(1.3 * (eirp / 2) ** 0.5).toFixed(2)}</mark> m
          </p>
          <br />
        </>
      );
      if ((1.3 * (eirp / 2) ** 0.5).toFixed(2) >= dMaxPopGeral) {
        dMaxPopGeral = (1.3 * (eirp / 2) ** 0.5).toFixed(2);
      }
      dExposicaoOcupacional.push(
        <div>
          <p>Conforme já calculado anteriormente:</p>
          <p>
            EIRP para a frequência F={el.frequencia} MHz ={" "}
            <mark>
              {valorParaAntenaW} x {g} = {eirp}
            </mark>
          </p>
          <p>Então:</p>
          <p>D = 1,3 x (EIRP/Slim) ^0,5 </p>
          <p>
            D = 1,3 x (<mark>{eirp}</mark> / 10) ^0,5
          </p>
          <p>
            D = 1,3 x (<mark>{(eirp / 10).toFixed(3)}</mark>) ^0,5 ={" "}
            <mark>{(1.3 * (eirp / 10) ** 0.5).toFixed(2)}</mark> m
          </p>
          <br />
        </div>
      );
      if ((1.3 * (eirp / 10) ** 0.5).toFixed(2) >= dMaxExpOcupacional) {
        dMaxExpOcupacional = (1.3 * (eirp / 10) ** 0.5).toFixed(2);
      }
    });
    if (valor.length > 0) {
      return [
        <h1>Dados tabela item 5</h1>,
        <div className="box">{potenciaOperacaoEAntena}</div>,
        textoBase,
        <div className="box">{dPopGeral}</div>,
        textoExposicaoOcupacional,
        <div className="box">{dExposicaoOcupacional}</div>,
        <h2>D Máx </h2>,
        <div className="box"> D Max Pop Geral = {dMaxPopGeral}</div>,
        <div className="box">
          {" "}
          D Max Exposição Ocupacional = {dMaxExpOcupacional}
        </div>,
      ];
    }
  }

  function renderFreqs(valor) {
    return valor.map((el) => {
      return (
        <div className="freqList" key={el.ind}>
          <h2>Freq: {el.frequencia}MHz</h2>
          <h2>Potencia: {el.potencia}W</h2>
          <button onClick={() => delFreq(el.ind)}>Deletar Frequência</button>
        </div>
      );
    });
  }

  return (
    <div className="layout">
      <div className="box">
        <Input
          label="Informe a perda dos cabos em db"
          type="number"
          value={valorPerdaCabos}
          onChange={(e) => setValorPerdaCabos(e.target.value)}
        />
        <Input
          label="Informe o ganho da antena dBi"
          type="number"
          value={ganhoAntena}
          onChange={(e) => setganhoAntena(e.target.value)}
        />
      </div>{" "}
      <div className="box">
        <Input
          label="Informe a Frequência em MHz"
          type="number"
          value={frequencia}
          onChange={(e) => setFrequencia(e.target.value)}
        />
        <Input
          label="Informe a potência em W"
          type="number"
          value={potencia}
          onChange={(e) => setPotencia(e.target.value)}
        />
        <button onClick={() => pushValues()}>Adicionar Frequencia</button>
      </div>
      <div className="gridFreqs">{renderFreqs(valor)}</div>
      <div className="resultados">{printResults(valor)}</div>
    </div>
  );
}
