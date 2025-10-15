class CustomerFormHandler {
  constructor(formId, messageBoxId) {
    this.form = document.getElementById(formId);
    this.messageBox = document.getElementById(messageBoxId);
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.saveToLocalStorage();
        this.showMessage('Form submitted successfully!', 'success');
        this.clearForm();
      }
    });

    // Real-time validation
    this.form.addEventListener('input', () => this.validateForm());
  }

  validateForm() {
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const aadhar = document.getElementById('aadhar').value.trim();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = document.getElementById('adults').value.trim();
    const purpose = document.getElementById('purpose').value.trim();

    let valid = true;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name.length < 3) valid = this.showMessage('Name must be at least 3 characters.', 'danger');
    else if (phone.length !== 10) valid = this.showMessage('Phone must be 10 digits.', 'danger');
    else if (!email.match(emailPattern)) valid = this.showMessage('Invalid email format.', 'danger');
    else if (address === '') valid = this.showMessage('Address cannot be empty.', 'danger');
    else if (aadhar.length !== 12) valid = this.showMessage('Aadhar must be 12 digits.', 'danger');
    else if (new Date(checkIn) < new Date()) valid = this.showMessage('Check-In must be a future date.', 'danger');
    else if (new Date(checkOut) <= new Date(checkIn)) valid = this.showMessage('Check-Out must be after Check-In.', 'danger');
    else if (adults <= 0) valid = this.showMessage('Adults must be a positive number.', 'danger');
    else if (purpose === '') valid = this.showMessage('Purpose of visit is required.', 'danger');
    else valid = true;

    return valid;
  }

  saveToLocalStorage() {
    const data = JSON.parse(localStorage.getItem('hotelSubmissions')) || [];
    const newEntry = {
      name: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      aadhar: document.getElementById('aadhar').value,
      checkIn: document.getElementById('checkIn').value,
      checkOut: document.getElementById('checkOut').value,
      adults: document.getElementById('adults').value,
      purpose: document.getElementById('purpose').value,
    };
    data.push(newEntry);
    localStorage.setItem('hotelSubmissions', JSON.stringify(data));
  }

  clearForm() {
    this.form.reset();
  }

  showMessage(message, type) {
    this.messageBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    setTimeout(() => (this.messageBox.innerHTML = ''), 3000);
    return false;
  }
}

// Initialize form handler
new CustomerFormHandler('customerForm', 'messageBox');
