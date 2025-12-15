// +10 darbo dienų (praleidžiant šeštadienį ir sekmadienį)
export function addBusinessDays(startDate, days){
  const d = new Date(startDate);
  let added = 0;
  while(added < days){
    d.setDate(d.getDate() + 1);
    const w = d.getDay(); // 0=Sekm,6=Šešt
    if(w !== 0 && w !== 6) added++;
  }
  return d;
}

export function formatDate(d){
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

export function makeInvoiceNumber(){
  const d = new Date();
  return `INV-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
}

/** order = { items:[{title, price, qty}], total:number, customer:{name,email,phone,address,notes} } */
export function buildInvoiceHTML(order){
  const issued = new Date();
  const due = addBusinessDays(issued, 10);
  const invNo = makeInvoiceNumber();

  const rows = order.items.map(it=>`
    <tr>
      <td>${escapeHtml(it.title)}</td>
      <td style="text-align:right">${it.price.toFixed(2)} €</td>
      <td style="text-align:center">${it.qty}</td>
      <td style="text-align:right">${(it.price*it.qty).toFixed(2)} €</td>
    </tr>
  `).join('');

  return `<!doctype html>
<html lang="lt"><head><meta charset="utf-8" />
<title>Sąskaita ${invNo}</title>
<style>
  body{font-family:Segoe UI,Roboto,Arial,sans-serif; color:#111827; margin:24px}
  h1{margin:0 0 6px}
  .muted{color:#6b7280}
  table{width:100%; border-collapse:collapse; margin-top:12px}
  th,td{border:1px solid #e5e7eb; padding:8px}
  th{background:#f9fafb; text-align:left}
  .right{ text-align:right }
  .box{border:1px solid #e5e7eb; padding:12px; border-radius:8px; margin-top:12px}
  .footer{margin-top:18px; font-size:14px; color:#374151}
  .brand{font-weight:700}
  .btn{display:inline-block; padding:10px 14px; background:#111827; color:#fff; text-decoration:none; border-radius:8px}
</style></head>
<body>
  <h1>Sąskaita faktūra</h1>
  <div class="muted">${invNo}</div>

  <div class="box">
    <div><span class="brand">Pardavėjas:</span> Akmenys, UAB, Įm. kodas 123456789</div>
    <div>Adresas: Pavyzdžio g. 1, Vilnius</div>
    <div>El. paštas: info@akmenys.lt</div>
  </div>

  <div class="box">
    <div><strong>Pirkėjas:</strong> ${escapeHtml(order.customer.name)}</div>
    <div><strong>El. paštas:</strong> ${escapeHtml(order.customer.email)}</div>
    ${order.customer.phone ? `<div><strong>Telefonas:</strong> ${escapeHtml(order.customer.phone)}</div>` : ``}
    <div><strong>Adresas:</strong> ${escapeHtml(order.customer.address)}</div>
    ${order.customer.notes ? `<div class="muted">Pastabos: ${escapeHtml(order.customer.notes)}</div>` : ``}
  </div>

  <div class="box">
    <div><strong>Išrašymo data:</strong> ${formatDate(issued)}</div>
    <div><strong>Apmokėti iki:</strong> ${formatDate(due)} (per 10 darbo dienų)</div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Prekė</th>
        <th class="right">Kaina</th>
        <th style="text-align:center">Kiekis</th>
        <th class="right">Suma</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="right">Viso:</th>
        <th class="right">${order.total.toFixed(2)} €</th>
      </tr>
    </tfoot>
  </table>

  <div class="footer">
    Sąskaita turi būti apmokėta per 10 darbo dienų. Nepatikslinus apmokėjimo per terminą, užsakymas gali būti atšauktas.
  </div>

  <p style="margin-top:18px">
    <a class="btn" href="javascript:window.print()">Spausdinti / Išsaugoti kaip PDF</a>
  </p>
</body></html>`;
}

export function downloadInvoiceHTML(html, filename){
  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  a.remove(); URL.revokeObjectURL(url);
}

function escapeHtml(s=''){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}
