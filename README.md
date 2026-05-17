<!-- @format -->

## Project Explanation

---

### Home Page (Payment Flow)

On the home page, users can enter their payment details and initiate a transaction.
While testing, you can use a valid card number that passes the :contentReference[oaicite:0]{index=0}, for example:

### Form Handling & Validation

All form inputs are stored in a state variable. Before sending any request:

- I validate whether all required fields are filled
- I validate the card number using the Luhn algorithm
- Only after successful validation, the hash is generated

The hash generation logic is implemented in `hash.js`, and the main integration flow is handled in `Checkout.jsx`.

---

### Known Issues & Decisions

- **Iframe Loading Delay**  
  After receiving the `redirectUrl`, the iframe takes some time to load.  
  I attempted to handle loading states, but this part is not fully optimized yet.

- **Form Reset Disabled**  
  I implemented a form reset feature after submission, but it felt annoying to re-enter all details during testing.  
  So I commented it out intentionally.

  If you want to enable it, you can uncomment the relevant code around:

---

---

## Transaction History Page

In this component:

- I fetch transaction data from the API
- Store it using state variables
- Mask sensitive card numbers using a custom `maskedNum` function
- Implement pagination (10 records per page)
- Add a loading state for better UX

### Summary Section

I created summary cards showing:

- Total transactions (per page)
- Total success count
- Total failed count
- Total success volume

---

### Transaction Table

The table displays:

- Order ID
- Card Number (masked)
- Email
- Expiry
- CVC
- Amount
- Currency
- Status

⚠️ Note:  
The API did not provide email data, so I used a fallback:

---

## Dashboard Page

This page focuses on data visualization.

### Charts Implemented

- **Transaction Status Donut Chart**
  - Based on 500 transaction entries
  - Shows success vs failure distribution

- **Currency Distribution Chart**
  - I created a function `currencyDistribution`
  - It calculates frequency of each currency
  - Data is visualized using a donut chart

### 🎨 Dynamic Color Handling

To handle future changes in currency types:

- I implemented a random color generator
- It generates HEX color codes dynamically

---

## 📊 Summary Cards

The dashboard includes 4 key metrics:

- Total Transactions
- Total Success Volume
- Total Success Count
- Total Failed Count

---

## 🧭 Navigation

A header is implemented for easy navigation between:

- Home (Payment)
- History
- Dashboard
