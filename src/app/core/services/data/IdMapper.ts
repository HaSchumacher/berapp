import { Identifiable } from '@model/helper';

const helper: Pick<Identifiable, 'id'> = { id: null };
export const ID_MAPPER = Object.keys(helper)[0];
