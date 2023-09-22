import React, { useState } from "react";
import Input from "./Input";

export default function Layout() {
  const [valor, setValor] = useState(0);
  const [valorPerdaCabos, setValorPerdaCabos] = useState(0);
  const [ganhoAntena, setganhoAntena] = useState(0);
  const handleChange = (e) => setValor(e.target.value);

  function converterWtoDbm(w) {
    const dbm = 10 * Math.log10(1000 * w);
    return +dbm.toFixed(2);
  }
  function converterDbmToW(dbm) {
    const w = 10 ** ((dbm - 30) / 10);
    console.log(w);
    return +w.toFixed(2);
  }

  const valorDbm = +converterWtoDbm(valor).toFixed(2);
  const valorParaAntenaDbm = +(valorDbm - valorPerdaCabos).toFixed(2);
  const valorParaAntenaW = converterDbmToW(valorParaAntenaDbm);
  const g = +(10 ** (ganhoAntena / 10)).toFixed(4);
  const eirp = +(g * valorParaAntenaW).toFixed(2);

  return (
    <div className="layout">
      <div className="box">
        <Input
          label="Informe a potência em W"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
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
      </div>

      <h1>Resultados</h1>
      <h3>
        Potência de operação = <mark>{valorDbm}</mark> dBm
      </h3>
      <h3>
        Potência entregue à antena = <mark>{valorParaAntenaDbm}</mark> dBm
      </h3>
      <h3>
        Potência entregue à antena = <mark>{valorParaAntenaW}</mark> W (valor
        utilizado para cálculos){" "}
      </h3>
      <h3>
        Ganho da antena G = 10 ^ ({ganhoAntena}/10) = <mark>{g}</mark>
      </h3>
      <h3>
        EIRP = Potência x G = {valorParaAntenaW} x {g} = <mark>{eirp}</mark> W
      </h3>

      <h3>D para população geral: </h3>
      <h3>D = 1,3 x (EIRP/Slim) ^0,5 </h3>
      <h3>
        D = 1,3 x (<mark>{eirp}</mark> / 2) ^0,5
      </h3>
      <h3>
        D = 1,3 x (<mark>{eirp / 2}</mark>) ^0,5
      </h3>
      <h3>
        D = <mark>{(1.3 * (eirp / 2) ** 0.5).toFixed(2)}</mark> m
      </h3>

      <h3>D para exposição ocupacional: </h3>
      <h3>D = 1,3 x (EIRP/Slim) ^0,5 </h3>
      <h3>
        D = 1,3 x (<mark>{eirp}</mark> / 10) ^0,5
      </h3>
      <h3>
        D = 1,3 x (<mark>{(eirp / 10).toFixed(3)}</mark>) ^0,5
      </h3>
      <h3>
        D = <mark>{(1.3 * (eirp / 10) ** 0.5).toFixed(2)}</mark> m
      </h3>
    </div>
  );
}
