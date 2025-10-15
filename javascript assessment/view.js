class SubmissionViewer {
  constructor(tableId, searchBarId, noDataId) {
    this.table = document.getElementById(tableId);
    this.searchBar = document.getElementById(searchBarId);
    this.noData = document.getElementById(noDataId);
    this.data = JSON.parse(localStorage.getItem('hotelSubmissions')) || [];
    this.renderTable();

    this.searchBar.addEventListener('input', () => this.filterData());
  }

  renderTable(filteredData = this.data) {
    this.table.innerHTML = '';

    if (filteredData.length === 0) {
      this.noData.textContent = 'No data found!';
      return;
    } else {
      this.noData.textContent = '';
    }

    filteredData.forEach((entry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.phone}</td>
        <td>${entry.email}</td>
        <td>${entry.checkIn}</td>
        <td>${entry.checkOut}</td>
        <td>${entry.adults}</td>
        <td>${entry.purpose}</td>
        <td><button class="btn btn-danger btn-sm" data-index="${index}">Delete</button></td>
      `;
      this.table.appendChild(row);
    });

    // Event delegation for delete
    this.table.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.deleteRecord(e.target.dataset.index);
      }
    });
  }

  filterData() {
    const term = this.searchBar.value.toLowerCase();
    const filtered = this.data.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.checkIn.toLowerCase().includes(term)
    );
    this.renderTable(filtered);
  }

  deleteRecord(index) {
    this.data.splice(index, 1);
    localStorage.setItem('hotelSubmissions', JSON.stringify(this.data));
    this.renderTable();
  }
}

new SubmissionViewer('submissionTable', 'searchBar', 'noData');
