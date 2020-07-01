const decodeTSV = (s) => {
  const sepc = "\t";
  const res = [];
  let st = 0;
  let line = [];
  let sb = null;
  if (!s.endsWith("\n")) { s += "\n"; }
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const c = s.charAt(i);
    if (c === "\r") { continue; }
    if (st === 0) {
      if (c === "\n") {
        if (line.length > 0) { line.push(""); }
        res.push(line);
        line = [];
      } else if (c == sepc) {
        line.push("")
      } else if (c == "\"") {
        sb = "";
        st = 2;
      } else {
        sb = c;
        st = 1;
      }
    } else if (st === 1) {
      if (c === "\n") {
        line.push(sb);
        res.push(line);
        line = [];
        st = 0;
        sb = null;
      } else if (c === sepc) {
        line.push(sb);
        sb = null;
        st = 0;
      } else {
        sb += c;
      }
    } else if (st === 2) {
      if (c === "\"") {
        st = 3;
      } else {
        sb += c;
      }
    } else if (st === 3) {
      if (c === "\"") {
        sb += c;
        st = 2;
      } else if (c === sepc) {
        line.push(sb);
        sb = null;
        st = 0;
      } else if (c === "\n") {
        line.push(sb);
        res.push(line);
        line = [];
        st = 0;
        sb = null;
      }
    }
  }
  if (sb != null) { line.push(sb); }
  if (line.length > 0) { res.push(line); }
  return res;
};

class TSVTable extends HTMLElement {
  constructor () {
    super();
    const ss = decodeTSV(this.textContent.trim());
    this.textContent = "";

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
    const style = c("style");
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

customElements.define("tsv-table", TSVTable);
