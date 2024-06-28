paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.50' // Set the payment amount to 0.50 EUR
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            document.querySelector('.payment-container').style.display = 'none';
            document.querySelector('.username-container').style.display = 'block';
        });
    },
    onCancel: function(data) {
        alert('Payment was cancelled!');
    },
    onError: function(err) {
        console.error('An error occurred during the payment process:', err);
        alert('An error occurred during the payment process.');
    }
}).render('#paypal-button-container');

document.getElementById('username-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Username submitted successfully!');
        } else {
            alert('An error occurred: ' + data.error);
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again.');
    });
});

