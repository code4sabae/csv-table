import { CSV } from "https://js.sabae.cc/CSV.js";

class CSVTable extends HTMLElement {
  async getCSV() {
    const fn = this.getAttribute("src");
    if (fn) {
      const data = await CSV.fetch(fn);
      return data;
    }
    const txt = this.textContent.trim();
    const data = CSV.decode(txt);
    this.textContent = "";
    return data;
  }
  constructor () {
    super();
    this.init();
  }
  async init() {
    const ss = await this.getCSV();

    const c = tag => document.createElement(tag);
    const tbl = c("table");
    let firstline = true;
    for (const s of ss) {
      const tr = c("tr");
      tbl.append(tr);
      for (const s3 of s) {
        const td = c(firstline ? "th" : "td");
        tr.appendChild(td);
        td.textContent = s3;
      }
      tbl.appendChild(tr);
      firstline = false;
    }
    this.appendChild(tbl);

    // css
    const style = c('style');
    style.textContent = `
      table {
        border-collapse: collapse;
      }
      td, th {
        border: 1px solid #333;
        padding: .1em .5em;
        font-size: 90%;
      }
    `;
    this.appendChild(style);
  }
}

customElements.define('csv-table', CSVTable);

export { CSVTable };
