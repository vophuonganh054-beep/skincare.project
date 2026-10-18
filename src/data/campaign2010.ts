import duoImg from '../assets/images/alps-serum-cream-duo.jpg';
import combo1Img from '../assets/images/alps_champagne_duo_nologo_1790434037452.jpg';
import combo2Img from '../assets/images/alps_combo_white_cleanser_pale_serum_1792002204501.jpg';

import { CAMPAIGN_2010_DATA as campaign } from './campaignCatalog.ts';
export type { CampaignCombo, PromoVoucher } from './campaignCatalog.ts';
export const CAMPAIGN_2010_DATA = {...campaign, combos: campaign.combos.map(combo => ({...combo, image: combo.id === 'combo-serum-kem-duong' ? duoImg : combo.id === 'combo-toner-mat-na' ? combo1Img : combo2Img}))};
