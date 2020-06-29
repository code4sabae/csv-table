import util from "https://taisukef.github.io/util/util.mjs";

class CSVTable extends HTMLElement {
  constructor () {
    super();
    const ss = util.decodeCSV(this.textContent.trim());
    this.textContent = "";
    const c = tag => document.createElement(tag);
    const tbl = c("table");
    for (const s of ss) {
      const tr = c("tr");
      tbl.append(tr);
      for (const s3 of s) {
        const td = c("td");
        tr.appendChild(td);
        td.textContent = s3;
      }
      tbl.appendChild(tr);
    }
    this.appendChild(tbl);

    // css
    const style = document.createElement('style');
    style.textContent = `
      table {
        border-collapse: collapse;
      }
      td {
        border: 1px solid #333;
        padding: .1em .5em;
        font-size: 90%;
      }
    `;
    this.appendChild(style);
  }
}

customElements.define('csv-table', CSVTable);
