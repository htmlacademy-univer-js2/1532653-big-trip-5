import {getRandomArrayElement} from '../utils/common.js';

const mockPoints = [
  {
    id: 'b252d44b-403f-4a8d-ae2a-243c29a05c10',
    price: 5882,
    dateFrom: '2025-02-28T21:41:14.530Z',
    dateTo: '2025-03-02T11:30:14.530Z',
    destination: 'f640c857-738b-4114-aa90-a3d128ddd07e',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '29584ec8-0cb8-4350-8a17-f16ec6ee50b0',
    price: 5946,
    dateFrom: '2025-03-03T04:53:14.530Z',
    dateTo: '2025-03-03T19:00:14.530Z',
    destination: 'f55f109d-a2e5-4a32-bfe7-0bd095ae2c8a',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '3c8d5488-3cc1-44e3-8c6f-5b1106f3ecb5',
    price: 4992,
    dateFrom: '2025-03-05T12:19:14.530Z',
    dateTo: '2025-03-06T10:56:14.530Z',
    destination: '80753e9b-ec89-441d-8948-5efd3750d832',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'e1bd6dae-df63-4d8e-bc60-af5eb8d804fe',
    price: 3136,
    dateFrom: '2025-03-07T04:37:14.530Z',
    dateTo: '2025-03-08T07:08:14.530Z',
    destination: 'f640c857-738b-4114-aa90-a3d128ddd07e',
    isFavorite: false,
    offers: [
      '9095e75f-883b-4e76-9243-0698ecc3e1ad',
      '5294b67f-1fe6-4512-ac81-4a39bf847bf7'
    ],
    type: 'drive'
  },
  {
    id: '35976f04-1985-4b26-a2a1-700ff02321f7',
    price: 3374,
    dateFrom: '2025-03-09T09:16:14.530Z',
    dateTo: '2025-03-09T19:59:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: false,
    offers: [
      '3f63ce59-705b-4eb4-88d9-aeaed4ec5338',
      '45a88d41-b239-454e-a48b-d9e16313a325',
      'fb25310a-c377-4350-a997-40a8c3f65147'
    ],
    type: 'train'
  },
  {
    id: '45829973-549d-494e-9ed3-bd387d3751f1',
    price: 1625,
    dateFrom: '2025-03-10T14:26:14.530Z',
    dateTo: '2025-03-12T07:41:14.530Z',
    destination: 'ae82e410-edc3-4260-95c4-975068dc4ccf',
    isFavorite: true,
    offers: [
      'c469c1d8-c61b-44aa-8792-362e353639ca',
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: '288331fb-351e-4c27-a432-d9ce97f75988',
    price: 7037,
    dateFrom: '2025-03-14T05:33:14.530Z',
    dateTo: '2025-03-15T22:36:14.530Z',
    destination: '80753e9b-ec89-441d-8948-5efd3750d832',
    isFavorite: false,
    offers: [
      '815751b2-f725-4327-ab65-069eb72f1231',
      '15fefba2-d69d-416f-874c-76df41305a8a',
      '335a61df-a110-4ef4-a7a5-d02ae2e47da9',
      'fd621c9d-06a1-41cd-bc89-60874c27586a',
      '77f847fc-e5a7-4c55-b5ed-5c1b7d72f5d5',
      'd4cff791-7869-438c-9845-d89517a24137'
    ],
    type: 'flight'
  },
  {
    id: '94916fba-0d01-4004-8da3-e6732008f7ec',
    price: 3696,
    dateFrom: '2025-03-16T18:24:14.530Z',
    dateTo: '2025-03-17T13:23:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: false,
    offers: [
      'e5a2ca12-6a67-42ea-b62d-166f16b32ac6'
    ],
    type: 'bus'
  },
  {
    id: '6b255db6-4047-49a8-8ba5-b8f7d5b16124',
    price: 7761,
    dateFrom: '2025-03-19T09:49:14.530Z',
    dateTo: '2025-03-20T13:02:14.530Z',
    destination: '80753e9b-ec89-441d-8948-5efd3750d832',
    isFavorite: true,
    offers: [
      '45a88d41-b239-454e-a48b-d9e16313a325',
      'fb25310a-c377-4350-a997-40a8c3f65147'
    ],
    type: 'train'
  },
  {
    id: '8c7182fe-5c0b-4ab3-9018-cb1120710c98',
    price: 6679,
    dateFrom: '2025-03-21T10:44:14.530Z',
    dateTo: '2025-03-22T15:11:14.530Z',
    destination: '92adaf93-c3fb-4fa5-9392-167dece5f65c',
    isFavorite: false,
    offers: [],
    type: 'ship'
  },
  {
    id: '7c92818f-5916-48d8-8a51-366f8584e4cb',
    price: 7785,
    dateFrom: '2025-03-23T14:32:14.530Z',
    dateTo: '2025-03-24T11:24:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'f3d470a8-0629-4b4a-a274-9772b756c544',
    price: 8782,
    dateFrom: '2025-03-25T07:49:14.530Z',
    dateTo: '2025-03-26T14:42:14.530Z',
    destination: 'f640c857-738b-4114-aa90-a3d128ddd07e',
    isFavorite: true,
    offers: [
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: 'adbb817d-c6fc-47cf-9dec-8d61d040ff8a',
    price: 5598,
    dateFrom: '2025-03-28T02:39:14.530Z',
    dateTo: '2025-03-29T15:15:14.530Z',
    destination: 'ae82e410-edc3-4260-95c4-975068dc4ccf',
    isFavorite: false,
    offers: [
      '1b945182-0c87-4b2a-bf67-73a8172bcb27',
      'eb1f0cf2-7fc7-41b4-8e61-55379b14dcd4',
      '54c5a53d-bf64-4231-a246-4495fc39f818'
    ],
    type: 'taxi'
  },
  {
    id: '308b8d25-6702-4d77-830f-98b0d3f9a36a',
    price: 5882,
    dateFrom: '2025-03-30T01:02:14.530Z',
    dateTo: '2025-03-30T22:06:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: false,
    offers: [
      '5294b67f-1fe6-4512-ac81-4a39bf847bf7'
    ],
    type: 'drive'
  },
  {
    id: '59a59450-7ccf-4fd8-b9ef-d09ef9cf2486',
    price: 2226,
    dateFrom: '2025-03-31T12:56:14.530Z',
    dateTo: '2025-04-01T15:06:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: false,
    offers: [
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: 'f215f85b-e3fb-4ddd-b9c3-6e557756a1c3',
    price: 9046,
    dateFrom: '2025-04-03T12:55:14.530Z',
    dateTo: '2025-04-05T09:49:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: true,
    offers: [
      '54c5a53d-bf64-4231-a246-4495fc39f818'
    ],
    type: 'taxi'
  },
  {
    id: 'defa934f-68aa-470d-a65a-fce7d704ab7b',
    price: 4801,
    dateFrom: '2025-04-05T21:07:14.530Z',
    dateTo: '2025-04-07T21:33:14.530Z',
    destination: 'f55f109d-a2e5-4a32-bfe7-0bd095ae2c8a',
    isFavorite: false,
    offers: [
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: '230a50bb-0df9-4292-ba9d-eaeb89ca0eb8',
    price: 1083,
    dateFrom: '2025-04-08T07:25:14.530Z',
    dateTo: '2025-04-08T21:38:14.530Z',
    destination: 'f55f109d-a2e5-4a32-bfe7-0bd095ae2c8a',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: '6f677ac6-0e7f-4dfb-8021-2c9d22531a98',
    price: 1955,
    dateFrom: '2025-04-10T14:46:14.530Z',
    dateTo: '2025-04-11T10:58:14.530Z',
    destination: '92adaf93-c3fb-4fa5-9392-167dece5f65c',
    isFavorite: false,
    offers: [],
    type: 'train'
  },
  {
    id: 'e0780625-a2f6-4656-9faa-db4c694bcdca',
    price: 3928,
    dateFrom: '2025-04-13T06:19:14.530Z',
    dateTo: '2025-04-13T15:49:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: false,
    offers: [
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: '31a50381-cf9c-456e-a892-b31c01b8824c',
    price: 8512,
    dateFrom: '2025-04-14T08:19:14.530Z',
    dateTo: '2025-04-15T23:22:14.530Z',
    destination: 'f55f109d-a2e5-4a32-bfe7-0bd095ae2c8a',
    isFavorite: false,
    offers: [
      'd5b71d69-d1e2-4c6f-b073-94c428a89291'
    ],
    type: 'restaurant'
  },
  {
    id: 'b67ef55b-a541-4340-8f57-a4c5ddb151ef',
    price: 1513,
    dateFrom: '2025-04-16T15:42:14.530Z',
    dateTo: '2025-04-18T09:57:14.530Z',
    destination: '1711b66c-d70c-48fc-8a9b-96129b93bfe7',
    isFavorite: true,
    offers: [
      'da865e6b-9c61-4aaf-a019-57b551754f52',
      'd493b4ef-eb1f-48fb-a711-ca32668d0c9f',
      '99454821-e361-48df-b6e3-59b0a0748b02',
      '9496cc21-cfbd-40cf-922f-f2e4c83a1ae4'
    ],
    type: 'check-in'
  },
  {
    id: 'e3c0fd6f-a2b2-4f0c-839d-adc6c9567223',
    price: 458,
    dateFrom: '2025-04-20T03:54:14.530Z',
    dateTo: '2025-04-20T14:35:14.530Z',
    destination: 'd7476f10-1b27-4293-bd6b-42308f4c8b5e',
    isFavorite: true,
    offers: [],
    type: 'sightseeing'
  },
  {
    id: 'a2f59d81-2a6f-411e-b1a3-9cd50450dc56',
    price: 758,
    dateFrom: '2025-04-21T15:58:14.530Z',
    dateTo: '2025-04-22T13:38:14.530Z',
    destination: 'f640c857-738b-4114-aa90-a3d128ddd07e',
    isFavorite: true,
    offers: [
      '54c5a53d-bf64-4231-a246-4495fc39f818'
    ],
    type: 'taxi'
  },
  {
    id: '82e77645-aeb9-478b-b54a-071480d5f646',
    price: 6414,
    dateFrom: '2025-04-23T21:35:14.530Z',
    dateTo: '2025-04-25T10:30:14.530Z',
    destination: 'ae82e410-edc3-4260-95c4-975068dc4ccf',
    isFavorite: false,
    offers: [],
    type: 'ship'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
