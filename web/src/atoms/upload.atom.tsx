import { atom } from 'recoil';

export const uploadState = atom<Record<string, any> | undefined>({
	key: "upload",
	default: undefined,
});