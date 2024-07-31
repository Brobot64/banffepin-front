export const telcoUser = [
    {   name: 'mtn',
        denomination: 1000,
        quantity: 20,
        date: '23 oct, 2024',
        time: '5:00AM'
    },
    {   name: 'glo',
        denomination: 100,
        quantity: 90,
        date: '17 nov, 2024',
        time: '3:30AM'
    },
    {   name: '9 mobile',
        denomination: 1000,
        quantity: 17,
        date: '23 nov, 2024',
        time: '6:00AM'
    },
    {   name: 'airtel',
        denomination: 500,
        quantity: 100,
        date: '23 dec, 2024',
        time: '3:00AM'
    }
]

export function getFirstLetter(str) {
  return str.charAt(0);
}

// export function getRandomText(textArray) {
//   // If the array is empty or has only one element, return it directly
//   if (textArray.length <= 1) {
//     return textArray[0];
//   }

//   // Initialize previousText to avoid consecutive repetition
//   let previousText = null;

//   return function() {
//     let randomIndex;
//     let randomText;

//     do {
//       randomIndex = Math.floor(Math.random() * textArray.length);
//       randomText = textArray[randomIndex];
//     } while (randomText === previousText);

//     previousText = randomText;
//     return randomText;
//   };
// }

export function getRandomText(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const colorArray = ['FFE9D0', 'E9FF97', 'FFD18E', 'FFFED3', 'D8EFD3', 'FFEEA9', 'E7D4B5', '95D2B3']

export const denomArray = ['100', '200', '1000', '500', '2000', '5000', '1500', '2500'];

export const allOtherTelcos = [
  'ipnx', 'spectranet', 'starcom', 'ntel', 'starlink', 'verizon'
]

export const tonfa = {
    "companyName": "Your Company",
    "address": "123 Main Street",
    "city": "Hamilton",
    "state": "OH",
    "zip": "44416",
    "phone": "(321) 456-7890",
    "email": "email@example.com",
    "date": "2023-01-01",
    "invoiceNo": "123456",
    "billTo": {
      "name": "John Doe",
      "companyName": "Client Company",
      "address": "456 Client St",
      "city": "Client City",
      "state": "CC",
      "zip": "12345",
      "phone": "(123) 456-7890",
      "email": "client@example.com"
    },
    "shipTo": {
      "name": "Jane Doe",
      "companyName": "Client Company",
      "address": "456 Client St",
      "city": "Client City",
      "state": "CC",
      "zip": "12345",
      "phone": "(123) 456-7890",
      "email": "client@example.com"
    },
    "items": [
      {
        "description": "Product 1",
        "total": "$10.00"
      },
      {
        "description": "Product 2",
        "total": "$20.00"
      }
    ],
    "remarks": "Thank you for your business!",
    "subtotal": "$30.00",
    "discount": "$0.00",
    "subtotalLessDiscount": "$30.00",
    "taxRate": "7%",
    "totalTax": "$2.10",
    "shippingHandling": "$5.00",
    "other": "$0.00",
    "total": "$37.10",
    "contactName": "Your Name",
    "contactPhone": "(321) 456-7890",
    "contactEmail": "email@example.com",
    "website": "www.yourwebaddress.com"
  }
  