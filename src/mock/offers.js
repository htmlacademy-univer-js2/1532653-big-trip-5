const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '2bb2912c-541f-46c1-b6b3-82382e20d836',
        title: 'Upgrade to a business class',
        price: 187
      },
      {
        id: 'fc520b73-5254-4549-a1c6-e72ec23c0932',
        title: 'Choose the radio station',
        price: 149
      },
      {
        id: '1b945182-0c87-4b2a-bf67-73a8172bcb27',
        title: 'Choose temperature',
        price: 118
      },
      {
        id: 'eb1f0cf2-7fc7-41b4-8e61-55379b14dcd4',
        title: 'Drive quickly, I\'m in a hurry',
        price: 100
      },
      {
        id: '54c5a53d-bf64-4231-a246-4495fc39f818',
        title: 'Drive slowly',
        price: 147
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '71093e1f-0d45-4ff7-a32e-fc6bc1faec60',
        title: 'Infotainment system',
        price: 151
      },
      {
        id: 'f140706d-5ce4-400c-bc11-0175ce433dbc',
        title: 'Order meal',
        price: 99
      },
      {
        id: 'e5a2ca12-6a67-42ea-b62d-166f16b32ac6',
        title: 'Choose seats',
        price: 30
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '3f63ce59-705b-4eb4-88d9-aeaed4ec5338',
        title: 'Book a taxi at the arrival point',
        price: 147
      },
      {
        id: '45a88d41-b239-454e-a48b-d9e16313a325',
        title: 'Order a breakfast',
        price: 72
      },
      {
        id: 'fb25310a-c377-4350-a997-40a8c3f65147',
        title: 'Wake up at a certain time',
        price: 168
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '815751b2-f725-4327-ab65-069eb72f1231',
        title: 'Choose meal',
        price: 126
      },
      {
        id: '15fefba2-d69d-416f-874c-76df41305a8a',
        title: 'Choose seats',
        price: 167
      },
      {
        id: '335a61df-a110-4ef4-a7a5-d02ae2e47da9',
        title: 'Upgrade to comfort class',
        price: 38
      },
      {
        id: 'fd621c9d-06a1-41cd-bc89-60874c27586a',
        title: 'Upgrade to business class',
        price: 129
      },
      {
        id: '77f847fc-e5a7-4c55-b5ed-5c1b7d72f5d5',
        title: 'Add luggage',
        price: 53
      },
      {
        id: 'd4cff791-7869-438c-9845-d89517a24137',
        title: 'Business lounge',
        price: 139
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: '9d6c09f9-1b63-41ed-89e9-72b6d23032b9',
        title: 'Choose the time of check-in',
        price: 123
      },
      {
        id: 'da865e6b-9c61-4aaf-a019-57b551754f52',
        title: 'Choose the time of check-out',
        price: 138
      },
      {
        id: 'd493b4ef-eb1f-48fb-a711-ca32668d0c9f',
        title: 'Add breakfast',
        price: 159
      },
      {
        id: '99454821-e361-48df-b6e3-59b0a0748b02',
        title: 'Laundry',
        price: 185
      },
      {
        id: '9496cc21-cfbd-40cf-922f-f2e4c83a1ae4',
        title: 'Order a meal from the restaurant',
        price: 149
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: 'f4dfb806-8970-433d-bb82-a1bbf2a8e0f4',
        title: 'Choose meal',
        price: 72
      },
      {
        id: 'e4beada2-b081-48f7-8af1-5aeee0b87f49',
        title: 'Choose seats',
        price: 189
      },
      {
        id: '3015846f-f502-4ba3-b6a7-d9595f5fe877',
        title: 'Upgrade to comfort class',
        price: 141
      },
      {
        id: 'a6df075d-02ce-470a-99cb-da4edc5ab0fe',
        title: 'Upgrade to business class',
        price: 174
      },
      {
        id: '2fc5dc99-3bc6-42af-a559-c1f42aee0cb6',
        title: 'Add luggage',
        price: 32
      },
      {
        id: '8b130057-969f-49ed-8788-92c3b67bb841',
        title: 'Business lounge',
        price: 163
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '9095e75f-883b-4e76-9243-0698ecc3e1ad',
        title: 'With automatic transmission',
        price: 62
      },
      {
        id: '5294b67f-1fe6-4512-ac81-4a39bf847bf7',
        title: 'With air conditioning',
        price: 105
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 'c469c1d8-c61b-44aa-8792-362e353639ca',
        title: 'Choose live music',
        price: 133
      },
      {
        id: 'd5b71d69-d1e2-4c6f-b073-94c428a89291',
        title: 'Choose VIP area',
        price: 130
      }
    ]
  }
];

export {mockOffers};
