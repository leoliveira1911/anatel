function converterDbmToW(dbm) {
  const exp = (dbm - 30) / 10;
  console.log(exp);
  const w = 10 ** exp;
  console.log(w);
  return w;
}

converterDbmToW(41.16);

function converterWtoDbm(w) {
  const dbm = 10 * Math.log10(1000 * w);
  console.log(dbm);
  return dbm;
}

converterWtoDbm(20);
