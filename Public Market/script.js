const form = document.getElementById('Vendor-Form');
const tableBody = document.querySelector('#vendor-table tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('business-name').value;
  const type = document.getElementById('product-type').value;
  const permit = document.getElementById('permit-number').value;
  const sanitary = document.querySelector('input[name="sanitary"]:checked')?.value || 'Not specified';

  const cleanlinessArr = [];
  const dailyCleaning = document.getElementById('daily-cleaning').checked;
  const wasteDisposal = document.getElementById('waste-disposal').checked;

  if (dailyCleaning) cleanlinessArr.push('Daily Cleaning');
  if (wasteDisposal) cleanlinessArr.push('Waste Disposal');
  const cleanliness = cleanlinessArr.join(', ') || 'None';

  const isNonCompliant = sanitary === 'Poor' || !dailyCleaning && !wasteDisposal;

  const newRow = tableBody.insertRow();
  if (isNonCompliant) {
    newRow.classList.add('non-compliant');
  }

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${type}</td>
    <td>${permit}</td>
    <td>${sanitary}</td>
    <td>${cleanliness}</td>
  `;

  form.reset();
});

function exportToExcel() {
  const table = document.getElementById('vendor-table');
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Form Data" });
  XLSX.writeFile(workbook, 'form_data.xlsx');
}