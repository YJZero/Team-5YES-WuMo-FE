import { atom } from 'recoil';

import { PartyCreateBody } from '@/types/party';

export const createPartyState = atom<PartyCreateBody>({
  key: 'createPartyState',
  default: {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: '',
    password: '',
    memberId: 0,
    role: '',
  },
});

export const stepState = atom<number>({
  key: 'stepState',
  default: 1,
});