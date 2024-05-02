export const bookings = [
	// CABIN 001
	[
		{
			id: 3,
			created_at: '2024-04-05T15:19:59.986+00:00',
			startDate: '2024-04-25T00:00:00',
			endDate: '2024-05-02T00:00:00',
			numNights: 7,
			numGuests: 1,
			cabinPrice: 1750,
			extrasPrice: 105,
			totalPrice: 1855,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: false,
			observations:
				'I have a gluten allergy and would like to request a gluten-free breakfast.',
			guestId: 94,
			cabinId: 90,
		},
		{
			id: 4,
			created_at: '2024-03-23T15:19:59.986+00:00',
			startDate: '2024-04-02T00:00:00',
			endDate: '2024-04-12T00:00:00',
			numNights: 10,
			numGuests: 2,
			cabinPrice: 2500,
			extrasPrice: 300,
			totalPrice: 2800,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 95,
			cabinId: 90,
		},
		{
			id: 5,
			created_at: '2024-03-29T15:19:59.986+00:00',
			startDate: '2024-05-07T00:00:00',
			endDate: '2024-05-13T00:00:00',
			numNights: 6,
			numGuests: 2,
			cabinPrice: 1500,
			extrasPrice: 0,
			totalPrice: 1500,
			status: 'unconfirmed',
			hasBreakfast: false,
			isPaid: false,
			observations: '',
			guestId: 96,
			cabinId: 90,
		},
		{
			id: 6,
			created_at: '2024-03-11T15:19:59.986+00:00',
			startDate: '2024-03-11T00:00:00',
			endDate: '2024-03-27T00:00:00',
			numNights: 16,
			numGuests: 2,
			cabinPrice: 5200,
			extrasPrice: 0,
			totalPrice: 5200,
			status: 'checked-out',
			hasBreakfast: false,
			isPaid: true,
			observations: '',
			guestId: 97,
			cabinId: 91,
		},
		{
			id: 7,
			created_at: '2024-04-23T15:19:59.986+00:00',
			startDate: '2024-05-10T00:00:00',
			endDate: '2024-05-13T00:00:00',
			numNights: 3,
			numGuests: 2,
			cabinPrice: 975,
			extrasPrice: 90,
			totalPrice: 1065,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 98,
			cabinId: 91,
		},
		{
			id: 8,
			created_at: '2024-04-20T15:19:59.986+00:00',
			startDate: '2024-05-28T00:00:00',
			endDate: '2024-06-12T00:00:00',
			numNights: 15,
			numGuests: 2,
			cabinPrice: 4875,
			extrasPrice: 450,
			totalPrice: 5325,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: false,
			observations: '',
			guestId: 99,
			cabinId: 91,
		},
		{
			id: 9,
			created_at: '2024-02-20T15:19:59.986+00:00',
			startDate: '2024-03-31T00:00:00',
			endDate: '2024-04-05T00:00:00',
			numNights: 5,
			numGuests: 4,
			cabinPrice: 1500,
			extrasPrice: 300,
			totalPrice: 1800,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 100,
			cabinId: 92,
		},
		{
			id: 10,
			created_at: '2024-04-23T15:19:59.986+00:00',
			startDate: '2024-04-23T00:00:00',
			endDate: '2024-04-25T00:00:00',
			numNights: 2,
			numGuests: 3,
			cabinPrice: 600,
			extrasPrice: 0,
			totalPrice: 600,
			status: 'checked-in',
			hasBreakfast: false,
			isPaid: true,
			observations: 'We will be bringing our small dog with us',
			guestId: 101,
			cabinId: 92,
		},
		{
			id: 11,
			created_at: '2024-04-11T15:19:59.986+00:00',
			startDate: '2024-04-11T00:00:00',
			endDate: '2024-04-14T00:00:00',
			numNights: 3,
			numGuests: 4,
			cabinPrice: 900,
			extrasPrice: 180,
			totalPrice: 1080,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 102,
			cabinId: 92,
		},
		{
			id: 12,
			created_at: '2024-03-26T15:19:59.986+00:00',
			startDate: '2024-04-21T00:00:00',
			endDate: '2024-05-03T00:00:00',
			numNights: 12,
			numGuests: 4,
			cabinPrice: 5400,
			extrasPrice: 720,
			totalPrice: 6120,
			status: 'checked-in',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 103,
			cabinId: 93,
		},
		{
			id: 13,
			created_at: '2024-04-24T15:19:59.986+00:00',
			startDate: '2024-05-07T00:00:00',
			endDate: '2024-05-12T00:00:00',
			numNights: 5,
			numGuests: 4,
			cabinPrice: 2250,
			extrasPrice: 300,
			totalPrice: 2550,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: false,
			observations: '',
			guestId: 104,
			cabinId: 93,
		},
		{
			id: 14,
			created_at: '2024-04-22T15:19:59.986+00:00',
			startDate: '2024-05-13T00:00:00',
			endDate: '2024-05-14T00:00:00',
			numNights: 1,
			numGuests: 1,
			cabinPrice: 450,
			extrasPrice: 0,
			totalPrice: 450,
			status: 'unconfirmed',
			hasBreakfast: false,
			isPaid: true,
			observations: '',
			guestId: 105,
			cabinId: 93,
		},
		{
			id: 15,
			created_at: '2024-04-25T15:19:59.986+00:00',
			startDate: '2024-05-09T00:00:00',
			endDate: '2024-05-16T00:00:00',
			numNights: 7,
			numGuests: 5,
			cabinPrice: 2450,
			extrasPrice: 525,
			totalPrice: 2975,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: false,
			observations: '',
			guestId: 106,
			cabinId: 94,
		},
		{
			id: 16,
			created_at: '2024-04-19T15:19:59.986+00:00',
			startDate: '2024-04-19T00:00:00',
			endDate: '2024-04-21T00:00:00',
			numNights: 2,
			numGuests: 4,
			cabinPrice: 700,
			extrasPrice: 120,
			totalPrice: 820,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 107,
			cabinId: 94,
		},
		{
			id: 17,
			created_at: '2024-04-21T15:19:59.986+00:00',
			startDate: '2024-04-21T00:00:00',
			endDate: '2024-04-24T00:00:00',
			numNights: 3,
			numGuests: 6,
			cabinPrice: 1050,
			extrasPrice: 0,
			totalPrice: 1050,
			status: 'checked-out',
			hasBreakfast: false,
			isPaid: true,
			observations: '',
			guestId: 108,
			cabinId: 94,
		},
		{
			id: 18,
			created_at: '2024-04-22T15:19:59.986+00:00',
			startDate: '2024-04-25T00:00:00',
			endDate: '2024-05-06T00:00:00',
			numNights: 11,
			numGuests: 6,
			cabinPrice: 7700,
			extrasPrice: 0,
			totalPrice: 7700,
			status: 'unconfirmed',
			hasBreakfast: false,
			isPaid: true,
			observations:
				"We will be checking in late, around midnight. Hope that's okay :)",
			guestId: 109,
			cabinId: 95,
		},
		{
			id: 19,
			created_at: '2024-04-09T15:19:59.986+00:00',
			startDate: '2024-04-09T00:00:00',
			endDate: '2024-04-16T00:00:00',
			numNights: 7,
			numGuests: 4,
			cabinPrice: 4900,
			extrasPrice: 420,
			totalPrice: 5320,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: 'I will need a rollaway bed for one of the guests',
			guestId: 110,
			cabinId: 95,
		},
		{
			id: 20,
			created_at: '2024-04-07T15:19:59.986+00:00',
			startDate: '2024-04-21T00:00:00',
			endDate: '2024-04-24T00:00:00',
			numNights: 3,
			numGuests: 6,
			cabinPrice: 2100,
			extrasPrice: 270,
			totalPrice: 2370,
			status: 'checked-out',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 111,
			cabinId: 95,
		},
		{
			id: 21,
			created_at: '2024-04-23T15:19:59.986+00:00',
			startDate: '2024-05-12T00:00:00',
			endDate: '2024-05-18T00:00:00',
			numNights: 6,
			numGuests: 8,
			cabinPrice: 3000,
			extrasPrice: 0,
			totalPrice: 3000,
			status: 'unconfirmed',
			hasBreakfast: false,
			isPaid: false,
			observations: '',
			guestId: 112,
			cabinId: 96,
		},
		{
			id: 22,
			created_at: '2024-04-18T15:19:59.986+00:00',
			startDate: '2024-06-04T00:00:00',
			endDate: '2024-06-14T00:00:00',
			numNights: 10,
			numGuests: 7,
			cabinPrice: 5000,
			extrasPrice: 1050,
			totalPrice: 6050,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 113,
			cabinId: 96,
		},
		{
			id: 23,
			created_at: '2024-03-01T15:19:59.986+00:00',
			startDate: '2024-05-27T00:00:00',
			endDate: '2024-06-01T00:00:00',
			numNights: 5,
			numGuests: 6,
			cabinPrice: 2500,
			extrasPrice: 450,
			totalPrice: 2950,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: true,
			observations: '',
			guestId: 114,
			cabinId: 96,
		},
		{
			id: 24,
			created_at: '2024-04-17T15:19:59.986+00:00',
			startDate: '2024-04-20T00:00:00',
			endDate: '2024-04-25T00:00:00',
			numNights: 5,
			numGuests: 9,
			cabinPrice: 7000,
			extrasPrice: 675,
			totalPrice: 7675,
			status: 'checked-in',
			hasBreakfast: true,
			isPaid: true,
			observations:
				'My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible',
			guestId: 93,
			cabinId: 97,
		},
		{
			id: 25,
			created_at: '2024-04-25T15:19:59.986+00:00',
			startDate: '2024-04-25T00:00:00',
			endDate: '2024-04-30T00:00:00',
			numNights: 5,
			numGuests: 10,
			cabinPrice: 7000,
			extrasPrice: 750,
			totalPrice: 7750,
			status: 'unconfirmed',
			hasBreakfast: true,
			isPaid: true,
			observations:
				'I am celebrating my anniversary, can you arrange for any special amenities or decorations?',
			guestId: 115,
			cabinId: 97,
		},
		{
			id: 26,
			created_at: '2024-04-15T15:19:59.986+00:00',
			startDate: '2024-05-05T00:00:00',
			endDate: '2024-05-08T00:00:00',
			numNights: 3,
			numGuests: 7,
			cabinPrice: 4200,
			extrasPrice: 0,
			totalPrice: 4200,
			status: 'unconfirmed',
			hasBreakfast: false,
			isPaid: true,
			observations: '',
			guestId: 116,
			cabinId: 97,
		},
	],
];
