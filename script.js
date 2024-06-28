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
            alert('Payment completed by ' + details.payer.name.given_name);
        });
    },
    onCancel: function (data) {
        alert('Payment was cancelled!');
    },
    onError: function (err) {
        console.error('An error occurred during the payment process:', err);
        alert('An error occurred during the payment process.');
    }
}).render('#paypal-button-container');
