class Clothes {
    saleInEuro!: number;
    
    constructor(
      public id: number,
      public codProdotto: string,
      public prezzoivainclusa: number,
      public prezzoivaesclusa: number,
      public collezione: string,
      public colore: string,
      public modello: string,
      public quantita: number,
      public disponibile: string,
      public saldo: number
    ) {
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
  .then((res: any) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  })
  .then((data: any) => {
    let clothesArray: Clothes[] = [];
    data.forEach((clothes: any, i: any) => {
      clothes = new Clothes(
        data[i].codprod,
        data[i].capo,
        data[i].prezzoivaesclusa,
        data[i].prezzoivainclusa,
        data[i].collezione,
        data[i].colore,
        data[i].modello,
        data[i].quantita,
        data[i].disponibile,
        data[i].saldo
      );
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
