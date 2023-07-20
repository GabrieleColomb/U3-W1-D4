"use strict";
class Clothes {
    constructor(id, codProdotto, prezzoivainclusa, prezzoivaesclusa, collezione, colore, modello, quantita, disponibile, saldo) {
        this.id = id;
        this.codProdotto = codProdotto;
        this.prezzoivainclusa = prezzoivainclusa;
        this.prezzoivaesclusa = prezzoivaesclusa;
        this.collezione = collezione;
        this.colore = colore;
        this.modello = modello;
        this.quantita = quantita;
        this.disponibile = disponibile;
        this.saldo = saldo;
        this.getSale();
        this.getTotal();
    }
    getSale() {
        this.saleInEuro = (this.prezzoivaesclusa * this.saldo) / 100;
        return `${this.saleInEuro.toFixed(2)} €`;
    }
    getTotal() {
        return `${(this.prezzoivainclusa - this.saleInEuro).toFixed(2)} €`;
    }
}
fetch("starter/Abbigliamento.json")
    .then((res) => {
    if (res.ok) {
        return res.json();
    }
    else {
        throw new Error(res.statusText);
    }
})
    .then((data) => {
    let clothesArray = [];
    data.forEach((clothes, i) => {
        clothes = new Clothes(data[i].codprod, data[i].capo, data[i].prezzoivaesclusa, data[i].prezzoivainclusa, data[i].collezione, data[i].colore, data[i].modello, data[i].quantita, data[i].disponibile, data[i].saldo);
        clothesArray.push(clothes);
    });
    // Ora che abbiamo gli oggetti Clothes, possiamo generare l'HTML dinamicamente
    let tableHtml = `<h1>Capi d'abbigliamento in saldo</h1>
    <table>
      <thead>
        <tr>
          <th>Codice Prodotto</th>
          <th>Collezione</th>
          <th>Modello</th>
          <th>Prezzo (IVA inclusa)</th>
          <th>Prezzo (IVA esclusa)</th>
          <th>Quantità</th>
          <th>Disponibile</th>
          <th>Saldo</th>
          <th>Sconto in Euro</th>
          <th>Totale</th>
        </tr>
      </thead>
      <tbody>`;
    clothesArray.forEach((clothes) => {
        tableHtml += `
        <tr>
          <td>${clothes.codProdotto}</td>
          <td>${clothes.collezione}</td>
          <td>${clothes.modello}</td>
          <td>${clothes.prezzoivainclusa.toFixed(2)} €</td>
          <td>${clothes.prezzoivaesclusa.toFixed(2)} €</td>
          <td>${clothes.quantita}</td>
          <td>${clothes.disponibile}</td>
          <td>${clothes.saldo}</td>
          <td>${clothes.getSale()}</td>
          <td>${clothes.getTotal()}</td>
        </tr>`;
    });
    tableHtml += `</tbody>
    </table>`;
    // Inseriamo la tabella nel documento HTML
    const appDiv = document.getElementById("app");
    if (appDiv) {
        appDiv.innerHTML = tableHtml;
    }
});
