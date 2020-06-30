class TSVTable extends HTMLElement {
  constructor () {
    super();
    const ss = this.textContent.trim().split("\n");
    this.textContent = "";

    const c = tag => document.createElement(tag);
    const tbl = c("table");
    let firstline = true;
    for (const s of ss) {
      const tr = c("tr");
      tbl.append(tr);
      const s2 = s.split("\t");
      for (const s3 of s2) {
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

customElements.define('tsv-table', TSVTable);
