

const form = document.getElementById('Vendor-Form');
const tableBody = document.querySelector('#vendor-table tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('business-name').value;
  const type = document.getElementById('product-type').value;
  const permit = document.getElementById('permit-number').value;
  const sanitary = document.querySelector('input[name="sanitary"]:checked').value;
  const cleanliness = document.getElementById('cleanliness').checked ? 'Daily Cleaning' : 'Waste Disposal';

  const newRow = tableBody.insertRow();

  if (sanitary == 'Poor' ||  cleanliness == 'Waste Disposal') {
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

