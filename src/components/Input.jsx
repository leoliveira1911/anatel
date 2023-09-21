import React, { useState } from "react";

export default function Input() {
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
  const valorParaAntenaDbm = valorDbm - valorPerdaCabos;
  const valorParaAntenaW = converterDbmToW(valorParaAntenaDbm);
  const g = +(10 ** (ganhoAntena / 10)).toFixed(4);
  const eirp = +(g * valorParaAntenaW).toFixed(2);

  return (
    <div>
      <label>Informe a potência em W</label>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <br />
      <label>Informe a perda dos cabos em db</label>
      <input
        type="number"
        value={valorPerdaCabos}
        onChange={(e) => setValorPerdaCabos(e.target.value)}
      />
      <br />
      <label>Informe o ganho da antena dBi </label>
      <input
        type="number"
        value={ganhoAntena}
        onChange={(e) => setganhoAntena(e.target.value)}
      />

      <h1>Resultados</h1>
      <h3>Potencia em dbm = {valorDbm}</h3>
      <h3>Potencia para a antena em dbm ={valorParaAntenaDbm}</h3>
      <h3>Potencia para a antena em w = {valorParaAntenaW}</h3>
      <h3>
        Ganho da antena G = 10 ^ ({ganhoAntena}/10) = {g}
      </h3>
      <h3>
        EIRP = Potencia x G = {valorParaAntenaW} x {g} = {eirp}
      </h3>

      <h3>D para população geral: </h3>
      <h3>D = 1,3 x (EIRP/Slim) ^0,5 </h3>
      <h3>D = 1,3 x ({eirp} / 2) ^0,5</h3>
      <h3>D = 1,3 x ({eirp / 2}) ^0,5</h3>
      <h3>D = 1,3 x ({+((eirp / 2) ** 0.5).toFixed(3)}) ^0,5</h3>
      <h3>D = {1.3 * +((eirp / 2) ** 0.5).toFixed(3)}</h3>

      <h3>D para exposição ocupacional: </h3>
      <h3>D = 1,3 x (EIRP/Slim) ^0,5 </h3>
      <h3>D = 1,3 x ({eirp} / 10) ^0,5</h3>
      <h3>D = 1,3 x ({eirp / 10}) ^0,5</h3>
      <h3>D = 1,3 x ({((eirp / 10) ** 0.5).toFixed(3)}) ^0,5</h3>
      <h3>D = {(1.3 * (eirp / 10) ** 0.5).toFixed(3)}</h3>
    </div>
  );
}
